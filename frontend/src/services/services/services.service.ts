import { ApiPath } from '~/common/enums/enums';
import { Http } from '../http/http.service';
import { getToken } from '~/utils/auth';
import {
  GetAllServicesDTO,
  GetAllServicesRequestDTO,
  ServiceCreateRequestDTO,
  ServiceDTO,
} from '~/common/types/types';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Services {
  private http: Http;
  private baseUrl: string;
  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.SERVICES;
  }

  public getById(id: string): Promise<ServiceDTO> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${id}`), {
      method: 'GET',
      token,
    });
  }

  public getAll(query: GetAllServicesRequestDTO): Promise<GetAllServicesDTO> {
    const token = getToken();
    return this.http.load(this.getUrl(), {
      method: 'GET',
      query: {
        name: query.name,
        creatorId: String(query.creatorId),
        categoryId: String(query.categoryId),
        subcategoryId: String(query.subcategoryId),
        deliveryTime: String(query.deliveryTime),
        minPrice: String(query.minPrice),
        maxPrice: String(query.maxPrice),
        page: String(query.page),
        pageSize: String(query.pageSize),
      },
      token,
    });
  }

  public create(data: ServiceCreateRequestDTO): Promise<ServiceDTO> {
    const token = getToken();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    data.coverImages.forEach((file) => {
      formData.append('coverImages', file);
    });

    return this.http.load(this.getUrl(), {
      method: 'POST',
      payload: formData,
      token,
    });
  }

  public update(
    id: string,
    data: ServiceCreateRequestDTO
  ): Promise<ServiceDTO> {
    const token = getToken();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    data.coverImages.forEach((file) => {
      formData.append('coverImages', file);
    });

    return this.http.load(this.getUrl(`/${id}`), {
      method: 'PATCH',
      payload: formData,
      token,
    });
  }

  public delete(id: string): Promise<void> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${id}`), {
      method: 'DELETE',
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Services };
export type { Constructor as ServicesConstructor };
