import { z } from 'zod';

export const signUpRequestSchema = z.object({
  firstName: z.string().min(1, 'First name must be at least 1 character long'),
  lastName: z.string().min(1, 'Last name must be at least 1 character long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 6 characters long'),
  role: z.string().min(1, 'Choose role to continue'),
});

export const signUpRequestSchemaFront = z
  .object({
    firstName: z.string().min(1, 'First name must be at least 3 character long'),
    lastName: z.string().min(1, 'Last name must be at least 3 character long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 6 characters long'),
    role: z.string().min(1, 'Choose role to continue'),
    confirmPassword: z
      .string()
      .min(8, 'Confirm password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const signInRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
