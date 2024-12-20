import { ApiPath } from '~/common/enums/enums';
import { Http } from '../http/http.service';
import { getToken } from '~/utils/auth';
import { CategoryDTO, SubcategoryDTO } from '~/common/types/types';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Categories {
  private http: Http;
  private baseUrl: string;
  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.CATEGORIES;
  }

  public getAll(): Promise<CategoryDTO[]> {
    const token = getToken();
    return this.http.load(this.getUrl(''), {
      method: 'GET',
      token,
    });
  }

  public getSubcategoriesByCategoryId(
    categoryId: string
  ): Promise<SubcategoryDTO[]> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${categoryId}/subcategories`), {
      method: 'GET',
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Categories };
export type { Constructor as CategoriesConstructor };
