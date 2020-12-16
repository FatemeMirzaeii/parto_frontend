import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { getData } from '../util/func';
import { baseUrl, devUrl } from './urls';

export default async ({ url, data = null, method = 'GET', dev = false }) => {
  const uri = dev ? devUrl + url : baseUrl + url;
  const token = await getData('@token');
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-auth-token': token,
  };
  const config = {
    method: method.toUpperCase(),
    credentials: 'include',
    headers: headers,
  };
  if (data) config.data = data;
  try {
    const res = await axios(uri, config);
    console.log('api result', res);
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    if (err.toString() === 'Error: Network Error')
      ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
    else ToastAndroid.show(err.response.data.message, ToastAndroid.LONG);
  }
};
