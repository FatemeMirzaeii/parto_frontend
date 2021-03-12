import * as actions from '../actions/types';

const initialStates = {
  isPregnant: false,
  goal: null,
  lastPeriodDate: '',
  cycleLength: 29,
  periodLength: 7,
  pmsLength: 3,
  periodDays: [],
  periodPerdictions: [],
  ovulationPerdictions: [],
};

const cycleReducer = (state = initialStates, action) => {
  switch (action.type) {
    case actions.INITIAL_CYCLE_DATA:
      return {
        ...state,
        periodDays: action.payload.periodDays,
        ovulationPerdictions: action.payload.ovulationPerdictions,
        periodPerdictions: action.payload.periodPerdictions,
        goal: action.payload.goal,
      };
    case actions.UPDATE_PERIOD_DAYS:
      return {
        ...state,
        periodDays: action.payload,
      };
    case actions.UPDATE_PERDICTIONS:
      return {
        ...state,
        ovulationPerdictions: action.payload.ovulationPerdictions,
        periodPerdictions: action.payload.periodPerdictions,
      };
    case actions.SET_LAST_PERIOD_DATE:
      return { ...state, lastPeriodDate: action.payload };
    case actions.SET_PREGNANT_MODE:
      return { ...state, isPregnant: action.payload };
    case actions.SET_GOAL:
      return { ...state, goal: action.payload };
    default:
      return state;
  }
};

export default cycleReducer;
