import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import environment from '@environments/environment';

const baseURL = environment.backend;
const http: AxiosInstance = axios.create({ baseURL });

const updateHeaders = (token: string) => {
  http.interceptors.request.use(async (config: AxiosRequestConfig) => {
    if (!config.headers) {
      return;
    }
    config.headers['Authorization'] = token ? `Bearer ${token}` : '';
    return config;
  });
};

export { http, updateHeaders };
