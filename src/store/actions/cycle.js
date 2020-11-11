import * as actions from './types';

export const setLastPeriodDate = (lpd) => {
  return {
    type: actions.SET_LAST_PERIOD_DATE,
    payload: lpd,
  };
};

export const setMainSentence = (sentence) => {
  return {
    type: actions.SET_MAIN_SENTENCE,
    payload: { mainSentence: sentence },
  };
};
