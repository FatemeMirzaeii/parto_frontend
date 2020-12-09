import moment from 'moment';
import { DATETIME_FORMAT } from '../../constants/cycle';
import useFetcher from '../hooks/useFetcher';
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
    const tp = useFetcher({
      method: 'POST',
      dev: true,
      url: `/healthTracking/syncUserInfo/31/fa`,
      data: trackingOptions,
    });
    console.log('tp fetcher', tp);
    //updateLastSyncTime(moment().format(DATETIME_FORMAT));
  }
};
