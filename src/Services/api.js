import { getData } from '../lib/func';
import { baseUrl } from './ApiNames';
export class api {
  constructor() {
    this.Date;
    this.state = {
      _status: null,
      _data: null,
      _error: null,
      _message: null,
      _token: null,
      url: 'https://',
    };
  }

  async request(_url, _body = null, _method = 'POST', isEncrypt = null) {
    const url = baseUrl + _url;
    console.log(url);
    const token = await getData('@token');
    console.log(token);
    _method = _method.toUpperCase();
    var body1, header, RI;
    header = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-auth-token': token,
    });
    if (isEncrypt === 'LoginPage') {
      //body1 = aes.EncryptBody(_body);
    } else {
      body1 = _body;
    }
    if (_method === 'GET') {
      RI = {
        method: _method,
        headers: header,
      };
    } else {
      RI = {
        method: _method,
        headers: header,
        body: JSON.stringify(body1),
      };
    }
    // console.log(body);
    await this.FetchWithTimeOut(
      url.includes('http://') || url.includes('https://')
        ? url
        : this.state.url + url,
      RI,
    )
      .then((response) => {
        console.log(response);
        this.state._token = response.headers.get('x-auth-token');
        this.state._status = response.status;
        return response.json();
      })
      .then((responseJson) => {
        console.log('responseJson: ', responseJson);
        this.state._data = responseJson;
        // if (isEncrypt === 'LoginPage') {
        //     const DecryptedResponse = aes.DecryptBody(responseJson);
        //     this.state._Response._data = DecryptedResponse.data ? DecryptedResponse.data : DecryptedResponse.error ? DecryptedResponse.error : null;
        // }
      })
      .catch((error) => {
        this.state._error = error;
      });

    return this.state;
  }

  async FetchWithTimeOut(url, options, timeout = 5000) {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), timeout),
      ),
    ]);
  }
}
