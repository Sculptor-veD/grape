import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../../shared/baseUrl';
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

  return fetch('https://dientoandm.herokuapp.com/api/Dish/getAllDish')
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
export const addNewuser = (user) => ({
  type: ActionTypes.ADD_USER,
  payload: user,
});

export const postUser = (userName, password, email, callback) => (dispatch) => {
  dispatch(userLoading());
  fetch(baseUrl + 'Account/createAccount', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      username: userName,
      pwd: password,
      name: email,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      dispatch(userFailed('error'));
      callback(json);
    })

    .catch((error) => dispatch(userFailed(error)));
};
export const postLoginUser = (userName, password, callback) => (dispatch) => {
  dispatch(userLoading());
  fetch(baseUrl + 'auth/Login', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      username: userName,
      pwd: password,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      dispatch(userFailed('error'));
      callback(json);
    })
    .catch((error) => dispatch(userFailed(error)));
};
export const postLogout = (token) => (dispatch) => {
  fetch(baseUrl + 'auth/Logout', {
    header: {
      token: token,
    },
  })
    .then((res) => res.json())
    .then(() => dispatch(userLogout()));
};
export const userFailed = (error) => ({
  type: ActionTypes.USER_FAILD,
  payload: error,
});
export const userLogout = () => ({
  type: ActionTypes.USER_LOGOUT,
});
export const userLoading = () => ({
  type: ActionTypes.USER_LOADING,
});
