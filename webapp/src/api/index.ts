import { AxiosInstance } from "axios";
import { APIConfig, createAxiosClient } from "./util/axios-client";
import { handleError } from "./util/error-handler";

export interface ApiPostRequestType<TRequest> {
  path: string;
  payload: TRequest;
}

export class Api {
  private static instance: Api | null;

  private readonly axiosInstance: AxiosInstance;

  constructor(config?: APIConfig) {
    this.axiosInstance = createAxiosClient(config);

    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      console.log("config", token);

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });
  }

  public static getInstance(config?: APIConfig): Api {
    if (Api.instance == null) {
      Api.instance = new Api(config);
    }
    return Api.instance;
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    axiosConfig?: Record<string, any>
  ): Promise<TResponse> {
    return await new Promise((resolve, reject) => {
      this.axiosInstance
        .post<TResponse>(path, payload, axiosConfig)
        .then((response) => resolve(response.data))
        .catch((error) => {
          reject(handleError(error));
        });
    });
  }

  async put<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    return await new Promise((resolve, reject) => {
      this.axiosInstance
        .put<TResponse>(path, payload)
        .then((response) => resolve(response.data))
        .catch((error) => {
          reject(handleError(error));
        });
    });
  }

  async patch<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    return await new Promise((resolve, reject) => {
      this.axiosInstance
        .patch<TResponse>(path, payload)
        .then((response) => resolve(response.data))
        .catch((error) => {
          reject(handleError(error));
        });
    });
  }

  async get<TResponse>(
    path: string,
    abortController?: AbortController
  ): Promise<TResponse> {
    return await new Promise((resolve, reject) => {
      this.axiosInstance
        .get<TResponse>(path, { signal: abortController?.signal })
        .then((response) => resolve(response.data))
        .catch((error) => {
          reject(handleError(error));
        });
    });
  }

  async delete<TResponse>(path: string): Promise<TResponse> {
    return await new Promise((resolve, reject) => {
      this.axiosInstance
        .delete<TResponse>(path)
        .then((response) => resolve(response.data))
        .catch((error) => {
          reject(handleError(error));
        });
    });
  }
}
