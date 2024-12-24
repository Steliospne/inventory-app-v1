import { useEffect, useState } from 'react';
import {
  ActionFunctionArgs,
  data,
  Link,
  redirect,
  useFetcher,
  useParams,
} from 'react-router';
import { updateProduct, fetchCategories, fetchProduct } from '../../lib/data';
import Dropdown from '../components/DropDown.jsx';
import type { Category, ValidationErrors } from '../../types/models';
import { fromFormData } from '../../lib/lib';
import LoadingSpinner from '../components/LoadingSpinner';
import { ProductSchema } from '../../lib/definitions';
import Input from '../components/Input';
import { formErrors } from '../../lib/errorUtil';
import { getErrorMessages } from '../../lib/lib-server';

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const result = fromFormData(Object.fromEntries(formData), ProductSchema);

  // Client side validation
  if (!result.success) {
    const messages = getErrorMessages(result.error.errors);
    return data({ messages }, { status: 400 });
  }

  const { productId } = params;
  const product = result.data;
  const res = await updateProduct(productId, product);

  // Server side response
  if (res.data) {
    return data({ messages: res.data }, { status: 400 });
  }

  if (res.status === 200) return redirect('/products');
};

const EditProduct = () => {
  const { productId } = useParams();
  const { productError, productData, fetchingProduct } =
    fetchProduct(productId);
  const { categoriesError, categoriesData, fetchingCategories } =
    fetchCategories();

  const [product, setProduct] = useState(productData);
  const [options, setOptions] = useState(categoriesData);
  const [selectedOption, setSelectedOption] = useState('');
  const [newOption, setNewOption] = useState<Category>({
    name: '',
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const fetcher = useFetcher();
  const messages = fetcher.data?.messages as ValidationErrors;

  useEffect(() => {
    setOptions(categoriesData);
    setProduct(productData);
    if (productData) setSelectedOption(() => productData?.category);
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

  if (productError) throw productError;
  else if (categoriesError) throw categoriesError;

  if (fetchingProduct) return <LoadingSpinner />;

  return (
    product && (
      <div className='flex h-full items-center justify-center'>
        <fetcher.Form
          method='POST'
          className='flex w-full max-w-lg flex-col gap-4 rounded-lg border-2 border-zinc-300 p-8 shadow-md'
        >
          <div className='flex flex-col'>
            <Input
              id='name'
              LabelText='Product name:'
              onChange={handleInputChange}
              value={product.name}
            />
          </div>
          {messages?.name && formErrors(messages.name)}
          <div className='flex flex-col'>
            <label htmlFor='category' className='text-lg font-medium'>
              Category:
            </label>
            {fetchingCategories ? (
              <LoadingSpinner page={false} />
            ) : (
              <Dropdown
                options={options}
                selectedOption={selectedOption}
                newOption={newOption}
                isAddingNew={isAddingNew}
                onSelectChange={handleSelectChange}
                onNewOptionChange={handleNewOptionChange}
                onAddNewOption={handleAddNewOption}
              />
            )}
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
