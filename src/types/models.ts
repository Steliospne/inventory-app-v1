import { z } from 'zod';
import {
  CategorySchema,
  ProductSchema,
  SupplierSchema,
} from '../lib/definitions';

export type User = {
  userId?: string;
  username?: string;
  password?: string;
};

export type Category = z.infer<typeof CategorySchema>;

export type Categories = Category[];

export type Product = z.infer<typeof ProductSchema>;

export type Products = Product[];

export type Supplier = z.infer<typeof SupplierSchema>;

export type Suppliers = Supplier[];

export type ValidationErrors = {
  [fieldName: string]: string[];
};
