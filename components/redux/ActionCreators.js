import * as ActionTypes from './ActionTypes';
import {baseUrl, GET_METHOD} from '../../shared/baseUrl';
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText,
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      },
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => {
  return {
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess,
  };
};

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, author, comments) => (dispatch) => {
  const date = new Date().toISOString();
  let nextCommentId = '_' + Math.random().toString(36).substr(2, 9);
  const comment = [
    {
      id: nextCommentId,
      dishId: dishId,
      rating: rating,
      comment: comments,
      author: author,
      date: date,
    },
  ];
  console.log('commentAction', comment);
  setTimeout(() => {
    dispatch(addComment(comment));
  }, 2000);
};

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading());

  return fetch('https://dientoandm.herokuapp.com/api/Dish/getAllDish', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik5ndXnDqm4gxJHDtMyJIGJvzIFuZyIsInR5cGUiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2MDI1Nzc4NjUsImV4cCI6MTYwMjYxMzg2NX0.YXhfYlcJmbyBhVaxj6ZvG2TV_GDG3qyeWCDspOa2a94',
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText,
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      },
    )
    .then((response) => response.json())
    .then((json) => dispatch(addDishes(json.dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());

  return fetch(baseUrl + 'promotions')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText,
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      },
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());

  return fetch(baseUrl + 'leaders')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            'Error ' + response.status + ': ' + response.statusText,
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      },
    )
    .then((response) => response.json())
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

export const postFavorite = (dishId) => (dispatch) => {
  setTimeout(() => {
    dispatch(addFavorite(dishId));
  }, 2000);
};

export const addFavorite = (dishId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: dishId,
});

export const postNewFavorite = (dishId) => (dispatch) => {
  dispatch(addNewFavorite(dishId));
};

export const addNewFavorite = (dishId) => ({
  type: ActionTypes.ADD_NEWFAVORITE,
  payload: dishId,
});
export const removeFavorite = (dishId) => (dispatch) => {
  //setTimeout(() => dispatch(remove(dishId)), 2000);
  dispatch(remove(dishId));
};
export const remove = (dishId) => ({
  type: ActionTypes.REMOVE_FAVORITE,
  payload: dishId,
});
