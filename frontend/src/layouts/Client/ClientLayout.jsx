import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { axiosClient } from "../../api/axios";
import { useHomeContext } from "../../context/HomeContext";
import Api from "../../services/Api";
import { useUserContext } from "../../context/UserContext";
import { HOME, LOGIN } from "../../router";
import { Button } from "@/components/ui/button";
import NavTop from "../../components/Home/NavTop";
import NavTup from "../../components/Home/NavTup";
import NavBottom from "../../components/Home/NavBottom";
import "../../App.css";

export default function ClientLayout() {
  const navigate = useNavigate();
  // const [transaction, setTransaction] = useState({});
  const {
    user,
    setUser,
    authenticated,
    setAuthenticated,
    logout: contextLogout,
  } = useUserContext();
  const context = useUserContext();
  
  const [loading, setLoading] = useState(true);



  const logout = async () => {
    Api.logout().then(() => {
      contextLogout();
      navigate(HOME);
    });
  };

  

  return (
    <>
      <header>
        <NavTop />
        <NavTup />
        <NavBottom logout={logout} />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
