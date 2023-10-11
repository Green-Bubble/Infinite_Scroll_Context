import React, { useEffect } from 'react';
import { fetchUsersRequest, fetchMoreUsers } from './actions/userActions';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './navbar/NavigationBar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import UserList from './components/UserList';
import { UserProvider } from './providers/UserProvider';

function App() {

  return (
    <UserProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/userlist" element={<UserList />} />
        </Routes>
        {/* <UserList /> */}
      </Router>
    </UserProvider>

  );
}

export default App;