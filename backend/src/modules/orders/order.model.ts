export {
  OrderDTO,
  OrderCreateRequestDTO,
  OrderStatus,
  ReviewDTO,
  CreateReviewDTO,
} from 'shared/src';

export type GetAllOrdersFilter = {
  OR: (
    | {
        clientId: number;
        freelancerId?: undefined;
      }
    | {
        freelancerId: number;
        clientId?: undefined;
      }
  )[];
};
