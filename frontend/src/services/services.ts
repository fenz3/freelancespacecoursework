import { Http } from './http/http.service';
import { Auth } from './auth/auth.service';
import { ApiPath } from '~/common/enums/enums';
import { Services } from './services/service.service';
import { Images } from './images/images.service';
import { Categories } from './categories/category.service';

const http = new Http();

const auth = new Auth({
  baseUrl: ApiPath.API_URL,
  http,
});

const services = new Services({
  baseUrl: ApiPath.API_URL,
  http,
});

const images = new Images({
  baseUrl: ApiPath.API_URL,
  http,
});

const categories = new Categories({
  baseUrl: ApiPath.API_URL,
  http,
});

export { http, auth, services, images, categories };
