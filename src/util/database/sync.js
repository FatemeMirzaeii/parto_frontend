import moment from 'moment';
import { DATETIME_FORMAT } from '../../constants/cycle';
import {
  getLastSyncTime,
  findUnsyncedTrackingOptions,
  findUnsyncedProfileData,
  findUnsyncedPregnancyInfo,
  updateLastSyncTime,
  addProfileData,
  addSynedPregnancyData,
  addTrackingOption,
} from './query';
import configureStore from '../../store';
import { setNote } from '../../store/actions/user';
import api from '../../services/api';

export default async (isSigningout, userId) => {
  const { store } = configureStore();
  const user = store.getState().user;
  const lastSyncTime = await getLastSyncTime();
  const profile = await findUnsyncedProfileData(lastSyncTime);
  const pregnancy = await findUnsyncedPregnancyInfo(lastSyncTime);
  const trackingOptions = await findUnsyncedTrackingOptions(lastSyncTime);
  const userNotes = user.note.filter((i) => i.lastUpdateTime > lastSyncTime);

  console.log(
    'datas to send for server',
    profile,
    pregnancy,
    trackingOptions,
    userNotes,
  );

  const _userId = userId ?? user.id;
  let profileData;
  let pregnancyInfo;
  let userInfo;
  let notes;
  if (!isSigningout) {
    // first will get data from server, if exists!
    profileData = await api({
      url: `/profile/syncProfile/${_userId}/${lastSyncTime ?? null}/fa`,
      // dev: true,
    });
    if (
      profileData &&
      profileData.data &&
      profileData.data.data &&
      profileData.data.data.length !== 0
    ) {
      console.log('Profile data received from server', profileData.data.data);
      addProfileData(profileData.data.data[0]);
    }
    pregnancyInfo = await api({
      url: `/pregnancy/syncPregnancyInfo/${_userId}/${lastSyncTime ?? null}/fa`,
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
    userInfo = await api({
      url: `/healthTracking/syncUserInfo/${_userId}/${lastSyncTime ?? null}/fa`,
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
    notes = await api({
      url: `/notes/syncNote/${_userId}/${lastSyncTime ?? null}/fa`,
      // dev: true,
    });
    if (
      notes &&
      notes.data &&
      notes.data.data &&
      notes.data.data.length !== 0
    ) {
      let n = {};
      notes.data.data.forEach((i) => {
        //todo: should test api
        n = {
          ...n,
          [moment(i.noteDate).format()]: {
            key: moment(i.noteDate).format(),
            date: i.noteDate,
            title: i.title,
            content: i.content,
            lastUpdateTime: i.updatedAt,
            state: 1,
          },
        };
      });
      console.log('nnnnn', n);
      store.dispatch(setNote(n));
    }
  }

  let sentProfileData = [];
  if (profile.length !== 0) {
    sentProfileData = await api({
      method: 'POST',
      url: `/profile/syncProfile/${_userId}/fa`,
      // dev: true,
      data: { data: profile },
    });
  }

  let sentPregnancyInfo = [];
  if (pregnancy.length !== 0) {
    sentPregnancyInfo = await api({
      method: 'POST',
      url: `/pregnancy/syncPregnancyInfo/${_userId}/fa`,
      // dev: true,
      data: { data: pregnancy },
    });
  }

  let sentUserInfo = [];
  if (trackingOptions.length !== 0) {
    sentUserInfo = await api({
      method: 'POST',
      url: `/healthTracking/syncUserInfo/${_userId}/fa`,
      // dev: true,
      data: { data: trackingOptions },
    });
  }
  let setVersionType = [];
  if (user.template) {
    setVersionType = await api({
      method: 'POST',
      url: `/user/versionType/${_userId}/fa`,
      // dev: true,
      data: { type: user.template },
    });
  }

  // let sentNotes = [];
  // if (user.note) {
  //   //todo: should test api
  //   sentNotes = await api({
  //     method: 'POST',
  //     url: `/notes/syncNote/${_userId}/fa`,
  //     // dev: true,`
  //     data: { data: userNotes },
  //   });
  //   // if(sentNotes) remove extras
  // }

  if (
    sentProfileData &&
    sentPregnancyInfo &&
    sentUserInfo &&
    setVersionType
    // sentNotes
  ) {
    // await updateLastSyncTime(moment().format(DATETIME_FORMAT));
    return true;
  } else return false;
};
