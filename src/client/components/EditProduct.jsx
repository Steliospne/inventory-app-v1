import { useEffect, useState } from 'react';
import { fetchCategories, fetchProduct } from '../../lib/data';
import { Form, Link, redirect, useParams } from 'react-router-dom';
import { updateProduct } from '../../lib/data';

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const product = Object.fromEntries(formData);
  const { productId } = params;
  const res = await updateProduct(productId, product);
  if (res.status === 200) return redirect('/products');
};

const EditProduct = () => {
  const { productId } = useParams();
  const { pendingProduct, productError, productData, fetchingProduct } =
    fetchProduct(productId);
  const { pendingCategories, categoryError, categoryData, fetchingCategories } =
    fetchCategories();

  const [formData, setFormData] = useState(productData);

  useEffect(() => {
    setFormData(productData);
  }, [productData]);

  // console.log(formData);

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
        method='post'
        className='flex w-full max-w-lg flex-col gap-4 rounded-lg border-2 border-zinc-300 p-8 shadow-md'
      >
        <div className='flex flex-col'>
          <label htmlFor='product' className='text-lg font-medium'>
            Product name:
          </label>
          <input
            type='text'
            name='product'
            id='product'
            autoComplete='product'
            value={fetchingProduct ? 'Loading...' : formData?.product}
            onChange={handleInputChange}
            required
            className='mt-4 h-10 rounded-lg px-4 py-5 focus:outline-offset-1'
          />
        </div>
        {/* {message?.username && formErrors(message.username)} */}
        <div className='mt-4 flex flex-col'>
          <label htmlFor='category' className='text-lg font-medium'>
            Category:
          </label>
          <select
            name='category'
            id='category'
            value={fetchingProduct ? 'Loading...' : formData?.category}
            onChange={handleInputChange}
            required
            className='mt-4 h-10 rounded-lg px-4 focus:outline-offset-1'
          >
            {categoryData?.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {/* {message?.password && formErrors(message.password)} */}
        <div className='flex flex-col'>
          <label htmlFor='stock' className='text-lg font-medium'>
            Stock:
          </label>
          <input
            type='tel'
            name='stock'
            id='stock'
            autoComplete='stock'
            required
            value={fetchingProduct ? 'Loading...' : formData?.stock}
            onChange={handleInputChange}
            className='mt-4 h-10 rounded-lg px-4 py-5 focus:outline-offset-1'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='price' className='text-lg font-medium'>
            Price:
          </label>
          <input
            type='text'
            name='price'
            id='price'
            autoComplete='price'
            required
            value={fetchingProduct ? 'Loading...' : formData?.price}
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
            to={'/products'}
            className='flex-1 rounded-lg bg-emerald-300 py-2 text-center font-semibold hover:bg-emerald-200'
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default EditProduct;
