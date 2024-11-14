import { useState } from 'react';
import { Form, Link, redirect } from 'react-router-dom';
import { createNewSupplier } from '../lib/data';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const supplier = Object.fromEntries(formData);
  const res = await createNewSupplier(supplier);
  if (res.status === 200) return redirect('/suppliers');
};

const EditSupplier = () => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    setFormData({
      ...formData,
      [field]: value,
    });
    console.log(formData);
  };

  return (
    (
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
              onChange={handleInputChange}
              required
              className='mt-4 h-10 rounded-lg border border-emerald-300 p-2 px-4 py-5 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50'
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
              onChange={handleInputChange}
              className='mt-4 h-10 rounded-lg border border-emerald-300 p-2 px-4 py-5 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50'
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
              onChange={handleInputChange}
              className='mt-4 h-10 rounded-lg border border-emerald-300 p-2 px-4 py-5 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50'
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
