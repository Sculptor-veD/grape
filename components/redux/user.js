import * as ActionTypes from './ActionTypes';
const initState = {isSignIn: false, isLoading: false, errMess: null, user: {}};
export const user = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      return {
        ...state,
        isSignIn: true,
        errMess: null,
        isLoading: false,
        user: action.payload,
      };
    case ActionTypes.USER_FAILD:
      return {
        ...state,
        isSignIn: false,
        isLoading: false,
        errMess: action.payload,
      };
    case ActionTypes.USER_LOADING:
      return {
        ...state,
        isSignIn: false,
        isLoading: true,
        errMess: null,
        user: {},
      };
    case ActionTypes.USER_LOGOUT:
      return {
        ...state,
        isSignIn: false,
        isLoading: false,
        errMess: null,
        user: {},
      };
    default:
      return state;
  }
};
