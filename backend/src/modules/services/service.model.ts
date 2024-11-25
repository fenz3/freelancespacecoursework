import { ServiceCreateInput } from 'shared/src';

export { ServiceDto, ServiceCreateInput } from 'shared/src';

export type ServiceCreateWithCreatorId = ServiceCreateInput & {
  creatorId: number;
};