export type ServiceDto = {
  id: number;
  title: string;
  categoryId: number;
  category?: CategoryDto;
  smallDesc: string;
  description: string;
  coverImages: string[];
  portfolioItems: string[];
  startingPrice: number;
  deliveryTime: number;
  skillsRequired: string[];
  rating: number;
  ratingCount: number;
  creatorId: number;
  creator?: UserDto;
  createdAt: Date;
  updatedAt: Date;
};

export type ServiceCreateInput = {
  title: string;
  categoryId: number;
  smallDesc: string;
  description: string;
  coverImages: string[];
  portfolioItems: string[];
  startingPrice: number;
  deliveryTime: number;
  skillsRequired: string[];
};

export type ServiceCreateRequestDto = {
  title: string;
  categoryId: number;
  smallDesc: string;
  description: string;
  coverImages: File[];
  portfolioItems?: File[];
  startingPrice: number;
  deliveryTime: number;
  skillsRequired: string[];
};

import { z } from 'zod';
import { UserDto } from '../users/types';
import { CategoryDto } from '../categories/categories';

export const ServiceCreateSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 10 characters long.' })
    .max(100, { message: 'Title must be no more than 70 characters.' }),
  categoryId: z
    .number()
    .int({ message: 'Category ID must be an integer.' })
    .positive({ message: 'Category ID must be a positive number.' }),
  smallDesc: z
    .string()
    .min(10, { message: 'Small description must be at least 10 characters.' })
    .max(100, {
      message: 'Small description must be no more than 100 characters.',
    }),
  description: z
    .string()
    .min(20, { message: 'Description must be at least 20 characters.' })
    .max(2000, {
      message: 'Description must be no more than 2000 characters.',
    }),
  coverImages: z
    .array(z.union([z.instanceof(File), z.string().url()]))
    .nonempty({ message: 'At least one cover image is required.' })
    .max(5, { message: 'No more than 5 cover images are allowed.' }),
  portfolioItems: z
    .array(z.union([z.instanceof(File), z.string().url()]))
    .max(3, { message: 'No more than 3 portfolio images are allowed.' })
    .optional(),
  startingPrice: z
    .number()
    .int({ message: 'Starting price must be an integer.' })
    .positive({ message: 'Starting price must be a positive number.' }),
  deliveryTime: z
    .number()
    .int({ message: 'Delivery time must be an integer.' })
    .positive({ message: 'Delivery time must be a positive number.' }),
  skillsRequired: z
    .array(
      z
        .string()
        .min(1, { message: 'Each skill must be at least 1 character long.' })
    )
    .nonempty({ message: 'At least one skill is required.' }),
});
