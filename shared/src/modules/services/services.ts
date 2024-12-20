export type ServiceDTO = {
  id: number;
  title: string;
  categoryId: number;
  category?: CategoryDTO;
  subcategoryId: number;
  subcategory?: SubcategoryDTO;
  description: string;
  coverImages: string[];
  startingPrice: number;
  deliveryTime: number;
  serviceDetails: string[];
  rating: number;
  ratingCount: number;
  isDeleted: boolean;
  creatorId: number;
  creator?: UserDTO;
  reviews?: ReviewDTO[];
  orders?: OrderDTO[];
  createdAt: Date;
  updatedAt: Date;
};

export type GetAllServicesDTO = {
  services: ServiceDTO[];
  totalCount: number;
};

export type ServiceCreateInput = {
  title: string;
  categoryId: number;
  subcategoryId: number;
  description: string;
  coverImages: string[];
  startingPrice: number;
  deliveryTime: number;
  serviceDetails: string[];
};

export type ServiceCreateRequestDTO = {
  title: string;
  categoryId: number;
  subcategoryId: number;
  description: string;
  coverImages: File[];
  startingPrice: number;
  deliveryTime: number;
  serviceDetails: string[] | string;
};

type GetAllServicesRequestDTO = {
  name: string;
  creatorId?: number;
  categoryId?: number;
  subcategoryId?: number;
  deliveryTime?: number;
  minPrice?: number;
  maxPrice?: number;
} & PaginationQueryParameters;

export { type GetAllServicesRequestDTO };

type GetAllServicesRequestFilter = {
  title?: { contains: string; mode: string };
  creatorId?: number;
  categoryId?: number;
  subcategoryId?: number;
  deliveryTime?: { lte: number };
  startingPrice?: { lte?: number | undefined; gte?: number | undefined };
};
export { type GetAllServicesRequestFilter };

import { z } from 'zod';
import { UserDTO } from '../users/types';
import { CategoryDTO, SubcategoryDTO } from '../categories/categories';
import { PaginationQueryParameters } from '../common/common';
import { ReviewDTO } from '../reviews/reviews';
import { OrderDTO } from '../orders/orders';

export const ServiceCreateSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 10 characters long.' })
    .max(100, { message: 'Title must be no more than 70 characters.' }),
  categoryId: z
    .number()
    .int({ message: 'Category ID must be an integer.' })
    .positive({ message: 'Choose category to continue.' }),
  subcategoryId: z
    .number()
    .int({ message: 'Category ID must be an integer.' })
    .positive({ message: 'Choose subcategory to continue.' }),
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
  startingPrice: z
    .number()
    .int({ message: 'Starting price must be an integer.' })
    .positive({ message: 'Starting price must be a positive number.' }),
  deliveryTime: z
    .number()
    .int({ message: 'Delivery time must be an integer.' })
    .positive({ message: 'Delivery time must be a positive number.' })
    .max(99, { message: 'Maximum delivery time is 99 days.' }),
  serviceDetails: z
    .string()
    .min(1, { message: 'Add at least one detail.' })
    .max(100, {
      message: 'Service details must be no more than 100 characters.',
    }),
});
