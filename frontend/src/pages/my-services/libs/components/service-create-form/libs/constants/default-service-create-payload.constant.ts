import { ServiceCreateRequestDTO } from '~/common/types/types';

const DEFAULT_SERVICE_CREATE_PAYLOAD: ServiceCreateRequestDTO = {
  title: '',
  description: '',
  categoryId: 0,
  subcategoryId: 0,
  startingPrice: 0,
  deliveryTime: 0,
  coverImages: [],
  serviceDetails: '',
};

export { DEFAULT_SERVICE_CREATE_PAYLOAD };
