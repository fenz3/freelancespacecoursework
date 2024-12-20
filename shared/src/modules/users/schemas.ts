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
    firstName: z
      .string()
      .min(1, 'First name must be at least 3 character long'),
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

export const UserPatchRequestSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(50, { message: 'First name must be at most 100 characters' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(50, { message: 'Last name must be at most 100 characters' }),

  profession: z
    .string()
    .max(50, { message: 'Profession must be at most 50 characters' })
    .optional(),

  photoUrl: z.union([z.instanceof(File), z.string().url()]),

  portfolioItems: z
    .array(z.union([z.instanceof(File), z.string().url()]))
    .max(10, { message: 'No more than 10 portfolio items are allowed.' })
    .optional(),
});
