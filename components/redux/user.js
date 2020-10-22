import * as ActionTypes from './ActionTypes';
const initState = {isLoading: true, user: {}};
export const user = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return {...state, isLoading: false, user: action.payload};
    case ActionTypes.USER_LOADING:
      return {...state, isLoading: true, user: {}};

    default:
      return state;
  }
};
