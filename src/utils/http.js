import Axios from 'axios';
import store from '@/store';

const baseUrl = process.env.VUE_APP_API_BASE_URL;
const defaultHeaders = {
  'Content-Type': 'application/json;charset=UTF-8',
  accessToken: process.env.VUE_APP_ACCESSTOKEN,
};

const instance = Axios.create();
instance.interceptors.request.use(
  (config) => config,
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log('error', error);
    const statusCode = error.response?.status;
    switch (statusCode) {
      case 401:
        console.log('token expired or no auth info exists');
        store.dispatch('login/removeLoginInfo');
        break;

      case undefined:
        console.error(error);
        break;
      default:
    }
    return Promise.reject(error);
  },
);

// 비동기 통신 Object 정의
const httpInstance = {
  get(uri, params = {}, headers = {}, additionalConfig = {}) {
    const url = `${baseUrl}${uri}`;
    const config = {
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      ...additionalConfig,
      params,
    };

    const promise = instance.get(url, config);
    return promise.then(({ data }) => data);
  },
  patch(uri, params = {}, headers = {}, additionalConfig = {}) {
    const url = `${baseUrl}${uri}`;
    const config = {
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      ...additionalConfig,
    };

    const promise = instance.patch(url, params, config);
    return promise.then(({ data }) => data);
  },
  put(uri, params = {}, headers = {}, additionalConfig = {}) {
    const url = `${baseUrl}${uri}`;
    const config = {
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      ...additionalConfig,
    };

    const promise = instance.put(url, params, config);
    return promise.then(({ data }) => data);
  },
  post(uri, params = {}, headers = {}, additionalConfig = {}) {
    const url = `${baseUrl}${uri}`;
    const config = {
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      ...additionalConfig,
    };

    const promise = instance.post(url, params, config);
    return promise.then(({ data }) => data);
  },
  delete(uri, params = {}, headers = {}) {
    const url = `${baseUrl}${uri}`;

    const promise = instance.delete(url, {
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      data: {
        ...params,
      },
    });
    return promise.then(({ data }) => data);
  },
};

export const axios = instance;
export const http = httpInstance;
