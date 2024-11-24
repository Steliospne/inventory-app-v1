import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { dateYearMonthFormatter,mapDayOfWeek } from './lib';

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

export const fetchSuppliers = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['suppliers'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/api/suppliers');
      return response.data;
    },
  });

  return {
    pendingSuppliers: isPending,
    supplierError: error,
    supplierData: data,
    fetchingSuppliers: isFetching,
  };
};

export const fetchSupplier = (id) => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['supplier', id],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/api/suppliers/${id}`,
      );
      return response.data;
    },
  });

  return {
    pendingSupplier: isPending,
    supplierError: error,
    supplierData: data,
    fetchingSupplier: isFetching,
  };
};

export const updateSupplier = async (id, supplier) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/suppliers/${id}`,
      {
        supplier,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createNewSupplier = async (supplier) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/newSupplier`, {
      supplier,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteSupplier = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/delete/suppliers/${id}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchInventoryMovements = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['inv-move'],
    queryFn: async () => {
      const response = await axios.get(
        'http://localhost:3000/get/inventory-movement',
      );

      return response.data.map((el) => dateYearMonthFormatter(el));
    },
  });
  return {
    pendingInvMovement: isPending,
    errorInvMovement: error,
    invMovementData: data,
    fetchingInvMovement: isFetching,
  };
};

export const fetchTurnOverRate = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['turnOverRate'],
    queryFn: async () => {
      const response = await axios.get(
        'http://localhost:3000/get/turn-over-rate',
      );
      return response.data.map((el) => dateYearMonthFormatter(el));
    },
  });
  return {
    pendingTurnOverRate: isPending,
    errorTurnOverRate: error,
    dataTurnOverRate: data,
    fetchingTurnOverRate: isFetching,
  };
};

export const fetchTopMovingIngredients = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['topIngredients'],
    queryFn: async () => {
      const response = await axios.get(
        'http://localhost:3000/get/top-moving-ingredients',
      );
      return response.data.map((el) => {
        return {
          ...el,
          total_quantity_moved: Number(el.total_quantity_moved),
          total_value_moved: Number(el.total_value_moved),
        };
      });
    },
  });
  return {
    pendingTopMovingIngredients: isPending,
    errorTopMovingIngredients: error,
    dataTopMovingIngredients: data,
    fetchingTopMovingIngredients: isFetching,
  };
};

export const fetchDailyStockMovement = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['dailyStockMovement'],
    queryFn: async () => {
      const response = await axios.get(
        'http://localhost:3000/get/daily-movements',
      );
      return response.data.map((el) => mapDayOfWeek(el));
    },
  });
  return {
    pendingDailyStockMovement: isPending,
    errorDailyStockMovement: error,
    dataDailyStockMovement: data,
    fetchingDailyStockMovement: isFetching,
  };
};
