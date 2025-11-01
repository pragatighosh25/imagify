import React, { useEffect } from 'react'
import { createContext } from 'react'
import { toast } from 'react-toastify';
import { useState } from 'react'
import axios from 'axios';


export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [credits, setCredits] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loadCreditData = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: {token}
      })
      if(data.success){
        setCredits(data.credits);
        setUser(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  }

  useEffect(() => {
    if(token){
      loadCreditData();
    }else{
      logout();
    }
  }, [token]);

  const value = { user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credits, setCredits, loadCreditData, logout };
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )

}

export default AppContextProvider;