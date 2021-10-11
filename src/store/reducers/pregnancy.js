import * as actions from '../actions/types';

const initialStates = {
  isPregnant: null,
  pregnancyAge: null,
  dueDate: '',
};

const pregnancyReducer = (state = initialStates, action) => {
  switch (action.type) {
    case actions.SET_PREGNANCY_MODE:
      return { ...state, isPregnant: action.payload };
    case actions.SET_PREGNANCY_AGE:
      return { ...state, pregnancyAge: action.payload };
    case actions.SET_DUE_DATE:
      return { ...state, dueDate: action.payload };
    default:
      return state;
  }
};

export default pregnancyReducer;
