import moment from 'moment';
import { DATETIME_FORMAT } from '../../constants/cycle';
import {
  getLastSyncTime,
  findUnsyncedTrackingOptions,
  findUnsyncedProfileData,
  findUnsyncedPregnancyInfo,
  updateLastSyncTime,
  getUser,
  addProfileData,
  addSynedPregnancyData,
  addTrackingOption,
} from './query';
import api from '../../services/api';

export default async () => {
  const lastSyncTime = await getLastSyncTime();
  const profile = await findUnsyncedProfileData(lastSyncTime);
  const pregnancy = await findUnsyncedPregnancyInfo(lastSyncTime);
  const trackingOptions = await findUnsyncedTrackingOptions(lastSyncTime);
  console.log('datas to send for server', profile, pregnancy, trackingOptions);
  const user = await getUser();
  // if (new Date() > lastSyncTime) {

  // first will get data from server, if exists!
  const profileData = await api({
    url: `/profile/syncProfile/${user.id}/${lastSyncTime ?? null}/fa`,
    // dev: true,
  });
  if (
    profileData &&
    profileData.data &&
    profileData.data.data &&
    profileData.data.data.length !== 0
  ) {
    console.log('herereeeeeeee', profileData.data.data);
    addProfileData(profileData.data.data[0]);
  }
  const pregnancyInfo = await api({
    url: `/pregnancy/syncPregnancyInfo/${user.id}/${lastSyncTime ?? null}/fa`,
    // dev: true,
  });
  if (
    pregnancyInfo &&
    pregnancyInfo.data &&
    pregnancyInfo.data.data &&
    pregnancyInfo.data.data.length !== 0
  ) {
    pregnancyInfo.data.data.forEach((i) => {
      addSynedPregnancyData(i);
    });
  }
  const userInfo = await api({
    url: `/healthTracking/syncUserInfo/${user.id}/${lastSyncTime ?? null}/fa`,
    // dev: true,
  });
  if (
    userInfo &&
    userInfo.data &&
    userInfo.data.data &&
    userInfo.data.data.length !== 0
  ) {
    userInfo.data.data.forEach((i) => {
      addTrackingOption(i.tracking_option_id, i.date);
    });
  }

  let sentProfileData = [];
  if (profile.length !== 0) {
    sentProfileData = await api({
      method: 'POST',
      url: `/profile/syncProfile/${user.id}/fa`,
      // dev: true,
      data: { data: profile },
    });
  }

  let sentPregnancyInfo = [];
  if (pregnancy.length !== 0) {
    sentPregnancyInfo = await api({
      method: 'POST',
      url: `/pregnancy/syncPregnancyInfo/${user.id}/fa`,
      // dev: true,
      data: { data: pregnancy },
    });
  }

  let sentUserInfo = [];
  if (trackingOptions.length !== 0) {
    sentUserInfo = await api({
      method: 'POST',
      url: `/healthTracking/syncUserInfo/${user.id}/fa`,
      // dev: true,
      data: { data: trackingOptions },
    });
  }
  if (
    sentProfileData &&
    profileData &&
    sentPregnancyInfo &&
    pregnancyInfo &&
    sentUserInfo &&
    userInfo
  ) {
    await updateLastSyncTime(moment().format(DATETIME_FORMAT));
  }
  // }
};
