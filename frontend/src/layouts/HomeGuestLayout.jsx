import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { HOME, WORKERHOME } from "./../router/index";
import { useHomeContext } from "../context/HomeContext";
import { useUserContext } from "../context/UserContext";
import NavBottom from "../components/Home/NavBottom";
import NavTup from "../components/Home/NavTup";
import Api from "../services/Api";

export default function HomeGuestLayout() {
  {
    const navigate = useNavigate();
    const location = useLocation();
    const {
      user,
      setUser,
      authenticated,
      setAuthenticated,
      logout: contextLogout,
    } = useUserContext();
    
    const [loading, setLoading] = useState(true);
    

   
  
    const logout = async () => {
      Api.logout().then(() => {
        contextLogout();
        navigate(HOME);
      });
    };



    return (
      <>
      <div className={location.pathname === HOME ? "background" : ""}>
        <header>
          <NavTup />
          <NavBottom logout={logout} />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      <footer>
    </footer>
    </>
    );
  }
  
}
