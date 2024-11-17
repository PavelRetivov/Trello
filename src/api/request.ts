import axios from 'axios';
import { api } from './common/constants';

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  if (!config.url?.includes('user') && !config.url?.includes('login')) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

let isRefreshing = false;

instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (error) => {
    if (!(error.response && error.response.status === 401 && !isRefreshing)) {
      console.log('tikens');
      return Promise.reject(error);
    }

    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/Trello/#/login';
      return Promise.reject(error);
    }
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      window.location.href = '/Trello/#/login';
      return Promise.reject(error);
    }
    isRefreshing = true;
    try {
      const dataUserResponse = await instance.post('/refresh', {
        refreshToken,
      });
      if (
        !(
          'result' in dataUserResponse &&
          'token' in dataUserResponse &&
          'refreshToken' in dataUserResponse &&
          typeof dataUserResponse.token === 'string' &&
          typeof dataUserResponse.refreshToken === 'string'
        )
      ) {
        window.location.href = '/Trello/#/login';
        return Promise.reject(error);
      }
      if (dataUserResponse.result === 'Authorized') {
        localStorage.setItem('token', dataUserResponse.token);
        localStorage.setItem('refreshToken', dataUserResponse.refreshToken);
        error.config.headers.Authorization = `Bearer ${dataUserResponse.token}`;
        return instance.request(error.config);
      }
    } catch {
      console.log('catch');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/Trello/#/login';
    }

    isRefreshing = false;
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/Trello/#/login';
    return Promise.reject(error);
  }
);

export default instance;
