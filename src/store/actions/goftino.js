import {
  NUTRITION_ASSISTANT_ID,
  MIDWIFERY_ASSISTANT_ID,
  TREATISE_ASSISTANT_ID,
} from './types';

export const nutritionAssistantId = (id) => {
  return { type: NUTRITION_ASSISTANT_ID, id };
};

export const midwiferyAssistantId = (id) => {
  return { type: MIDWIFERY_ASSISTANT_ID, id };
};

export const treatiseAssistantId = (id) => {
  return { type: TREATISE_ASSISTANT_ID, id };
};
//todo: need a reset action?
