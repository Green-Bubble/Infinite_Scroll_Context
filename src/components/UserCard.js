import React, { useState } from 'react';
import { Card } from 'antd';

const UserCard = ({ user }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      hoverable
      style={{ width: 300, margin: 16, marginLeft: '3%'}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
            {!isHovered ? (
                <div>
                    <img src={user.profile_picture} width={200} height={200}></img>
                    <p style={{font : '22px bold'}}>{user.first_name + ' ' +user.last_name}</p>
                    <p>email : {user.email}</p>
                    <p>date_of_birth : {user.date_of_birth}</p>
                    <p>Job: {user.job}</p>
                    <p>Phone : {user.phone}</p>
                </div>
            ) : (
                <div>
                    <p style={{font : '22px bold'}}>{user.first_name + ' ' +user.last_name}</p>
                    <p>email : "{user.email}"</p>
                    <p>date_of_birth : {user.date_of_birth}</p>
                    <p>Job: {user.job}</p>
                    <p>Phone : {user.phone}</p>
                    <p>State : {user.state}</p>
                    <p>Country : {user.country}</p>
                    <p>City : {user.city}</p>
                    <p>Street : {user.street}</p>
                    <p>ZipCode : {user.zipcode}</p>
                </div>
            )}
    </Card>
  );
};

export default UserCard;