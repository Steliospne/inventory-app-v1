import { PanelTopClose, PanelTopOpen } from 'lucide-react';
import { fetchProducts, fetchCategories } from '../../lib/data.js';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const columnHelper = createColumnHelper();

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
  columnHelper.accessor('id', {
    header: () => <span>Action</span>,
    cell: (info) => (
      <button>
        <Link to={`/edit/products/${info.getValue()}`}>Edit</Link>
      </button>
    ),
  }),
];

const Products = () => {
  const { pendingProducts, productError, productData, fetchingProducts } =
    fetchProducts();

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const table = useReactTable({
    data: productData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (productError) throw productError;

  if (fetchingProducts) return <p>Loading...</p>;

  if (!pendingProducts) {
    return (
      <div className='relative flex h-full flex-col'>
        <div className={`w-full bg-blue-200 ${open ? 'h-10' : 'hidden'}`}></div>
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
