import { POSITIVE_OFFER, NEGATIVE_OFFER } from '../actions/rating';

const initialState = {
  offeredItems: [],
  positiveItems: [],
  negativeItems: [],
};

const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
        case POSITIVE_OFFER:
          const existingIndex = state.favoriteMeals.findIndex(
            meal => meal.id === action.mealId
          );
          if (existingIndex >= 0) {
            const updatedFavMeals = [...state.favoriteMeals];
            updatedFavMeals.splice(existingIndex, 1);
            return { ...state, favoriteMeals: updatedFavMeals };
          } else {
            const meal = state.meals.find(meal => meal.id === action.mealId);
            return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
          }
        case NEGATIVE_OFFER:  
        default:
          return state;
      }

};

export default ratingReducer;
