import * as actions from './types';
import { getData, removeData, storeData } from '../../util/func';
import { cleanDatabase } from '../../util/database/query';

export const signIn = (dummyToken) => async (dispatch, getState) => {
  dispatch({
    type: actions.SIGN_IN,
    token: dummyToken ? dummyToken : await getData('@token'),
  });
};
export const signOut = () => async (dispatch, getState) => {
  await cleanDatabase();
  dispatch({
    type: actions.SIGN_OUT,
    token: await removeData('@token'),
    interviewToken: await removeData('@startPages'),
  });
};
export const signUp = () => async (dispatch, getState) => {
  dispatch({ type: actions.SIGN_IN, token: await getData('@token') });
};
export const interview = () => async (dispatch, getState) => {
  await storeData('@startPages', 'true');
  dispatch({
    type: actions.INTERVIEW,
    interviewToken: await getData('@startPages'),
  });
};
export const restoreToken = () => async (dispatch, getState) => {
  try {
    const userToken = await getData('@token');
    const interviewToken = await getData('@startPages');
    dispatch({
      type: actions.RESTORE_TOKEN,
      token: userToken,
      interviewToken: interviewToken,
    });
  } catch (e) {}
};
