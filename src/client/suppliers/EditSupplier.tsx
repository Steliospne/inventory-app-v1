import { useEffect, useState } from 'react';
import { fetchSupplier, updateSupplier } from '../../lib/data';
import {
  ActionFunctionArgs,
  data,
  Form,
  Link,
  redirect,
  useFetcher,
  useParams,
} from 'react-router';
import Input from '../components/Input';
import { fromFormData } from '../../lib/lib';
import { SupplierSchema } from '../../lib/definitions';
import LoadingSpinner from '../components/LoadingSpinner';
import { getErrorMessages } from '../../lib/lib-server';
import { ValidationErrors } from '../../types/models';
import { formErrors } from '../../lib/errorUtil';

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const result = fromFormData(Object.fromEntries(formData), SupplierSchema);

  // Client side validation
  if (!result.success) {
    const messages = getErrorMessages(result.error.errors);
    return data({ messages }, { status: 400 });
  }

  const { supplierId } = params;
  const supplier = result.data;
  const res = await updateSupplier(supplierId, supplier);

  // Server side response
  if (res.data) {
    return data({ messages: res.data }, { status: 400 });
  }

  if (res.status === 200) return redirect('/suppliers');
};

const EditSupplier = () => {
  const { supplierId } = useParams();
  const { supplierError, supplierData, fetchingSupplier } =
    fetchSupplier(supplierId);
  const [supplier, setSupplier] = useState(supplierData);

  const fetcher = useFetcher();
  const messages = fetcher.data?.messages as ValidationErrors;

  useEffect(() => {
    setSupplier(supplierData);
  }, [supplierData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name;
    const value = event.target.value;
    setSupplier((prevSupplier) => {
      if (!prevSupplier) return prevSupplier;
      return { ...prevSupplier, [field]: value };
    });
  };

  if (supplierError) throw supplierError;

  if (fetchingSupplier) return <LoadingSpinner />;

  return (
    supplier && (
      <div className='flex h-full items-center justify-center'>
        <fetcher.Form
          method='POST'
          className='flex w-full max-w-lg flex-col gap-4 rounded-lg border-2 border-zinc-300 p-8 shadow-md'
        >
          <Input
            id='name'
            LabelText='Supplier name:'
            value={supplier.name}
            onChange={handleInputChange}
          />
          {messages?.name && formErrors(messages.name)}
          <Input
            id='email'
            type='email'
            LabelText='Email:'
            value={supplier.email}
            onChange={handleInputChange}
          />
          {messages?.email && formErrors(messages.email)}
          <Input
            type='tel'
            id='phone'
            LabelText='Phone:'
            value={supplier.phone}
            onChange={handleInputChange}
          />
          {messages?.phone && formErrors(messages.phone)}
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
        </fetcher.Form>
      </div>
    )
  );
};

export default EditSupplier;
