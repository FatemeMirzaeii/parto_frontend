import * as actions from './types';
import { getData, removeData, storeData } from '../../util/func';
import { cleanDatabase } from '../../util/database/query';
import { handleTemplate, reset } from './user';

export const signIn = (dummyToken) => async (dispatch, getState) => {
  if (dummyToken) await storeData('@token', 'dummyToken');
  dispatch({
    type: actions.SIGN_IN,
    token: await getData('@token'),
  });
};
export const signOut = () => async (dispatch, getState) => {
  await cleanDatabase();
  await dispatch(reset());
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
