import { ApiPath, ContentType } from '~/common/enums/enums';
import { Http } from '../http/http.service';
import { getToken } from '~/utils/auth';
import {
  CreateReviewDTO,
  DeliverTaskRequestDTO,
  OrderCreateRequestDTO,
  OrderDTO,
  RejectTaskRequestDTO,
  ReviewDTO,
} from '~/common/types/types';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Orders {
  private http: Http;
  private baseUrl: string;
  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.ORDERS;
  }

  public getById(id: string): Promise<OrderDTO> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${id}`), {
      method: 'GET',
      token,
    });
  }

  public getAll(): Promise<OrderDTO[]> {
    const token = getToken();
    return this.http.load(this.getUrl(), {
      method: 'GET',
      token,
    });
  }

  public create(data: OrderCreateRequestDTO): Promise<OrderDTO> {
    const token = getToken();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    if (data.taskDetailsFiles) {
      data.taskDetailsFiles.forEach((file) => {
        formData.append('taskDetailsFiles', file);
      });
    }

    return this.http.load(this.getUrl(), {
      method: 'POST',
      payload: formData,
      token,
    });
  }

  public deliverTask(
    id: number,
    data: DeliverTaskRequestDTO
  ): Promise<OrderDTO> {
    const token = getToken();

    const formData = new FormData();
    formData.append('deliveryResponse', data.deliveryResponse);
    data.deliveryResponseFiles.forEach((file) => {
      formData.append('deliveryResponseFiles', file);
    });

    return this.http.load(this.getUrl(`/${id}/deliver-task`), {
      method: 'PATCH',
      payload: formData,
      token,
    });
  }

  public rejectTask(id: number, data: RejectTaskRequestDTO): Promise<OrderDTO> {
    const token = getToken();

    return this.http.load(this.getUrl(`/${id}/reject-task`), {
      method: 'PATCH',
      contentType: ContentType.JSON,
      payload: JSON.stringify(data),
      token,
    });
  }

  public acceptTask(id: number): Promise<OrderDTO> {
    const token = getToken();

    return this.http.load(this.getUrl(`/${id}/accept-task`), {
      method: 'PATCH',
      token,
    });
  }

  public createReview(
    orderId: number,
    data: CreateReviewDTO
  ): Promise<ReviewDTO> {
    const token = getToken();

    return this.http.load(this.getUrl(`/${orderId}/reviews`), {
      method: 'POST',
      contentType: ContentType.JSON,
      payload: JSON.stringify(data),
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Orders };
export type { Constructor as OrdersConstructor };
