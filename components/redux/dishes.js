import * as ActionTypes from './ActionTypes';

const initState = {isLoading: false, errMess: null, dishes: []};

export const dishes = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload,
      };
    case ActionTypes.DISHES_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        dishes: state.dishes,
      };

    case ActionTypes.DISHES_FAILED:
      return {...state, isLoading: false, errMess: action.payload, dishes: []};
    case ActionTypes.ADD_NEW_DISH:
      return {
        ...state,
        isLoading: false,
        erreMess: null,
        dishes: [...state.dishes, ...action.payload],
      };
    default:
      return state;
  }
};
