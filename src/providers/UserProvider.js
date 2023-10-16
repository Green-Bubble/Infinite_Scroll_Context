import React, { createContext, useContext, useEffect ,useDeferredValue, useCallback, useState, useRef} from 'react';
import useMoreUsers from '../actions/useMoreUsers';
import useFetchUsers from '../actions/useFetchUsers';

const UserContext=createContext();

export const useDebounce = (filters) => {
    const [deboundedFilters, setDebouncedFilters] = useState('');
    const debounceTimer = useRef();

    const debouncedSearch = useCallback((param) => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(() => setDebouncedFilters(param) , 200);
    }, [debounceTimer]);

    useEffect(() => {
        debouncedSearch(filters);
    }, [filters, debouncedSearch]);
    
    return deboundedFilters;
}

export const UserProvider = ({children}) => {
    const [filters, setFilter] = useState('');
    console.log(filters);
    const deferredValue = useDebounce(filters);
         
    const [users, loadMore, resetUsers] = useFetchUsers(deferredValue, 10);
            
    const value = { users, loadMore, filters, setFilter };
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