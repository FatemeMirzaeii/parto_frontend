
import AsyncStorage from '@react-native-community/async-storage';
import { getData, storeData } from '../app/Functions'
export class RESTAPI {
    constructor() {
        this.Date;
        this.state = {
            _status: null,
            _data: null,
            _error: null,
            _message: null,
            Token: null,
        }
    }
    getData = () => {
        console.log("getData")
        getData("@token")
    }
    StoreToken = async (token) => {
        console.log("storedata")
        await storeData("@token", token)
    }
    async request(_url, _body = null, _method = 'POST', Isencrypt = null) {
        token = getData()
        console.log("token: ", token)
        _method = _method.toUpperCase();
        var body1, header;
        header = new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': token,
        });
        if (Isencrypt === 'LoginPage')
            body1 = aes.EncryptBody(_body);
        else
            body1 = _body;
        if (_method === 'GET') {
            var RI = {
                method: _method,
                headers: header,
            };
        } else {
            var RI = {
                method: _method,
                headers: header,
                body: JSON.stringify(body1)
            };
        }
        await this.FetchWithTimeOut((_url.includes("http://") || _url.includes("https://")) ? _url : this.state.url + _url, RI)
            .then((response) => {
                this.state.Token = response.headers.map.x_auth_token
                if (response.headers.map.x_auth_token)
                    this.StoreToken(response.headers.map.x_auth_token)
                this.state._status = response.status
                return response.json()
            })
            .then((responseJson) => {
                // console.log("res2  ", responseJson)
                this.state._data = responseJson
                // if (Isencrypt === 'LoginPage') {
                //     const DecryptedResponse = aes.DecryptBody(responseJson);
                //     this.state._Response._data = DecryptedResponse.data ? DecryptedResponse.data : DecryptedResponse.error ? DecryptedResponse.error : null;
                // }

            })
            .catch((error) => {
                this.state._error = error
            });

        return this.state;
    }

    async FetchWithTimeOut(url, options, timeout = 5000) {
        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('timeout')), timeout)
            )
        ]);

    }
}