import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const createNewProduct = async (product) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/newProduct`, {
      product,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchProducts = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/api/products');
      return response.data;
    },
  });

  return {
    pendingProducts: isPending,
    productError: error,
    productData: data,
    fetchingProducts: isFetching,
  };
};

export const fetchProduct = (id) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/api/products/${id}`,
      );
      return response.data;
    },
  });

  return {
    pendingProduct: isPending,
    productError: error,
    productData: data,
    fetchingProduct: isFetching,
  };
};

export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/products/${id}`,
      {
        product,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/delete/products/${id}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createNewCategory = async (category) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/newCategory`, {
      category,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchCategories = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/api/categories');
      return response.data;
    },
  });

  return {
    pendingCategories: isPending,
    categoryError: error,
    categoryData: data,
    fetchingCategories: isFetching,
  };
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/delete/categories/${id}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (category) => {
  try {
    const id = category.id;
    const newCategory = category.value;

    const response = await axios.put(
      `http://localhost:3000/api/categories/${id}`,
      {
        category: newCategory,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};
