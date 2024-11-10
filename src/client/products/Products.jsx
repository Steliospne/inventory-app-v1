import { CloudCog, PanelTopClose, PanelTopOpen } from 'lucide-react';
import {
  fetchProducts,
  fetchCategories,
  updateProducts,
} from '../../lib/data.js';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState, useEffect } from 'react';

const columnHelper = createColumnHelper();

const defaultColumn = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

    const {
      pendingCategories,
      categoryError,
      categoryData,
      fetchingCategories,
    } = fetchCategories();

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    if (id == 'category' && !pendingCategories)
      return (
        <select
          onChange={(e) => {
            setValue(e.target.value);
            () => table.options.meta?.updateData(index, id, value);
          }}
          className='flex w-full'
          name='category'
          value={value}
          onBlur={onBlur}
        >
          {categoryData.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      );

    return (
      <div className='flex'>
        <input
          className='w-full'
          value={value || ''}
          name={id}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      </div>
    );
  },
};

const columns = [
  columnHelper.accessor('product', {
    header: () => <span>Product</span>,
  }),
  columnHelper.accessor('category', {
    header: () => <span>Category</span>,
  }),
  columnHelper.accessor('stock', {
    header: () => <span>Stock</span>,
  }),
  columnHelper.accessor('price', {
    header: () => <span>Price</span>,
  }),
];

const Products = () => {
  const { pendingProducts, productError, productData, fetchingProducts } =
    fetchProducts();

  const [tableData, setTableData] = useState(() => productData);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (productData) {
      setTableData(productData);
    }
  }, [productData]);

  const table = useReactTable({
    data: productData,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setTableData((old) =>
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

  const handleClick = async () => {
    const res = await updateProducts(tableData);
    console.log(tableData);
  };

  if (!pendingProducts) {
    return (
      <div className='relative flex h-full flex-col'>
        <div className={`w-full bg-blue-200 ${open ? 'h-10' : 'hidden'}`}>
          <button onClick={handleClick}>Test</button>
        </div>
        <button className='relative h-0 w-0' onClick={() => setOpen(!open)}>
          {open ? <PanelTopClose /> : <PanelTopOpen />}
        </button>
        <div className='flex h-full max-h-svh flex-1 items-center justify-center p-2'>
          <table className='m-4 w-full max-w-2xl bg-white'>
            <thead className='bg-emerald-400'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className={`w-3/4 border-2 border-zinc-300 px-4 py-2`}
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
                  className={`${index % 2 ? 'bg-emerald-50' : ''}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className={`border-2 border-zinc-300 px-2 py-1 ${cell.id.includes('stock') || cell.id.includes('price') ? 'group text-right' : ''} `}
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
          </table>
        </div>
      </div>
    );
  }
};

export default Products;
