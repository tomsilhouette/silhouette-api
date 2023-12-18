import React from 'react';
import { useEffect, useState } from 'react';
// Fetch
import client from '../api/client';
import LoggedInUser from '../utils/LoggedInUser';
// Context
export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [token, setToken] = useState(
    localStorage.getItem(process.env.REACT_APP_USER_TOKEN) || ''
  );

  const [toggleCookiePolicy, setToggleCookiePolicy] = useState(false);

  console.log('usercontext', user);


  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        toggleCookiePolicy,
        setToggleCookiePolicy,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
