import * as actions from './types';
import CycleModule from '../../util/cycle';
import { FORMAT } from '../../constants/cycle';
import { COLOR } from '../../styles/static';
import { calendarMarkedDatesObject } from '../../util/func';
import { getUserStatus } from '../../util/database/query';

export const fetchInitialCycleData = () => async (dispatch, getState) => {
  const stateBefore = getState();
  // console.log('stateBefore', stateBefore);
  const c = await CycleModule();
  const past = await c.pastBleedingDays();
  const goal = await getUserStatus();
  const ovulationPerdictions =
    stateBefore.user.template === 'Teenager'
      ? []
      : c.perdictedOvulationDaysInCurrentYear();
  const periodPerdictions = c.perdictedPeriodDaysInCurrentYear();
  let periodDays = [];
  if (past) {
    periodDays = past.map((day) => day.date.format(FORMAT));
  }
  dispatch({
    type: actions.INITIAL_CYCLE_DATA,
    payload: {
      periodDays: makeMarkedDateObj(periodDays, COLOR.bleeding, false),
      periodPerdictions: makeMarkedDateObj(
        periodPerdictions,
        COLOR.periodPerdiction,
        true,
      ),
      ovulationPerdictions: makeMarkedDateObj(
        ovulationPerdictions,
        COLOR.ovulationPerdictions,
        true,
      ),
      goal: goal.pregnant ? 2 : goal.pregnancy_try ? 1 : 0,
    },
  });
};

export const updatePeriodDays = (days) => {
  return {
    type: actions.UPDATE_PERIOD_DAYS,
    payload: days,
  };
};

export const updatePerdictions = (setToNull) => async (dispatch, getState) => {
  const stateBefore = getState();
  const c = await CycleModule();
  const ovulationPerdictions =
    stateBefore.user.template === 'Teenager'
      ? []
      : c.perdictedOvulationDaysInCurrentYear();
  const periodPerdictions = c.perdictedPeriodDaysInCurrentYear();
  dispatch({
    type: actions.UPDATE_PERDICTIONS,
    payload: {
      periodPerdictions: setToNull
        ? {}
        : makeMarkedDateObj(periodPerdictions, COLOR.periodPerdiction, true),
      ovulationPerdictions: setToNull
        ? {}
        : makeMarkedDateObj(
            ovulationPerdictions,
            COLOR.ovulationPerdictions,
            true,
          ),
    },
  });
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

export const setGoal = (g) => {
  return { type: actions.SET_GOAL, payload: g };
};
export const setMainSentence = (sentence) => {
  return {
    type: actions.SET_MAIN_SENTENCE,
    payload: { mainSentence: sentence },
  };
};

const makeMarkedDateObj = (dates, color, dashed) => {
  let marked = {};
  dates.forEach((date) => {
    marked[date] = calendarMarkedDatesObject(color, dashed);
  });
  return marked;
};
