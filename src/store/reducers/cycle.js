import * as actions from '../actions/types';

const initialStates = {
  lastPeriodDate: '',
  cycleLength: 29,
  periodLength: 7,
  pmsLength: 3,
  periodDays: [],
  periodPerdictions: [],
  ovulationPerdiction: [],
};

const cycleReducer = (state = initialStates, action) => {
  switch (action.type) {
    case actions.SET_LAST_PERIOD_DATE:
      return { ...state, lastPeriodDate: action.payload };
    default:
      return [];
  }
};

export default cycleReducer;
