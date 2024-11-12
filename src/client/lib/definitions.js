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
