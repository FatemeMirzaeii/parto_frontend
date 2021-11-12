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

export default async (isSigningout, userId, noteCallback) => {
  const { store, persistor } = configureStore();
  const lastSyncTime = await getLastSyncTime();
  const profile = await findUnsyncedProfileData(lastSyncTime);
  const pregnancy = await findUnsyncedPregnancyInfo(lastSyncTime);
  const trackingOptions = await findUnsyncedTrackingOptions(lastSyncTime);
  console.log('datas to send for server', profile, pregnancy, trackingOptions);
  const user = store.getState().user;
  const _userId = userId ?? user.id;
  const userNotes = Object.values(user.note).filter(
    (i) => moment(i.lastUpdateTime) > moment(lastSyncTime),
  );
  console.log('last sync time', lastSyncTime);
  console.log('notes to send for server', userNotes);
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
      console.log('notes received from server', notes.data.data);
      let n = {};
      notes.data.data.forEach((i) => {
        n = {
          ...user.note,
          ...n,
          [i.id]: {
            id: i.id,
            key: i.id,
            date: i.date,
            title: i.title,
            content: i.content,
            lastUpdateTime: i.updatedAt,
            state: 1,
          },
        };
      });
      noteCallback(n);
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

  let sentNotes = [];
  if (userNotes.length > 0) {
    sentNotes = await api({
      method: 'POST',
      url: `/notes/syncNote/${_userId}/fa`,
      // dev: true,`
      data: { data: userNotes },
    });
    if (sentNotes.status === 200) {
      console.log('user.note', user.note);
      console.log('sentNotes.data.data', sentNotes.data[1].data);
      userNotes.forEach((n) => {
        // deleting everything sent to server
        delete user.note[n.key];
        console.log('delete', user.note);
      });
      let n = {};
      sentNotes.data[1].data.forEach((i) => {
        // adding every thing came back from server
        n = {
          ...user.note,
          ...n,
          [i.id]: {
            id: i.id,
            key: i.id,
            date: i.date,
            title: i.title,
            content: i.content,
            lastUpdateTime: i.updatedAt,
            state: 1,
          },
        };
      });
      // console.log('hereeeeeeee ', n);
      store.dispatch(setNote(n));
      persistor.flush();
    }
  }
  if (
    sentProfileData &&
    sentPregnancyInfo &&
    sentUserInfo &&
    setVersionType &&
    sentNotes
  ) {
    // console.log('sentNotes', sentNotes);
    await updateLastSyncTime(moment().format(DATETIME_FORMAT));
    return true;
  } else return false;
};
