import * as ActionTypes from './ActionTypes';
const initState = {errMess: null, comments: []};
export const comments = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};
    case ActionTypes.ADD_COMMENT:
      return {
        ...state,
        errMess: null,
        comments: state.comments.concat(action.payload),
      };
    default:
      return state;
  }
};
