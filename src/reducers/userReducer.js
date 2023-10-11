import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    CHANGE_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    FETCH_MORE_USERS,
  } from '../actions/userActions';
  
  const initialState = {
    users: [],
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: [...state.users, ...action.payload],
          error: null,
        };        
      case CHANGE_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload,
          error: null,
        };
      case FETCH_USERS_FAILURE:
        return {
          ...state,
          loading: false,
          users: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;