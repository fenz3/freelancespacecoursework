import { ApiPath } from '~/common/enums/enums';
import { Http } from '../http/http.service';
import { getToken } from '~/utils/auth';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Images {
  private http: Http;
  private baseUrl: string;
  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.IMAGES;
  }

  public upload(imageFile: File): Promise<string> {
    const token = getToken();
    const formData = new FormData();
    formData.append('image', imageFile);

    return this.http.load(this.getUrl(), {
      method: 'POST',
      payload: formData,
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Images };
export type { Constructor as ImageServiceConstructor };
