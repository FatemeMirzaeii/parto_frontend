import * as actions from './types';

export const fetchInitialCycleData = (data) => {
  console.log('asdfgg', data);
  return {
    type: actions.INITIAL_CYCLE_DATA,
    payload: data,
  };
};
export const updatePeriodDays = (days) => {
  return {
    type: actions.UPDATE_PERIOD_DAYS,
    payload: days,
  };
};
export const setLastPeriodDate = (lpd) => {
  return {
    type: actions.SET_LAST_PERIOD_DATE,
    payload: lpd,
  };
};

export const setPregnancyMode = (p) => {
  return { type: actions.SET_PREGNANT_MODE, payload: p };
};

export const setMainSentence = (sentence) => {
  return {
    type: actions.SET_MAIN_SENTENCE,
    payload: { mainSentence: sentence },
  };
};
