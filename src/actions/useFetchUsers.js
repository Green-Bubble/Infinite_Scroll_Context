import { useCallback, useEffect, useState, useReducer, useRef } from "react";
import useAsyncAction from "./useAsyncActions";
import isEqual from 'lodash/isEqual';

const initialState = {
    users: [],
    pageNo: -1,
};

const FetchUserActionType = {
  MORE_USERS: 'MORE_USERS',
  RESET: 'RESET',
};

function reducer(state, action) {
    switch (action.type) {
      case FetchUserActionType.MORE_USERS:
        return {
          users: [...state.users, ...action.data],
          pageNo: action.pageNo,
        };
      case FetchUserActionType.RESET:
        return {
          ...initialState
        };
      default:
        throw new Error('Un-Implemented action type');
    }
  }
  

export default function useFetchUsers( filters, pageSize = 10 ) {
 
  const filterRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const [fetchUsers, loading, { error }] = useAsyncAction(
    useCallback(async (filters, pageNo) => {
      const response = await fetch(
          `https://api.slingacademy.com/v1/sample-data/users?offset=${pageNo*pageSize}&limit=${pageSize}&search=${filters}`
      );
      const data = await response.json();
      return data.users;
    }, [state.pageNo]),
    useCallback(
      (data, [,pageNo]) => {
        dispatch({
          type: FetchUserActionType.MORE_USERS,
          data,
          pageNo,
        });
      }, []
    )
  );

  useEffect(() => {
    if (!isEqual(filterRef.current, filters)) {
      if (!isEqual(state, initialState)) {
        dispatch({
          type: FetchUserActionType.RESET
        });
      }
      fetchUsers(filters, 0);
      filterRef.current = filters;
    }
  }, [fetchUsers, filters, state]);
  

  const loadMore = useCallback(() => {
    fetchUsers(filters, state.pageNo + 1);
  }, [state.pageNo]);

  return [
    state.users,
    loadMore,
  ];
}