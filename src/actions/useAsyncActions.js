import { useCallback, useReducer } from 'react';

const initialState = {
  loading: false,
  success: false,
};

const LoadingStateActionType = {
  Loading: 'LOADING',
  Error: 'ERROR',
  Success: 'SUCCESS',
};

function buildReducer() {
  return (state, action) => {
    switch (action.type) {
      case LoadingStateActionType.Loading:
        return {
          loading: true,
          success: false,
        };
      case LoadingStateActionType.Success:
        return {
          loading: false,
          success: true,
          data: action.data,
        };
      case LoadingStateActionType.Error:
        return {
          loading: false,
          success: false,
          error: action.error,
        };
      default:
        throw new Error('Un-Implemented action type');
    }
  };
}

export default function useAsyncAction(func, onSuccess, onError) {

  const [state, dispatch] = useReducer(buildReducer(), initialState);

  const action = useCallback(
    async (...args) => {
      dispatch({ type: LoadingStateActionType.Loading });

      try {
        const data = await func(...args);
        dispatch({ type: LoadingStateActionType.Success, data });

        if (onSuccess) {
          onSuccess(data, args);
        }

        return data;
      } catch (err) {
        dispatch({ type: LoadingStateActionType.Error, error: err });

        if (onError) {
          onError(err);
        }
      }
    },
    [func, onError, onSuccess]
  );

  return [
    action,
    state.loading,
    {
      data: state.data,
      error: state.error,
      success: state.success,
    },
  ];
}