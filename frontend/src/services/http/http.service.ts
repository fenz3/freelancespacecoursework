import { ContentType, HttpHeader } from '~/common/enums/enums';
import { HttpMethod, ValueOf } from '~/common/types/types';
import { configureQueryString } from '~/helpers/helpers';

type HttpOptions = {
  method: HttpMethod;
  contentType: ValueOf<typeof ContentType>;
  payload: BodyInit | null;
  token?: string | null;
  query?: Record<string, string>;
};

class Http {
  public load<T = unknown>(
    path: string,
    options: Partial<HttpOptions> = {}
  ): Promise<T> {
    const {
      method = 'GET',
      payload = null,
      contentType,
      token,
      query,
    } = options;

    const headers = this.getHeaders(contentType, token);
    const url = configureQueryString(path, query);

    return fetch(url, {
      method,
      headers,
      body: payload,
    })
      .then(this.checkStatus)
      .then((res) => this.parseJSON<T>(res))
      .catch(this.throwError);
  }

  private getHeaders(
    contentType?: ValueOf<typeof ContentType>,
    token?: string | null
  ): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (token) {
      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
    }

    return headers;
  }

  private async checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      const error = await response.json();
      throw {
        status: response.status,
        message: error.message || response.statusText,
      };
    }

    return response;
  }

  private parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  private throwError(err: { status: number; message: string }): never {
    throw err;
  }
}

export { Http };
