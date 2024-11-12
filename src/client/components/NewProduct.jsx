import { useEffect, useState } from 'react';
import { fetchCategories } from '../lib/data';
import { Form, Link, redirect } from 'react-router-dom';
import { createNewProduct } from '../lib/data';
import Dropdown from './DropDown';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const product = Object.fromEntries(formData);
  const res = await createNewProduct(product);
  if (res.status === 200) return redirect('/products');
};

const EditProduct = () => {
  const { pendingCategories, categoryError, categoryData, fetchingCategories } =
    fetchCategories();

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

  const [options, setOptions] = useState(categoryData);
  const [selectedOption, setSelectedOption] = useState('');
  const [newOption, setNewOption] = useState({ name: '' });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleSelectChange = (event) => {
    if (event.target.value === 'add_new') {
      setIsAddingNew(true);
    } else {
      const field = event.target.name;
      const value = event.target.value;
      setFormData({
        ...formData,
        [field]: value,
      });
      setSelectedOption(value);
    }
  };

  const handleAddNewOption = () => {
    const found = options.find(
      (category) => category.name.toLowerCase() == newOption.name.toLowerCase(),
    );
    if (newOption.name && !found) {
      setOptions([...options, newOption]);
      setFormData({
        ...formData,
        category: newOption.name,
      });
      setSelectedOption(newOption.name);
      setNewOption({});
      setIsAddingNew(false);
    }
    setSelectedOption(newOption.name);
    setNewOption({});
    setIsAddingNew(false);
  };

  const handleNewOptionChange = (event) => {
    setNewOption({ name: event.target.value });
  };

  useEffect(() => {
    setOptions(categoryData);
  }, [categoryData]);

  return (
    !fetchingCategories && (
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
              onChange={handleInputChange}
              required
              className='mt-4 h-10 rounded-lg border border-emerald-300 p-2 px-4 py-5 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50'
            />
          </div>
          {/* {message?.username && formErrors(message.username)} */}
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
              onChange={handleInputChange}
              className='mt-4 h-10 rounded-lg border border-emerald-300 p-2 px-4 py-5 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50'
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
