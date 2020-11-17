import * as actions from './types';
import CycleModule from '../../util/cycle';
import { FORMAT } from '../../constants/cycle';
import { COLOR } from '../../styles/static';

export const fetchInitialCycleData = () => async (dispatch, getState) => {
  const c = await CycleModule();
  const past = await c.pastBleedingDays();
  const ovulationPerdictions = c.perdictedOvulationDaysInCurrentYear();
  const periodPerdictions = c.perdictedPeriodDaysInCurrentYear();
  let periodDays;
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
        COLOR.tiffany,
        true,
      ),
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
  const c = await CycleModule();
  const ovulationPerdictions = c.perdictedOvulationDaysInCurrentYear();
  const periodPerdictions = c.perdictedPeriodDaysInCurrentYear();
  dispatch({
    type: actions.UPDATE_PERDICTIONS,
    payload: {
      periodPerdictions: setToNull
        ? {}
        : makeMarkedDateObj(periodPerdictions, COLOR.periodPerdiction, true),
      ovulationPerdictions: setToNull
        ? {}
        : makeMarkedDateObj(ovulationPerdictions, COLOR.tiffany, true),
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

export const setMainSentence = (sentence) => {
  return {
    type: actions.SET_MAIN_SENTENCE,
    payload: { mainSentence: sentence },
  };
};

const makeMarkedDateObj = (dates, color, dashed) => {
  let marked = {};
  dates.forEach((date) => {
    marked[date] = {
      periods: [
        {
          startingDay: dashed,
          color: color,
          endingDay: dashed,
        },
      ],
    };
  });
  return marked;
};
