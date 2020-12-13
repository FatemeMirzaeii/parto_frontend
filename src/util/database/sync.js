import moment from 'moment';
import { DATETIME_FORMAT } from '../../constants/cycle';
import useFetcher from '../hooks/useFetcher';
import axios from 'axios';
import { getData } from '../../util/func';
import { devUrl } from '../../services/urls';

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
    const user = await getUser();
    console.log('user', pregnancy);
    try {
      // const res = await axios({
      //   method: 'POST',
      //   url: `${devUrl}/healthTracking/syncUserInfo/${user.id}/fa`,
      //   credentials: 'include',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //     'x-auth-token': await getData('@token'),
      //   },
      //   data: { data: trackingOptions },
      // });
      const res = await axios({
        method: 'POST',
        url: `${devUrl}/pregnancy/syncPregnancyInfo/${user.id}/fa`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': await getData('@token'),
        },
        data: { data: pregnancy },
      });
      // const res = await axios({
      //   method: 'POST',
      //   url: `${devUrl}/profile/syncProfile/${user.id}/fa`,
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //     'x-auth-token': await getData('@token'),
      //   },
      //   data: profile,
      // });
      // const res = await axios({
      //   method: 'GET',
      //   url: `${devUrl}/profile/syncProfile/${user.id}/${lastSyncTime}/fa`,
      //   credentials: 'include',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //     'x-auth-token': await getData('@token'),
      //   },
      // });
      console.log('gggggggggggggggggggggggggggggg', res.data);
    } catch (error) {
      console.error(error);
    }
    //updateLastSyncTime(moment().format(DATETIME_FORMAT));
  }
};
