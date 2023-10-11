export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const FETCH_MORE_USERS = 'FETCH_MORE_USERS';
export const CHANGE_USERS_REQUEST = 'CHANGE_USERS_REQUEST';
export const CHANGE_USERS_SUCCESS = 'CHANGE_USERS_SUCCESS';


export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchMoreUsers = () => ({
  type: FETCH_MORE_USERS,
});

export const changeUsersRequest = (count) => ({
  type: CHANGE_USERS_REQUEST,
  payload: count
});

export const changeUsersSuccess = (users) => ({
  type: CHANGE_USERS_SUCCESS,
  payload: users,
});
