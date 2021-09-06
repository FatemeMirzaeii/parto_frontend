import * as actions from './types';
import { getData, removeData } from '../../util/func';
import { cleanDatabase } from '../../util/database/query';
import { handleTemplate, reset } from './user';
import AsyncStorage from '@react-native-community/async-storage';

export const signIn = (dummyToken) => async (dispatch, getState) => {
  dispatch({
    type: actions.SIGN_IN,
    token: dummyToken ? 'dummyToken' : getState().auth.userToken,
  });
};
export const signOut = () => async (dispatch, getState) => {
  await cleanDatabase();
  await dispatch(reset());
  await dispatch(handleTemplate(''));
  await AsyncStorage.clear();
  dispatch({
    type: actions.SIGN_OUT,
    token: await removeData('@token'),
    interviewToken: null,
  });
};
export const signUp = () => async (dispatch, getState) => {
  dispatch({ type: actions.SIGN_IN, token: await getData('@token') });
};
export const interview = () => async (dispatch, getState) => {
  dispatch({
    type: actions.INTERVIEW,
    interviewToken: true,
  });
};
export const restoreToken = () => async (dispatch, getState) => {
  try {
    const tokens = await getState().auth;
    let userToken = tokens.userToken;
    let interviewToken = tokens.interviewToken;
    if (!userToken) {
      userToken = await getData('@token');
    }
    if (!interviewToken) {
      interviewToken = await getData('@startPages');
    }
    // in order to correct former users template, I have set default template to 'Main'.
    // but if the user is new (not having interview token means the user is new and not using the app in offline mode.),
    // we should remove template for her and let her to decide.
    if (!interviewToken) dispatch(handleTemplate(''));
    dispatch({
      type: actions.RESTORE_TOKEN,
      token: userToken,
      interviewToken: interviewToken,
    });
  } catch (e) {}
};
