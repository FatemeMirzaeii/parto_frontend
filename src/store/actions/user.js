import {
  SET_TEMPLATE,
  SET_LOCK_TYPE,
  SET_PASSSCODE,
  SET_USER,
  SET_NOTE,
  RESET,
} from './types';

export const handleTemplate = (template) => {
  return { type: SET_TEMPLATE, template };
};

export const handleLockType = (lockType) => {
  return { type: SET_LOCK_TYPE, lockType };
};

export const handlePasscode = (passcode) => {
  return { type: SET_PASSSCODE, passcode };
};

export const setUser = (id, phone) => {
  return { type: SET_USER, id, phone };
};

export const setNote = (note) => {
  return {
    type: SET_NOTE,
    payload: note,
  };
};

export const reset = () => {
  return { type: RESET };
};
