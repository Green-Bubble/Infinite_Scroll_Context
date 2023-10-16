import React, { useCallback, useEffect, useState, useDeferredValue, Suspense  } from 'react';
import UserCard from './UserCard';
import { useUsercontext } from '../providers/UserProvider';
import { Button, Row, Col, Input } from 'antd';

function UserList() {
  const { users, loadMore, filters, setFilter } = useUsercontext();

  const handleScroll = useCallback(() => {  
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight == scrollHeight ) {
      //fetchMoreUser(searchName);
      loadMore();
    }
  }, [loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const onInputChange = (e) => {
    setFilter(e.target.value);
  };
  
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <div>
        <Row style={{marginTop : '4%'}}>
          <Col span={2} offset={11}>
            <Button onClick={()=>{ setFilter(''); }} style={{width : '100%'}}>Reset Users</Button>
          </Col>
          <Col span={2} offset={7}>
            <Input placeholder="Search User!" value={filters} onChange={ onInputChange }/>
          </Col>
        </Row>
        <Row>
          {users.map((user) => (
              <UserCard user={user} />
          ))}
        </Row>
      </div>
    </Suspense>
  );
}

export default UserList;