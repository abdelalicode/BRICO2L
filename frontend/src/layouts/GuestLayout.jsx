import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HOME } from "./../router/index";
import { useHomeContext } from "../context/HomeContext";
import { useUserContext } from "../context/UserContext";
import NavBottom from "../components/Home/NavBottom";
import NavTop from "../components/Home/NavTop";

export default function GuestLayout() {
  const navigate = useNavigate();
  const context = useUserContext();

  useEffect(() => {
    if (context.authenticated)
    {
        navigate(HOME)
    }
  }, []);
  return (
    <>
      <header>
        <NavTop />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
