import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const fetchProducts = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(
        new URL('http://localhost:3000/api/products'),
      );

      if (response.status === 404) {
        throw new Response('', { status: 404 });
      }

      return await response.json();
    },
  });

  return {
    pendingProducts: isPending,
    productError: error,
    productData: data,
    fetchingProducts: isFetching,
  };
};

export const fetchCategories = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch(
        new URL('http://localhost:3000/api/categories'),
      );

      if (response.status === 404) {
        throw new Response('', { status: 404 });
      }

      return await response.json();
    },
  });

  return {
    pendingCategories: isPending,
    categoryError: error,
    categoryData: data,
    fetchingCategories: isFetching,
  };
};

export const updateProducts = async (products) => {
  try {
    const response = await axios.post('http://localhost:3000/api/products', {
      products,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
