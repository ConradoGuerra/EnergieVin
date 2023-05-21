import IRequestConfig from './IRequestConfig';
import IResponse from './IResponse';

export default interface IHttpClient {
  get<T = any>(url: string, config?: IRequestConfig): Promise<IResponse<T>>;

  post<T = any>(
    url: string,
    data: any,
    config?: IRequestConfig,
  ): Promise<IResponse<T>>;
}
