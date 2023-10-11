import React from 'react';

function Contact() {
  return (
    <div>
      <h1>Problem: Infinite Scrolling</h1>
      <p>1. Show each user's basic info in a card.</p>
      <p>2. When a card is hovered upon, the card flips to show more information about the user.</p>
      <p>3. There should also be a button that when clicked, will fetch another set of 10 random users, which updates the cards.</p>
      <p>You should use redux and redux-saga as for state management tool.</p>
      <p>Fetch from this API endpoint: https://random-data-api.com/api/users/random_user?size=10</p>
      <p>Fetch from this API endpoint: https://api.slingacademy.com/v1/sample-data/users?offset=10&limit=20</p>
    </div>
  );
}

export default Contact;