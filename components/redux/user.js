import * as ActionTypes from './ActionTypes';
const initState = {isLoading: false, user: {}};
export const user = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return {...state, isLoading: false, user: action.payload};
    case ActionTypes.USER_LOADING:
      return {...state, isLoading: true, user: {}};
    case ActionTypes.USER_LOGOUT:
      return {...state, isLoading: false, user: {}};
    default:
      return state;
  }
};
