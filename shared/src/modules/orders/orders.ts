import { z } from 'zod';
import { UserDTO } from '../users/types';
import { ServiceDTO } from './../services/services';
import { OfferDTO } from '../offers/offers';
import { ReviewDTO } from '../reviews/reviews';

export enum OrderStatus {
  PENDING = 'PENDING',
  OFFER_SUBMITTED = 'OFFER_SUBMITTED',
  OFFER_ACCEPTED = 'OFFER_ACCEPTED',
  REJECTED = 'REJECTED',
  RESULTS_SUBMITTED = 'RESULTS_SUBMITTED',
  RESULTS_REJECTED = 'RESULTS_REJECTED',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
}

export interface OrderDTO {
  id: number;
  serviceId: number;
  service?: ServiceDTO;
  clientId: number;
  client?: UserDTO;
  freelancerId: number;
  freelancer?: UserDTO;
  status: OrderStatus;
  taskDetails?: string | null;
  taskDetailsFiles?: string[] | null;
  deliveryResponse?: string | null;
  deliveryResponseFiles?: string[] | null;
  rejectNotes?: string | null;
  price: number;
  deliveryTime: number;
  createdAt: Date;
  updatedAt: Date;
  statusHistory?: OrderStatusHistory[];
  offers?: OfferDTO[];
  review?: ReviewDTO;
}

export interface OrderStatusHistory {
  id: number;
  orderId: number;
  order?: OrderDTO;
  status: OrderStatus;
  createdAt: Date;
}

export interface OrderCreateRequestDTO {
  serviceId: number; // The ID of the service being ordered
  freelancerId: number;
  price: number; // Agreed price for the service
  deliveryTime: number; // Agreed delivery time (in days)
  taskDetails: string; // Task description
  taskDetailsFiles?: string[]; // Optional files related to the task description
}

export type DeliverTaskRequestDTO = {
  deliveryResponse: string;
  deliveryResponseFiles: File[];
};

export type RejectTaskRequestDTO = {
  rejectNotes: string;
};

const OrderCreateRequestSchema = z.object({
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
  taskDetails: z
    .string({
      required_error: 'Task details are required.',
    })
    .min(1, 'Task details cannot be empty.')
    .max(2000, 'Task details must be no more than 2000 characters.'),
  taskDetailsFiles: z
    .array(
      z.union([
        z.string().url('Each file must be a valid URL.'),
        z.instanceof(File),
      ])
    )
    .max(5, 'You can upload a maximum of 5 files.')
    .optional(),
});

const DeliverTaskRequestSchema = z.object({
  deliveryResponse: z
    .string({
      required_error: 'Delivery response is required.',
    })
    .min(1, 'Delivery response cannot be empty.')
    .max(2000, 'Delivery response must be no more than 2000 characters.'),
  deliveryResponseFiles: z
    .array(
      z.union([
        z.string().url('Each file must be a valid URL.'),
        z.instanceof(File),
      ])
    )
    .max(5, 'You can upload a maximum of 5 files.')
    .optional(),
});

const RejectTaskRequestSchema = z.object({
  rejectNotes: z
    .string({
      required_error: 'Reject notes are required.',
    })
    .min(1, 'Reject notes cannot be empty.')
    .max(2000, 'Reject notes must be no more than 2000 characters.'),
});

export {
  OrderCreateRequestSchema,
  DeliverTaskRequestSchema,
  RejectTaskRequestSchema,
};
