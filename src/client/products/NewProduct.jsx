import { useEffect, useState } from 'react';
import { fetchCategories } from '../lib/data';
import { Form, Link, redirect, useLoaderData } from 'react-router';
import { createNewProduct } from '../lib/data';
import Dropdown from '../components/DropDown';
import Input from '../components/Input';
import { strToNum } from '../lib/lib';
import { formErrors } from '../lib/errorUtil';

export const loader = async ({ params }) => {
  return params;
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const product = Object.fromEntries(formData);
  strToNum(product);
  const res = await createNewProduct(product);
  if (res.data) {
    return (params.messages = res.data);
  }
  if (res.status === 200) return redirect('/products');
};

const EditProduct = () => {
  const { pendingCategories, categoryError, categoryData, fetchingCategories } =
    fetchCategories();

  const [formData, setFormData] = useState({});
  const { messages } = useLoaderData();

  console.log(messages);

  const handleInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [field]: value,
    });
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
          method='POST'
          className='flex w-full max-w-lg flex-col gap-4 rounded-lg border-2 border-zinc-300 p-8 shadow-md'
        >
          <Input
            id='product'
            LabelText='Product name:'
            onChange={handleInputChange}
            value={formData.product}
          />
          {messages?.product && formErrors(messages.product)}
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
            value={formData.stock}
          />
          {messages?.stock && formErrors(messages.stock)}
          <Input
            id='price'
            LabelText='Price:'
            onChange={handleInputChange}
            value={formData.price}
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
        </Form>
      </div>
    )
  );
};

export default EditProduct;
