import { useState, useEffect } from 'react';
import axios from 'axios';

//util
import { getData } from '../../util/func';

//services
import { baseUrl, devUrl } from '../../services/urls';

const useFetcher = ({ method, dev = false, url, data = null }) => {
  //to maryam: is there any problem to set default of GET method for this hook?
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (method === 'get' || method === 'GET')
        await axios({
          method: method,
          url: dev ? `${devUrl}${url}` : `${baseUrl}${url}`,
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': await getData('@token'),
          },
        });
      //to maryam: when you are using await there is no need to use .then too.
      //you can have await function result in some variable then use it.
      else
        await axios({
          method: method,
          url: dev ? `${devUrl}${url}` : `${baseUrl}${url}`,
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': await getData('@token'),
          },
          data: data,
        })
          .then((res) => {
            setResponse(res.data);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
    };

    fetchData();
  }, [method, dev, url, data]);

  return { response, error, isLoading };
};

export default useFetcher;
