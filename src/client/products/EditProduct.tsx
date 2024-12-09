import React, { useEffect, useState } from 'react';
import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useParams,
} from 'react-router';
import { updateProduct, fetchCategories, fetchProduct } from '../lib/data';
import Dropdown from '../components/DropDown.jsx';
import type { Category, Product } from '../../types/models';

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formDataObj = Object.fromEntries(formData);

  const product: Product = {
    id: Number(formDataObj.id),
    name: formDataObj.name as string,
    category: formDataObj.category as string,
    price: Number(formDataObj.price),
    stock: Number(formDataObj.stock),
    isAvailable: Boolean(formDataObj.isAvailable),
    createdAt: new Date(formDataObj.createdAt as string),
    updatedAt: new Date(formDataObj.updatedAt as string),
  };

  const { productId } = params;
  const res = await updateProduct(productId, product);
  if (res.status === 200) return redirect('/products');
};

const EditProduct = () => {
  const { productId } = useParams();
  const { pendingProduct, productError, productData, fetchingProduct } =
    fetchProduct(productId);
  const {
    pendingCategories,
    categoriesError,
    categoriesData,
    fetchingCategories,
  } = fetchCategories();

  const [product, setProduct] = useState(productData);

  const [options, setOptions] = useState(categoriesData);
  const [selectedOption, setSelectedOption] = useState('');
  const [newOption, setNewOption] = useState<Pick<Category, 'name'>>({
    name: '',
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    setOptions(categoriesData);
    setProduct(productData);
  }, [productData, categoriesData]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'add_new') {
      setIsAddingNew(true);
    } else {
      const field = event.target.name;
      const value = event.target.value;
      setProduct((prevProduct) => {
        if (!prevProduct) return prevProduct;
        return {
          ...prevProduct,
          [field]: value,
        };
      });
      setSelectedOption(value);
    }
  };

  const handleAddNewOption = () => {
    const found = options?.find(
      (category) => category.name.toLowerCase() == newOption.name.toLowerCase(),
    );
    if (newOption.name && !found) {
      setOptions((prevOptions) => {
        if (!prevOptions) return prevOptions;
        const newOptionObj: Category = { name: newOption.name };
        return [...prevOptions, newOptionObj];
      });
      setProduct((prevProduct) => {
        if (!prevProduct) return prevProduct;
        return {
          ...prevProduct,
          category: newOption.name,
        };
      });
      setSelectedOption(newOption.name);
      setNewOption({ name: '' });
      setIsAddingNew(false);
    }
    setSelectedOption(newOption.name);
    setNewOption({ name: '' });
    setIsAddingNew(false);
  };

  const handleNewOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewOption({ name: event.target.value });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name;
    const value = event.target.value;
    setProduct((prevProduct) => {
      if (!prevProduct) return prevProduct;
      return {
        ...prevProduct,
        [field]: value,
      };
    });
  };

  return (
    product && (
      <div className='flex h-full items-center justify-center'>
        <Form
          method='POST'
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
              value={product.name}
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
            <Dropdown
              options={options}
              selectedOption={selectedOption}
              newOption={newOption}
              isAddingNew={isAddingNew}
              onSelectChange={handleSelectChange}
              onNewOptionChange={handleNewOptionChange}
              onAddNewOption={handleAddNewOption}
            />
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
              value={product.stock}
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
              value={product.price}
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
    )
  );
};

export default EditProduct;
