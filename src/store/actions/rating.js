import { POSITIVE_OFFER, NEGATIVE_OFFER } from './types';

export const getPosData = () => {
  return { type: POSITIVE_OFFER };
};

export const getNegData = () => {
  return { type: NEGATIVE_OFFER };
};
