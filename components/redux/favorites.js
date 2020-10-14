import * as ActionTypes from './ActionTypes';

export const favorites = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITE:
      if (state.some((el) => el === action.payload)) return state;
      else return state.concat(action.payload);
    case ActionTypes.ADD_NEWFAVORITE:
      return [...state, action.payload];
    case ActionTypes.REMOVE_FAVORITE:
      // state.splice(state.indexOf(action.payload), 1);
      // return state;
      return state.filter((favorite) => favorite !== action.payload);
    default:
      return state;
  }
};
