import * as actions from './types';
import { getData, removeData } from '../../util/func';

export const signIn = (dummyToken) => async (dispatch, getState) => {
  dispatch({
    type: actions.SIGN_IN,
    token: dummyToken ? dummyToken : await getData('@token'),
  });
};
export const signOut = () => async (dispatch, getState) => {
  dispatch({ type: actions.SIGN_OUT, token: await removeData('@token') });
};
export const signUp = () => async (dispatch, getState) => {
  dispatch({ type: actions.SIGN_IN, token: await getData('@token') });
};
export const interview = () => async (dispatch, getState) => {
  dispatch({ type: actions.INTERVIEW, iToken: await getData('@startPages') });
};
export const restoreToken = () => async (dispatch, getState) => {
  try {
    const userToken = await getData('@token');
    const interviewToken = await getData('@startPages');
    dispatch({
      type: actions.RESTORE_TOKEN,
      token: userToken,
      iToken: interviewToken,
    });
  } catch (e) {}
};
