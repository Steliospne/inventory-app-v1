import { PanelTopClose, PanelTopOpen } from 'lucide-react';
import { fetchProducts } from '../../lib/data.js';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('product', {
    header: () => <span>Product</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('category', {
    header: () => <span>Category</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('stock', {
    header: () => <span>Stock</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('price', {
    header: () => <span>Price</span>,
    cell: (info) => `${info.getValue()} €`,
    footer: (info) => info.column.id,
  }),
];

const Products = () => {
  const { isPending, error, data, isFetched } = fetchProducts();
  console.log(isPending, data);
  const [open, setOpen] = useState(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  if (!isPending)
    return (
      <div>
        <div className={`bg-red-200 ${open ? 'h-10' : ''}`}></div>
        <button onClick={() => setOpen(!open)}>
          {open ? <PanelTopClose /> : <PanelTopOpen />}
        </button>
        <div className='flex p-2 justify-center'>
          <table className='m-4 w-full max-w-2xl'>
            <thead className='bg-emerald-400'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className={`py-2 px-4 w-3/4 border-2 border-zinc-300 `}
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
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className={`border-2 px-2 py-1 border-zinc-300 ${cell.id.includes('stock') || cell.id.includes('price') ? 'text-right group' : ''}`}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
};

export default Products;
