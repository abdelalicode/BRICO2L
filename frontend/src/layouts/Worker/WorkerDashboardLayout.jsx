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
import { jwtDecode } from "jwt-decode";

export default function WorkerDashboardLayout() {
  const { user, setUser,  authenticated} = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const { logout: contextLogout } = useUserContext();

   useEffect(() => {
    const fetchWorkerData = async () => {
      try {
        // Check if the user is already set in the context
        const token = localStorage.getItem("token");
        if(!token) {
          navigate('/login');
        }

        const decoded = jwtDecode(token);
        if (!decoded.role.includes('ROLE_WORKER')) {
          navigate('/');
          return;
       }
        if (user === null) {
          const response = await Api.getAuthWorker();
          const userObject = response?.data.data;
          setUser(userObject);
        }
      } catch (error) {
        console.error('Error fetching worker data:', error);
      }
      finally {
      setIsLoading(false);
      }
    };

    fetchWorkerData();
  }, []);

  const isClientProfileRoute = () => {
    return location.pathname.startsWith("/clienttoworker/");
  };

  const logout = async () => {
    contextLogout();
    Api.logout().then(() => {
      navigate(HOME);
    });
  };

    
  if (isLoading) {
    return <div className="mx-auto mt-24 spinner"></div>;
  }

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
            Hello {user.firstName} {user.lastName} !
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
