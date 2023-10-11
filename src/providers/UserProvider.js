import React, { createContext, useContext, useEffect ,useCallback} from 'react';
import useMoreUsers from '../actions/useMoreUsers';
import useFetchUsers from '../actions/useFetchUsers';

const UserContext=createContext();

export const UserProvider = ({children}) => {
    
    const [users, loadMore, filterUsers, resetUsers] = useFetchUsers();
    //const [users, fetchMoreUser, nextUser, prevUser, filterUser]=useMoreUsers();
            
    //const value = { users, fetchMoreUser, nextUser, prevUser, filterUser };
    const value = { users, loadMore, filterUsers, resetUsers };
    return (
        <UserContext.Provider
            value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsercontext = () => {
    return useContext(UserContext);
};