import { useQuery } from '@tanstack/react-query';

export const fetchProducts = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(
        new URL('http://localhost:3000/api/products'),
      );
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
  const response = await fetch(new URL('http://localhost:3000/api/products'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(products),
  });

  return response;
};
