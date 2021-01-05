import moment from 'moment';
import { DATETIME_FORMAT } from '../../constants/cycle';
import {
  getLastSyncTime,
  findUnsyncedTrackingOptions,
  findUnsyncedProfileData,
  findUnsyncedPregnancyInfo,
  updateLastSyncTime,
  getUser,
  saveProfileData,
  addPregnancy,
  addTrackingOption,
} from './query';
import api from '../../services/api';

export default async () => {
  const lastSyncTime = await getLastSyncTime();
  // if (new Date() > lastSyncTime) {
  const trackingOptions = await findUnsyncedTrackingOptions(lastSyncTime);
  const profile = await findUnsyncedProfileData(lastSyncTime);
  const pregnancy = await findUnsyncedPregnancyInfo(lastSyncTime);
  console.log('hereeeeeee in sync', trackingOptions);
  const user = await getUser();
  console.log('پروفایل', profile, pregnancy, trackingOptions);
  if (profile.length !== 0)
    await api({
      method: 'POST',
      url: `/profile/syncProfile/${user.id}/fa`,
      dev: true,
      data: profile,
    });
  const profileData = await api({
    url: `/profile/syncProfile/${user.id}/${lastSyncTime ?? null}/fa`,
    dev: true,
  });
  if (profileData.data.data.length !== 0) {
    saveProfileData(profileData.data.data[0]);
  }
  await api({
    method: 'POST',
    url: `/pregnancy/syncPregnancyInfo/${user.id}/fa`,
    dev: true,
    data: { data: pregnancy },
  });
  const pregnancyInfo = await api({
    url: `/pregnancy/syncPregnancyInfo/${user.id}/${lastSyncTime ?? null}/fa`,
    dev: true,
  });
  if (pregnancyInfo.data.data) addPregnancy(pregnancyInfo.data.data);
  await api({
    method: 'POST',
    url: `/healthTracking/syncUserInfo/${user.id}/fa`,
    dev: true,
    data: { data: trackingOptions },
  });
  const userInfo = await api({
    url: `/healthTracking/syncUserInfo/${user.id}/${lastSyncTime ?? null}/fa`,
    dev: true,
  });
  if (userInfo.data.data.length !== 0) {
    userInfo.data.data.forEach((i) => {
      addTrackingOption(i.tracking_option_id, i.date);
    });
  }
  updateLastSyncTime(moment().format(DATETIME_FORMAT));
  // }
};
