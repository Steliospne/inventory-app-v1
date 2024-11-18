import { useEffect, useState } from 'react';
import { fetchSupplier,updateSupplier } from '../lib/data';
import { Form, Link, redirect, useParams } from 'react-router-dom';

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const supplier = Object.fromEntries(formData);
  const { supplierId } = params;
  const res = await updateSupplier(supplierId, supplier);
  if (res.status === 200) return redirect('/suppliers');
};

const EditSupplier = () => {
  const { supplierId } = useParams();
  const { pendingSupplier, supplierError, supplierData, fetchingSupplier } =
  fetchSupplier(supplierId);
  const [formData, setFormData] = useState(supplierData);

  useEffect(() => {
    setFormData(supplierData);
  }, [supplierData]);

  const handleInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    formData && (
      <div className='flex h-full items-center justify-center'>
        <Form
          method='post'
          className='flex w-full max-w-lg flex-col gap-4 rounded-lg border-2 border-zinc-300 p-8 shadow-md'
        >
          <div className='flex flex-col'>
            <label htmlFor='supplier' className='text-lg font-medium'>
              Supplier name:
            </label>
            <input
              type='text'
              name='supplier'
              id='supplier'
              autoComplete='supplier'
              value={formData.supplier}
              onChange={handleInputChange}
              required
              className='mt-4 h-10 rounded-lg px-4 py-5 focus:outline-offset-1'
            />
          </div>
          {/* {message?.username && formErrors(message.username)} */}
          <div className='flex flex-col'>
            <label htmlFor='email' className='text-lg font-medium'>
              Email:
            </label>
            <input
              type='email'
              name='email'
              id='email'
              autoComplete='email'
              required
              value={formData.email}
              onChange={handleInputChange}
              className='mt-4 h-10 rounded-lg px-4 py-5 focus:outline-offset-1'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='phone' className='text-lg font-medium'>
              Phone:
            </label>
            <input
              type='tel'
              name='phone'
              id='phone'
              autoComplete='phone'
              required
              value={formData.phone}
              onChange={handleInputChange}
              className='mt-4 h-10 rounded-lg px-4 py-5 focus:outline-offset-1'
            />
          </div>
          <div className='flex gap-6'>
            <button
              type='submit'
              className='flex-1 rounded-lg bg-emerald-300 py-2 font-semibold hover:bg-emerald-200'
            >
              Save
            </button>

            <Link
              to={'/suppliers'}
              className='flex-1 rounded-lg bg-emerald-300 py-2 text-center font-semibold hover:bg-emerald-200'
            >
              Cancel
            </Link>
          </div>
        </Form>
      </div>
    )
  );
};

export default EditSupplier;
