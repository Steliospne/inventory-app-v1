import z from 'zod';
import validator from 'validator';

export const SupplierSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .trim()
    .min(1, { message: 'Product name cannot be empty' })
    .refine(
      (val) => {
        return validator.isAlphanumeric(val, 'en-US', {
          ignore: '/[^-_\\s&]/g',
        });
      },
      {
        message:
          'Product name must contain only letters, numbers and (-,_,&,spaces)',
      },
    ),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email (example@domain.com)' }),
  phone: z.string().trim(),
  contactPerson: z.string().trim().optional(),
  address: z.string().trim().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const LoginSchema = z.object({
  username: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email (example@domain.com)' }),
  password: z
    .string()
    .trim()
    .min(4, { message: 'Must be at least 4 characters long' }),
});

export const ProductSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .trim()
    .min(1, { message: 'Product name cannot be empty' })
    .refine(
      (val) => {
        return validator.isAlphanumeric(val, 'en-US', {
          ignore: '/[^-_\\s&]/g',
        });
      },
      {
        message:
          'Product name must contain only letters, numbers and (-,_,&, )',
      },
    ),
  category: z
    .string()
    .trim()
    .min(1, { message: 'Product category cannot be empty' }),
  stock: z
    .number()
    .gte(1, { message: 'You need to provide a stock value' })
    .nonnegative(),
  price: z
    .number()
    .gte(1, { message: 'You need to provide a price value' })
    .nonnegative(),
  isAvailable: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, { message: 'Category name cannot be empty' }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
