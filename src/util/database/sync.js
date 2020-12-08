import axios from 'axios';
import moment from 'moment';
import { ToastAndroid } from 'react-native';
import { DATETIME_FORMAT } from '../../constants/cycle';
import { baseUrl, devUrl } from '../../services/urls';
import { getData } from '../func';
import {
  getLastSyncTime,
  findUnsyncedTrackingOptions,
  findUnsyncedProfileData,
  findUnsyncedPregnancyInfo,
  updateLastSyncTime,
  getUser,
} from './query';

export default async () => {
  const lastSyncTime = await getLastSyncTime();
  if (new Date() > lastSyncTime) {
    const trackingOptions = await findUnsyncedTrackingOptions(lastSyncTime);
    const profile = await findUnsyncedProfileData(lastSyncTime);
    const pregnancy = await findUnsyncedPregnancyInfo(lastSyncTime);
    console.log('hereeeeeee in sync', trackingOptions);
    const token = await getData('@token');
    const user = await getUser();
    axios({
      method: 'POST',
      url: `${devUrl}/healthTracking/syncUserInfo/${user.id}/fa`,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      data: trackingOptions,
    })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.error(err, err.response);
        if (err.toString() === 'Error: Network Error')
          ToastAndroid.show('لطفا اتصال اینترنت رو چک کن.', ToastAndroid.LONG);
        else {
          switch (err.response.status) {
            case 400:
            case 418:
            case 502:
          }
        }
      });
    //updateLastSyncTime(moment().format(DATETIME_FORMAT));
  }
};
