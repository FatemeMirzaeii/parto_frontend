import axios from 'axios';
import { getData } from '../util/func';
import { baseUrl, devUrl } from './urls';

export default async (dev) => {
  const token = await getData('@token');
  return axios.create({
    baseURL: dev ? devUrl : baseUrl,
    timeout: 1000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  });
};
