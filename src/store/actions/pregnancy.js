import * as actions from './types';

export const setPregnancyMode2 = (p) => {
  return { type: actions.SET_PREGNANCY_MODE, payload: p };
};
export const setPregnancyAge = (a) => {
  return { type: actions.SET_PREGNANCY_AGE, payload: a };
};
export const setDueDate = (duedate) => {
  return { type: actions.SET_DUE_DATE, payload: duedate };
};
