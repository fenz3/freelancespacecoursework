import { UserDTO, UserPatchRequestDTO } from '~/common/types/types';
import { ApiPath } from '../../common/enums/enums';
import { getToken } from '../../utils/auth';
import { Http } from '../http/http.service';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Users {
  private http: Http;

  private baseUrl: string;

  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.USERS;
  }

  public update(id: string, data: UserPatchRequestDTO): Promise<UserDTO> {
    const token = getToken();

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'photoUrl' && key !== 'portfolioItems')
        formData.append(key, value as string);
    });
    if (data.portfolioItems) {
      data.portfolioItems.forEach((file) => {
        formData.append('portfolioItems', file);
      });
    }
    formData.append('photoUrl', data.photoUrl);
    return this.http.load(this.getUrl(`/${id}`), {
      method: 'PATCH',
      payload: formData,
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Users };
export type { Constructor as UsersConstructor };
