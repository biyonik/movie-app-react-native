import axios from 'axios';

const API_KEY = process.env.API_KEY;

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = {};
axios.defaults.params['api_key'] = API_KEY;
axios.defaults.params['language'] = 'en-US';

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export interface IError {
  code: number;
  message: string;
}

export const Get = async <T>(
  url: string,
  setState: React.Dispatch<React.SetStateAction<T>>,
  setError: React.Dispatch<React.SetStateAction<unknown | IError | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    setLoading(true);
    const response = await axios.get<T>(url);
    setState(response.data);
    setLoading(false);
  } catch (error: unknown) {
    setLoading(false);
    console.log(error);
    setError(error);
  } finally {
    setLoading(false);
  }
};

export default axios;
