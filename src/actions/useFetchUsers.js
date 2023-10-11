import { useCallback, useEffect, useState, useReducer } from "react";
import useAsyncAction from "./useAsyncActions";
import { act } from "react-dom/test-utils";

const initialState = {
    users: [],
    pageNo: 0,
    pageSize : 10,
};

const FetchUserActionType = {
  MORE_USERS: 'MORE_USERS',
  Reset: 'RESET',
};

function reducer(state, action) {
    switch (action.type) {
      case FetchUserActionType.MORE_USERS:
        return {
          users: [...state.users, ...action.data],
          pageNo: state.pageNo + 1,
          pageSize: state.pageSize,
        };
      case FetchUserActionType.Reset:
        return {
          ...initialState
        };
      default:
        throw new Error('Un-Implemented action type');
    }
  }
  

export default function useFetchUsers() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [fetchUsers, loading, { error }] = useAsyncAction(
      useCallback(async (pageNo, pageSize, search) => {
          const response = await fetch(
              `https://api.slingacademy.com/v1/sample-data/users?offset=${pageNo*pageSize}&limit=${pageSize}&search=${search}`
          );
          const data = await response.json();
          return data.users;
      }, [state.pageNo]),
      useCallback(
          (data) => {
            dispatch({
              type: FetchUserActionType.MORE_USERS,
              data,
            });
          }, [])
        );

  const loadMore = useCallback((search) => {
    fetchUsers(state.pageNo, state.pageSize , search);
  }, [state.pageNo]);
  
  const filterUsers = useCallback((search) => {
    dispatch({
      type: FetchUserActionType.Reset,
    })
    fetchUsers(0, state.pageSize, search);
  }, [state.pageNo]);

  const resetUsers = useCallback(() => {
    dispatch({
      type: FetchUserActionType.Reset,
    })
    fetchUsers(0, state.pageSize, "");
  })
        
  return [
    state.users,
    loadMore,
    filterUsers,
    resetUsers
  ];
}