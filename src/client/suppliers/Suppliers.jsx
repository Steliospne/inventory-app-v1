import { CirclePlus, Trash2, Pencil } from 'lucide-react';
import { fetchSuppliers, deleteSupplier } from '../lib/data.js';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const columnHelper = createColumnHelper();

const Suppliers = () => {
  const { pendingSuppliers, supplierError, supplierData, fetchingSuppliers } =
    fetchSuppliers();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (supplierId) => deleteSupplier(supplierId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    },
  });
  const columns = [
    columnHelper.accessor('supplier', {
      header: () => <span>Supplier</span>,
    }),
    columnHelper.accessor('email', {
      header: () => <span>Email</span>,
    }),
    columnHelper.accessor('phone', {
      header: () => <span className='px-6 text-center'>Phone</span>,
    }),
    columnHelper.accessor('id', {
      header: () => <span>Action</span>,
      cell: (info) => (
        <div className='flex items-center justify-center gap-2'>
          <Link
            className='transition duration-200 ease-in-out hover:scale-110'
            to={`/edit/suppliers/${info.getValue()}`}
          >
            <Pencil />
          </Link>
          <button
            className='transition duration-200 ease-in-out hover:scale-110'
            onClick={async () => {
              if (
                window.confirm('Are you sure you want to delete this supplier?')
              ) {
                try {
                  await deleteMutation.mutateAsync(info.getValue());
                } catch (error) {
                  console.error('Error deleting user:', error);
                }
              }
            }}
          >
            <Trash2 className='stroke-red-500' />
          </button>
        </div>
      ),
      footer: () => (
        <Link
          to={'/newSupplier'}
          className='flex justify-center p-2 transition duration-200 ease-in-out hover:scale-125'
        >
          <CirclePlus className='fill-emerald-400' />
        </Link>
      ),
    }),
  ];

  const table = useReactTable({
    data: supplierData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (supplierError) throw supplierError;

  if (fetchingSuppliers) return <p>Loading...</p>;

  if (!pendingSuppliers) {
    return (
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
      </div>
    );
  }
};
export default Suppliers;
