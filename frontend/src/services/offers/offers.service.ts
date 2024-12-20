import { ApiPath } from '~/common/enums/enums';
import { Http } from '../http/http.service';
import { getToken } from '~/utils/auth';
import { OfferCreateRequestDTO, OfferDTO } from '~/common/types/types';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Offers {
  private http: Http;
  private baseUrl: string;
  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.OFFERS;
  }

  public getAllByOrderId(orderId: string): Promise<OfferDTO[]> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${orderId}`), {
      method: 'GET',
      token,
    });
  }

  public findLatestByOrderId(orderId: string): Promise<OfferDTO> {
    const token = getToken();
    return this.http.load(this.getUrl(`/order/${orderId}/latest`), {
      method: 'GET',
      token,
    });
  }

  public create(data: OfferCreateRequestDTO): Promise<OfferDTO> {
    const token = getToken();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });
    if (data.detailsFiles) {
      data.detailsFiles.forEach((file) => {
        formData.append('detailsFiles', file);
      });
    }

    return this.http.load(this.getUrl(), {
      method: 'POST',
      payload: formData,
      token,
    });
  }

  public accept(id: number): Promise<OfferDTO> {
    const token = getToken();

    return this.http.load(this.getUrl(`/${id}/accept`), {
      method: 'PATCH',
      token,
    });
  }

  public reject(id: number): Promise<OfferDTO> {
    const token = getToken();

    return this.http.load(this.getUrl(`/${id}/reject`), {
      method: 'PATCH',
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Offers };
export type { Constructor as OffersConstructor };
