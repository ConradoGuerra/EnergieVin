import axios, { AxiosInstance } from 'axios';
import https from 'https';

import IHttpClient from '../models/IHttpClient';
import IRequestConfig from '../models/IRequestConfig';
import IResponse from '../models/IResponse';

export default class HttpClient implements IHttpClient {
  private instance: AxiosInstance;

  constructor() {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    this.instance = axios.create({
      httpsAgent,
    });
  }

  async get<T = any>(
    url: string,
    config?: IRequestConfig,
  ): Promise<IResponse<T>> {
    return this.instance.get(url, config).then(res => ({
      status: res.status,
      data: res.data,
    }));
  }

  async post<T = any>(
    url: string,
    data: any,
    config?: IRequestConfig,
  ): Promise<IResponse<T>> {
    return this.instance.post(url, data, config).then(res => ({
      status: res.status,
      data: res.data,
    }));
  }
}
