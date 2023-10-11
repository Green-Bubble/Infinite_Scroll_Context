import { Collapse } from "antd";
import useAsyncAction from "./useAsyncActions";
import React, {useState, useEffect, useCallback} from 'react';

export default function useMoreUsers() {
    
    const [users,setUsers] = useState([]);
    const [offset, setOffset] = useState(0);
    
    const [
        fetchUsers,
        isLoading,
        {
            data:newusers = [],
            error,
            success
        }
    ] = useAsyncAction(
        useCallback(async (search) => {
            const response = await fetch(`https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=10&search=${search}`);
            const data = await response.json();
            return data.users;
        }, [offset])
    );

    useEffect(() => {
        if(newusers.length > 0)
            setUsers([...users, ...newusers]);
    }, [newusers])

    useEffect(() => {
        fetchUsers("");
    }, [offset])

    const fetchMoreUser = useCallback(() =>{ //Fetch users when scroll down.
        setOffset(offset + 10);
    }, [offset]);

    const nextUser = useCallback((search) =>{ //Fetch users when next button click.
        setOffset(offset + 10);
    }, [offset])

    const prevUser = useCallback((search) =>{ //Fetch users when prev button click
        setOffset(offset - 10);
        if(offset < 0) setOffset(0); 
    }, [offset])

    const filterUser = useCallback((search) => { //Fetch search users.
        fetchUsers(search);
    })
    
    return [users, fetchMoreUser, nextUser, prevUser, filterUser];

}
