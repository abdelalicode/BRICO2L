import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import "../../App.css";
import ClientsRequests from "../../components/Worker/ClientsRequests";
import Offers from "../../components/Worker/Offers";
import { useUserContext } from "../../context/UserContext";
import WorkerProfileCard from "../../components/Worker/WorkerProfileCard";
import Api from "../../services/Api";
import { HOME } from "../../router";

export default function WorkerDashboardLayout() {
  const { user, setUser,  authenticated} = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();

  const { logout: contextLogout } = useUserContext();

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");

    if (storedUser || user === null) {
      const userObject = JSON.parse(storedUser);
      setUser(userObject);
    }

    console.log(user);
    if (user && user.role_id === 3 || !authenticated) {
      navigate(HOME);
    }
  }, []);

  const isClientProfileRoute = () => {
    return location.pathname.startsWith("/clienttoworker/");
  };

  const logout = async () => {
    Api.logout().then(() => {
      contextLogout();
      navigate(HOME);
    });
  };

    
  

  return (
    <div className="bg-slate-800 h-full min-h-screen w-screen">
      <header>
        <div className="flex p-12 space-x-8 justify-center sm:justify-around items-center">
          <Link to={"/worker"}>
            <img
              width="144"
              height="144"
              src="https://i.ibb.co/kDVqMN5/LOGO-3.png"
              alt="BRICOOL"
              className="h-full"
            />
          </Link>
          <h1 className="text-white font-bold text-2xl">WORKER DASHBOARD</h1>
        </div>
      </header>
      <main className="px-24 text-white text-md">
        <div className="flex justify-between">
          <p className="text-4xl mb-4 capitalize">
            Hello {user.firstname} {user.lastname} !
          </p>
          <button
            onClick={logout}
            className="h-full  bg-slate-700 p-[17px] text-sm"
          >
            LOGOUT
          </button>
        </div>
        {isClientProfileRoute() ? (
          <Outlet />
        ) : (
          <Tabs
            aria-label="Tabs with underline"
            className="border-0 tabs"
            style="underline"
          >
            <Tabs.Item active title="Client's Requests" icon={HiUserCircle}>
              <div className="font-medium py-6 p-5 text-3xl text-center text-gray-50 dark:text-white"></div>
              <ClientsRequests />
            </Tabs.Item>
            <Tabs.Item title="My offers" icon={MdDashboard}>
              <div className="font-medium py-3 text-3xl text-center text-gray-50 dark:text-white"></div>
              <Offers user={user} />
            </Tabs.Item>
            <Tabs.Item title="Profile Settings" icon={HiAdjustments}>
              <WorkerProfileCard />
            </Tabs.Item>
          </Tabs>
        )}
      </main>
    </div>
  );
}
