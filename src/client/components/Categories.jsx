import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  createNewCategory,
  fetchCategories,
  deleteCategory,
  updateCategory,
} from '../lib/data';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CirclePlus, Trash2, Pencil } from 'lucide-react';
import { useState, useEffect } from 'react';
import NewCategory from '../categories/NewCategory';
import EditCategory from '../categories/EditCategory';

const columnHelper = createColumnHelper();

const Categories = () => {
  const { pendingCategories, categoryError, categoryData, fetchingCategories } =
    fetchCategories();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (categoryId) => deleteCategory(categoryId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const creationMutation = useMutation({
    mutationFn: (category) => createNewCategory(category),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (category) => updateCategory(category),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const [edit, setEdit] = useState(null);
  const [formData, setFormData] = useState(categoryData);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState({ id: '', value: '' });
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    setFormData(categoryData);
  }, [categoryData]);

  const columns = [
    columnHelper.accessor('name', {
      header: () => <span>Category</span>,
      cell: ({ getValue, row: { index }, column: { id }, table }) => {
        const initialValue = getValue();
        const [value, setValue] = useState(initialValue);

        const onBlur = () => {
          table.options.meta?.updateData(index, id, value);
          setEdit(null);
        };

        return (
          <div>
            {edit == index ? (
              <input
                key={index}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type='text'
                onBlur={onBlur}
                name='category'
                id='category'
              />
            ) : (
              <div>{value}</div>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor('id', {
      header: () => <span>Action</span>,
      cell: (info) => (
        <div className='flex items-center justify-center gap-2'>
          <button
            onClick={() => {
              setUpdatedCategory({
                id: info.getValue(),
                value: formData.filter((data) => data.id == info.getValue())[0]
                  .name,
              });
              setOpenUpdateForm(!openUpdateForm);
              setOpenEditForm(false);
            }}
            className='transition duration-200 ease-in-out hover:scale-110'
          >
            <Pencil />
          </button>
          <button
            className='transition duration-200 ease-in-out hover:scale-110'
            onClick={async () => {
              if (
                window.confirm('Are you sure you want to delete this product?')
              ) {
                try {
                  await deleteMutation.mutateAsync(info.getValue());
                } catch (error) {
                  console.error('Error deleting category:', error);
                }
              }
            }}
          >
            <Trash2 className='stroke-red-500' />
          </button>
        </div>
      ),
      footer: () => (
        <div className='flex items-center justify-center gap-2 p-2'>
          <button
            onClick={handleNewCategory}
            className='transition duration-200 ease-in-out hover:scale-125'
          >
            <CirclePlus className='fill-emerald-400' />
          </button>
        </div>
      ),
    }),
  ];

  const handleNewCategory = () => {
    setOpenEditForm(!openEditForm);
    setOpenUpdateForm(false);
  };

  const table = useReactTable({
    data: formData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        setFormData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
  });

  if (categoryError) throw categoryError;

  if (fetchingCategories) return <p>Loading...</p>;

  if (!pendingCategories) {
    return (
      formData && (
        <div className='flex h-full flex-col'>
          <div className='flex h-full max-h-svh flex-1 flex-col items-center justify-center p-2'>
            <table className='m-4 w-full max-w-fit bg-white'>
              <thead className='bg-emerald-400'>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className={`border-2 border-zinc-300 px-4 py-2`}
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`${index % 2 ? 'bg-emerald-50' : ''} hover:bg-zinc-100`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        className={`border-2 border-zinc-300 px-2 py-1`}
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(() => setOpen(!open)),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tfoot className='bg-zinc-100'>
                {table.getFooterGroups().map((footerGroup) => (
                  <tr key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.footer,
                              header.getContext(),
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </tfoot>
            </table>
            <NewCategory
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              openEditForm={openEditForm}
              setOpenEditForm={setOpenEditForm}
              creationMutation={creationMutation}
            />
            <EditCategory
              updatedCategory={updatedCategory}
              setUpdatedCategory={setUpdatedCategory}
              openUpdateForm={openUpdateForm}
              setOpenUpdateForm={setOpenUpdateForm}
              updateMutation={updateMutation}
            />
          </div>
        </div>
      )
    );
  }
};

export default Categories;
