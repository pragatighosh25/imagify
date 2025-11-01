import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [credits, setCredits] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = { user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credits, setCredits };
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )

}

export default AppContextProvider;