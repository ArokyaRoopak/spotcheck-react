import axios, { AxiosInstance } from "axios";
import { config as conf } from "../../config/config";

export interface APIConfig {
  baseURL?: string;
  headers?: Record<string, string>;
}

export function createAxiosClient(config?: APIConfig): AxiosInstance {
  return axios.create({
    baseURL: config?.baseURL ?? conf.APP_BASE_URL,
    headers: {
      ...config?.headers,
      ...{ "Content-Type": "application/json" },
    },
    withCredentials: true,
  });
}
