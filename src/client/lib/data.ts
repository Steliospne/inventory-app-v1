import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import { dateYearMonthFormatter, mapDayOfWeek } from './lib';
import type { Product, Category, Categories, ValidationErrors, Products, Supplier, Suppliers } from '../../types/models.ts';

interface ProductFetchResult {
  pendingProduct: boolean;
  productError: Error | null;
  productData: Product | undefined;
  fetchingProduct: boolean;
 }

 interface ProductsFetchResult {
  pendingProducts: boolean;
  productsError: Error | null;
  productsData: Products | undefined;
  fetchingProducts: boolean;
 }

 interface CategoriesFetchResult {
  pendingCategories: boolean;
  categoriesError: Error | null;
  categoriesData: Categories | undefined;
  fetchingCategories: boolean;
 }

 interface SuppliersFetchResult {
  pendingSuppliers: boolean;
  suppliersError: Error | null;
  suppliersData: Suppliers | undefined;
  fetchingSuppliers: boolean;
 }

export const createNewProduct = async (product: Product) => {
  try {
    const response = await axios.post<ValidationErrors>(`http://localhost:3000/api/newProduct`, {
      product: product,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchProducts = (): ProductsFetchResult => {
  const { isPending, error, data, isFetching }: UseQueryResult<Products> = useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Products> => {
      const response = await axios.get<Products>('http://localhost:3000/api/products');
      return response.data;
    },
  });

  return {
    pendingProducts: isPending,
    productsError: error,
    productsData: data,
    fetchingProducts: isFetching,
  };
};

export const fetchProduct = (id: string | undefined): ProductFetchResult => {
  const { isPending, error, data, isFetching }: UseQueryResult<Product, Error> = useQuery({
    queryKey: ['product', id],
    queryFn: async (): Promise<Product> => {
      const response = await axios.get<Product>(
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

export const updateProduct = async (id: string | undefined , product: Product) => {
  try {
    const response = await axios.put<ValidationErrors>(
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

export const deleteProduct = async (id: string | undefined) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/delete/products/${id}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createNewCategory = async (category: Category) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/newCategory`, {
      category,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchCategories = (): CategoriesFetchResult => {
  const { isPending, error, data, isFetching }: UseQueryResult<Categories, Error> = useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Categories> => {
      const response = await axios.get<Categories>('http://localhost:3000/api/categories');
      return response.data;
    },
  });

  return {
    pendingCategories: isPending,
    categoriesError: error,
    categoriesData: data,
    fetchingCategories: isFetching,
  };
};

export const deleteCategory = async (id: string | undefined) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/delete/categories/${id}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (category: Category) => {
  try {
    const id = category.id;
    const newCategory = category.name;

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

export const fetchSuppliers = (): SuppliersFetchResult => {
  const { isPending, error, data, isFetching }: UseQueryResult<Suppliers> = useQuery({
    queryKey: ['suppliers'],
    queryFn: async (): Promise<Suppliers> => {
      const response = await axios.get<Suppliers>('http://localhost:3000/api/suppliers');
      return response.data;
    },
  });

  return {
    pendingSuppliers: isPending,
    suppliersError: error,
    suppliersData: data,
    fetchingSuppliers: isFetching,
  };
};

export const fetchSupplier = (id: string | undefined) => {
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

export const updateSupplier = async (id: string | undefined, supplier: Supplier) => {
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

export const createNewSupplier = async (supplier: Supplier) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/newSupplier`, {
      supplier,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteSupplier = async (id: string | undefined) => {
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

      return response.data.map((el) => {
        return {
          ...el,
          month: dateYearMonthFormatter(el),
          purchase: Number(el.purchase),
          usage: Number(el.usage),
        };
      });
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
      return response.data.map((el) => {
        return {
          ...el,
          turnover_rate: Number(el.turnover_rate),
          month: dateYearMonthFormatter(el),
        };
      });
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
      return response.data.map((el) => {
        return {
          ...el,
          day_of_week: mapDayOfWeek(el),
          transaction_count: Number(el.transaction_count),
        };
      });
    },
  });
  return {
    pendingDailyStockMovement: isPending,
    errorDailyStockMovement: error,
    dataDailyStockMovement: data,
    fetchingDailyStockMovement: isFetching,
  };
};
