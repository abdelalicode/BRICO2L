import React, { createContext, useContext } from 'react'
import { useState } from 'react';
import Api from './../services/Api';
import { useNavigate } from 'react-router';
import { HOME } from './../router/index';



export const  UserStateContext = createContext({
    user: {},
    setUser: () => {},
    allUsers: {},
    setAllUsers: () => {},
    authenticated : false, 
    logout: ()=>{},
    login: (email, password) => {},
    signup: (firstname, lastname, email, password , c_password) => {},
    setAuthenticated: () => {},
    loading : true,
    setLoading : () => {}
})

export default function UserContext({children}) {
    const [user, setUser]= useState({})
    const [allUsers, setAllUsers]= useState({})
    const [loading, setLoading] = useState(true);


    const [authenticated, _setAuthenticated ] =useState('true' === window.localStorage.getItem('AUTHENTICATED'))

    const login = async (email, password) => {
       return  Api.login(email, password)
    }
    const signup = async (firstname, lastname, email, password , c_password) => {
      return  Api.signup(firstname, lastname, email, password , c_password)
    }


    const logout =  () => {
      setUser({});
      setAuthenticated(false);
      window.localStorage.removeItem("user");
    }

    const setAuthenticated = (isAuthenticated) =>
    {
      _setAuthenticated(isAuthenticated)
      window.localStorage.setItem('AUTHENTICATED', isAuthenticated)
    }

  return (
        
    <UserStateContext.Provider value={{
        user,
        setUser,
        allUsers,
        setAllUsers,
        login,
        signup,
        logout,
        authenticated,
        setAuthenticated,
        loading,
        setLoading
    }}>
      {children}
    </UserStateContext.Provider>


)
  
}

export const useUserContext = () => useContext(UserStateContext)



