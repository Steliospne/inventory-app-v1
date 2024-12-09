import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../lib/data';
import {
  ActionFunctionArgs,
  data,
  Link,
  redirect,
  useFetcher,
} from 'react-router';
import { createNewProduct } from '../lib/data';
import Dropdown from '../components/DropDown';
import Input from '../components/Input.jsx';
import { productFromFormData } from '../lib/lib';
import { formErrors } from '../lib/errorUtil.jsx';
import { Category, Product } from '../../types/models';

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const product = productFromFormData(Object.fromEntries(formData));

  const res = await createNewProduct(product);
  if (res.data) {
    return data({ messages: res.data }, { status: 400 });
  }
  if (res.status === 200) return redirect('/products');
};

const EditProduct = () => {
  const {
    pendingCategories,
    categoriesError,
    categoriesData,
    fetchingCategories,
  } = fetchCategories();

  const [product, setProduct] = useState<Product>({
    name: '',
    category: '',
    price: 0,
    stock: 0,
  });
  const fetcher = useFetcher();
  const [options, setOptions] = useState(categoriesData);
  const [selectedOption, setSelectedOption] = useState('');
  const [newOption, setNewOption] = useState({ name: '' });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const messages = fetcher.data?.messages;

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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'add_new') {
      setIsAddingNew(true);
    } else {
      const field = event.target.name;
      const value = event.target.value;
      setProduct({
        ...product,
        [field]: value,
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

  useEffect(() => {
    setOptions(categoriesData);
  }, [categoriesData]);

  return (
    !fetchingCategories && (
      <div className='flex h-full items-center justify-center'>
        <fetcher.Form
          method='POST'
          className='flex w-full max-w-lg flex-col gap-4 rounded-lg border-2 border-zinc-300 p-8 shadow-md'
        >
          <Input
            id='name'
            LabelText='Product name:'
            onChange={handleInputChange}
            value={product.name}
          />
          {messages?.name && formErrors(messages.name)}
          <div className='flex flex-col'>
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
            {messages?.category && formErrors(messages.category)}
          </div>
          <Input
            id='stock'
            type='tel'
            LabelText='Stock:'
            onChange={handleInputChange}
            value={product.stock}
          />
          {messages?.stock && formErrors(messages.stock)}
          <Input
            id='price'
            LabelText='Price:'
            onChange={handleInputChange}
            value={product.price}
          />
          {messages?.price && formErrors(messages.price)}
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
        </fetcher.Form>
      </div>
    )
  );
};

export default EditProduct;
