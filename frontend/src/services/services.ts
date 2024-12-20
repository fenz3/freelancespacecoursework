import { Http } from './http/http.service';
import { Auth } from './auth/auth.service';
import { ApiPath } from '~/common/enums/enums';
import { Services } from './services/services.service';
import { Images } from './images/images.service';
import { Categories } from './categories/categories.service';
import { Users } from './users/users.service';
import { Orders } from './orders/orders.service';
import { Offers } from './offers/offers.service';

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

const users = new Users({
  baseUrl: ApiPath.API_URL,
  http,
});

const orders = new Orders({
  baseUrl: ApiPath.API_URL,
  http,
});

const offers = new Offers({
  baseUrl: ApiPath.API_URL,
  http,
});

export { http, auth, services, images, categories, users, orders, offers };
