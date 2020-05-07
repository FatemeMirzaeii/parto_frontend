
import AsyncStorage from '@react-native-community/async-storage';
import { Platform, } from 'react-native';


var OSname = '';
var DEVICEname = '';
var Version = '';
let _url = null;
var Token = null;
export class RESTAPI {
    constructor() {
        this.Date;
        this.state = {
            _Response: {
                _status: null,
                _data: null,
                _error: null,
                _message: null,
                _pagecount: null
            },
            Token: null,
            url: null,
        }
    }
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@token')
            if (value !== null) {
                this.state.Token = value;
            }
            else {
            }
        } catch (e) {
            // console.log('Error Async get')
        }
    }
    //   getUrlApi = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem('@mazandUrl')
    //       if (value !== null) {
    //         this.state.url = value + '/';
    //       }
    //       else {
    //       }
    //     } catch (e) {
    //       // console.log('Error Async get')
    //     }
    //   }

    //   async SetUserAgent() {
    //     DeviceInfo.getDeviceName().then(deviceName => {
    //       DEVICEname = deviceName;
    //     });
    //     Version = DeviceInfo.getVersion();
    //     if (Platform.OS == 'android') {
    //       OSname = 'Android'
    //     }
    //     else if (Platform.OS == 'ios') {
    //       OSname = 'iOS'
    //     }
    //     this.Date = new Date().getFullYear() + '/' + new Date().getMonth() + '/' + new Date().getDate()
    //   }

    async request(_url, _body = null, _method = 'POST', header2 = null, Isencrypt = null) {
        console.log("1")
        // await this.getData();
        // await this.getUrlApi();
        _method = _method.toUpperCase();
        // aes = new AES256('');
        var body1, header;
        header = new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': '',
        });
        console.log("2")
        // if (this.state.Token) {
        //   header.append('x-access-token', this.state.Token)
        // }
        // await this.SetUserAgent()
        var x =
        {
            'device': DEVICEname,
            'OS': OSname,
            'Date': this.Date,
            'AppVersion': Version
        }
        if (header2 != null) {
            header.append('X-USERAGENT', JSON.stringify(x))
        }
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
        console.log("3")
        await this.FetchWithTimeOut((_url.includes("http://") || _url.includes("https://")) ? _url : this.state.url + _url, RI)
            .then((response) => {
                console.log("res  ", response)
                return response.json()
            })
            // .then((responseJson) => {
            //     if (Isencrypt === 'LoginPage') {
            //         const DecryptedResponse = aes.DecryptBody(responseJson);
            //         this.state._Response._data = DecryptedResponse.data ? DecryptedResponse.data : DecryptedResponse.error ? DecryptedResponse.error : null;

            //     }
            //     this.state._Response._status = responseJson.status.code;
            //     this.state._Response._data = responseJson.results;
            //     this.state._Response._message = responseJson.status.text;
            //     this.state._Response._pagecount = responseJson.status.PageCount;

            // })
            .catch((error) => {
                this.state._Response._error = error;
            });

        return this.state._Response;
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