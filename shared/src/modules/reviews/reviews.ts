export interface ReviewDTO {
  id: number;
  rating: number;
  details?: string | null;
  creatorId: number;
  creator?: UserDTO;
  orderId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReviewDTO {
  rating: number;
  details?: string;
}

import { z } from 'zod';
import { UserDTO } from '../users/types';

export const CreateReviewSchema = z.object({
  rating: z.number().min(1).max(5, 'Rating must be between 0 and 5'),
  details: z
    .string()
    .max(500, 'Review details must be no more than 500 characters.')
    .optional(),
});
