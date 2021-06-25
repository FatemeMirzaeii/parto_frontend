import {
  MIDWIFERY_ASSISTANT_ID,
  NUTRITION_ASSISTANT_ID,
  TREATISE_ASSISTANT_ID,
} from '../actions/types';

const initialState = {
  nutritionAssistantId: null,
  midwiferyAssistantId: null,
  treatiseAssistantId: null,
};

const goftinoReducer = (state = initialState, action) => {
  switch (action.type) {
    case NUTRITION_ASSISTANT_ID:
      return { ...state, nutritionAssistantId: action.id };

    case MIDWIFERY_ASSISTANT_ID: {
      return { ...state, midwiferyAssistantId: action.id };
    }

    case TREATISE_ASSISTANT_ID: {
      return { ...state, treatiseAssistantId: action.id };
    }

    default:
      return state;
  }
};

export default goftinoReducer;
