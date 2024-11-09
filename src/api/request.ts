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
    console.log('error', error);
    if (error.response && error.response.status === 401 && !isRefreshing) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            isRefreshing = true;
            const dataUserResponse = await instance.post('/refresh', {
              refreshToken,
            });
            if (
              'result' in dataUserResponse &&
              'token' in dataUserResponse &&
              'refreshToken' in dataUserResponse &&
              typeof dataUserResponse.token === 'string' &&
              typeof dataUserResponse.refreshToken === 'string'
            ) {
              if (dataUserResponse.result === 'Authorized') {
                localStorage.setItem('token', dataUserResponse.token);
                localStorage.setItem('refreshToken', dataUserResponse.refreshToken);
                error.config.headers.Authorization = `Bearer ${dataUserResponse.token}`;
                return instance.request(error.config);
              }
            }
          }
        } else {
          window.location.href = '/#/login';
        }
      } catch (refreshError) {
        console.log('refreshError', refreshError);
      }
      isRefreshing = false;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/#/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
