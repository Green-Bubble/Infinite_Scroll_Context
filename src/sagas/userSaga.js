import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_USERS_REQUEST,
  FETCH_MORE_USERS,
  CHANGE_USERS_REQUEST,
  fetchUsersSuccess,
  fetchUsersFailure,
  changeUsersSuccess,
} from '../actions/userActions';

function* fetchUsers() {
  try {
    const response = yield call(() =>
      axios.get('https://random-data-api.com/api/users/random_user?size=10')
    );
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

function* changeUsers(action) {
  let url = "https://random-data-api.com/api/users/random_user?size=" + action.payload;
  try {
    const response = yield call(() =>
      axios.get(url)
    );
    yield put(changeUsersSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

function* userSaga() {
    yield takeLatest(FETCH_USERS_REQUEST, fetchUsers);
    //yield takeEvery(FETCH_USERS, fetchUsersSaga);
    yield takeLatest(FETCH_MORE_USERS, fetchUsers);
    yield takeLatest(CHANGE_USERS_REQUEST, changeUsers);
}

export default userSaga;