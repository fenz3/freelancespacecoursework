import { ServiceCreateRequestDto } from '~/common/types/types';

const DEFAULT_SERVICE_CREATE_PAYLOAD: ServiceCreateRequestDto = {
  title: '',
  smallDesc: '',
  description: '',
  categoryId: 0,
  startingPrice: 0,
  deliveryTime: 0,
  coverImages: [],
  portfolioItems: [],
  skillsRequired: [],
};

export { DEFAULT_SERVICE_CREATE_PAYLOAD };
