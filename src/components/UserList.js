import React, { useCallback, useEffect, useState, useContext } from 'react';
import UserCard from './UserCard';
import { useUsercontext } from '../providers/UserProvider';

import { Button, Row, Col, Input, Collapse } from 'antd';

function UserList() {
  //const { users, fetchMoreUser, nextUser, prevUser, filterUser } = useUsercontext();
  const { users, loadMore, filterUsers, resetUsers } = useUsercontext();
  const [searchName, setSearchName] = useState('');

  const handleScroll = useCallback(() => {  
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight == scrollHeight ) {
      //fetchMoreUser(searchName);
      loadMore(searchName);
    }
  }, [loadMore]);

  useEffect(() => {
    loadMore(searchName);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const onChange = (e) => {
    setSearchName(e.target.value);
  };

  const onPressEnter = (e) => {
    filterUsers(e.target.value);
  };

  return (
    <div>
      <Row style={{marginTop : '4%'}}>
        <Col span={2} offset={11}>
          <Button onClick={()=>{ setSearchName(""); resetUsers(); }} style={{width : '100%'}}>Reset Users</Button>
        </Col>
        <Col span={2} offset={7}>
          <Input placeholder="Search User!" value={searchName} allowClear onChange={onChange} onPressEnter={onPressEnter} />
        </Col>
      </Row>
      <Row>
        {users.map((user) => (
            <UserCard user={user} />
        ))}
      </Row>
      {/* <InfiniteScroll onScrollToEnd={()=>dispatch(fetchMoreUsers())} /> */}
    </div>
  );
}

export default UserList;