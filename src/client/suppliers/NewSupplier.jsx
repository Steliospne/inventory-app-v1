import { useState } from 'react';
import { Form, Link, redirect } from 'react-router';
import { createNewSupplier } from '../lib/data';
import Input from '../components/Input';

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
    <div className='flex h-full items-center justify-center'>
      <Form
        method='POST'
        className='flex w-full max-w-lg flex-col gap-4 rounded-lg border-2 border-zinc-300 p-8 shadow-md'
      >
        <Input
          id='supplier'
          LabelText='Supplier name:'
          value={formData.supplier}
          onChange={handleInputChange}
        />
        {/* {message?.username && formErrors(message.username)} */}
        <Input
          id='email'
          type='email'
          LabelText='Email:'
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          type='tel'
          id='phone'
          LabelText='Phone:'
          value={formData.phone}
          onChange={handleInputChange}
        />

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
  );
};

export default EditSupplier;
