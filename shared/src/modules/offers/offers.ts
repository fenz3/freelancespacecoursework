import { z } from 'zod';
import { OrderDTO } from '../orders/orders';
import { UserDTO } from '../users/users';

export enum OfferStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface OfferDTO {
  id: number;
  orderId: number;
  order?: OrderDTO;
  creatorId: number;
  creator?: UserDTO;
  details: string;
  detailsFiles?: string[];
  price: number;
  deliveryTime: number;
  status: OfferStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OfferCreateRequestDTO {
  orderId: number; // The ID of the order to which the offer is being made
  details: string; // The details of the offer or task (what the freelancer will do)
  detailsFiles?: string[]; // Optional files attached to the offer
  price: number; // The proposed price by the freelancer for completing the task
  deliveryTime: number; // The proposed delivery time for the freelancer (in days)
}

export const OfferCreateRequestSchema = z.object({
  price: z
    .number({
      required_error: 'Price is required.',
    })
    .positive('Price must be a positive number.'),
  deliveryTime: z
    .number({
      required_error: 'Delivery time is required.',
    })
    .positive('Delivery time must be a positive number.'),
  details: z
    .string({
      required_error: 'Task details are required.',
    })
    .min(1, 'Task details cannot be empty.')
    .max(2000, 'Task details must be no more than 2000 characters.'),
  detailsFiles: z
    .array(
      z.union([
        z.string().url('Each file must be a valid URL.'),
        z.instanceof(File),
      ])
    )
    .max(5, 'You can upload a maximum of 5 files.')
    .optional(),
});
