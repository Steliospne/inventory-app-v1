import z from 'zod';

export const LoginSchema = z.object({
  username: z
    .string()
    .email({ message: 'Please enter a valid email (example@domain.com)' })
    .trim(),
  password: z
    .string()
    .min(4, { message: 'Must be at least 4 characters long' })
    .trim(),
});

export const ProductSchema = z.object({
  product: z
    .string()
    .trim()
    .min(1, { message: 'Product name cannot be empty' }),
  category: z
    .string()
    .min(1, { message: 'Product category cannot be empty' })
    .trim(),
  stock: z
    .number()
    .gte(1, { message: 'You need to provide a stock value' })
    .nonnegative(),
  price: z
    .number()
    .gte(1, { message: 'You need to provide a price value' })
    .nonnegative(),
});
