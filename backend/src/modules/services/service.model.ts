import { ServiceCreateInput } from 'shared/src';

export { ServiceDTO, ServiceCreateInput, GetAllServicesDTO } from 'shared/src';

export type ServiceCreateWithCreatorId = ServiceCreateInput & {
  creatorId: number;
};
