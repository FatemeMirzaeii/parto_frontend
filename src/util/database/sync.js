import axios from 'axios';
import moment from 'moment';
import { ToastAndroid } from 'react-native';
import { DATETIME_FORMAT } from '../../constants/cycle';
import { baseUrl } from '../../services/urls';
import {
  getLastSyncTime,
  findUnsyncedTrackingOptions,
  findUnsyncedProfileData,
  findUnsyncedPregnancyInfo,
  updateLastSyncTime,
} from './query';

export default async () => {
  const lastSyncTime = await getLastSyncTime();
  if (new Date() > lastSyncTime) {
    console.log('hereeeeeee in sync');
    const trackingOptions = await findUnsyncedTrackingOptions(lastSyncTime);
    const profile = await findUnsyncedProfileData(lastSyncTime);
    const pregnancy = await findUnsyncedPregnancyInfo(lastSyncTime);
    console.log('hereeeeeee in sync', trackingOptions);
    // //todo: should send data to backend and be tested
    axios({
      method: 'post',
      url: `${baseUrl}/healthTracking/syncUserInfo/{userId}/{lang}`,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {},
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
