import { createBrowserRouter } from "react-router-dom";
import Home from "./../pages/Home";
import Register from "./../pages/Register";
import Login from "./../pages/Login";
import NotFound from "../pages/NotFound";
import Layout from "./../layouts/Layout";
import ClientHomeLayout from "../layouts/Client/ClientHomeLayout";
import GuestLayout from "../layouts/GuestLayout";
import UpdateProfile from "../pages/UpdateProfile";
import ADminDashboardLayout from "../layouts/Admin/AdminDashboardLayout";
import AdminHome from "../pages/Admin/AdminHome";
import FilteredOffers from "../pages/FilteredOffers";
import Jobs from "../pages/Jobs";
import Cities from "../pages/Cities";
import OfferByCities from "../pages/OfferByCities";
import OfferByJobs from "../pages/OfferByJobs";
import WorkerProfile from "../pages/WorkerProfile";
import RequestJob from "../pages/RequestJob";
import ClientSpace from "../pages/ClientSpace";
import Workers from "../pages/Workers";
import WorkerHome from "../pages/Worker/WorkerHome";
import WorkerDashboardLayout from "../layouts/Worker/WorkerDashboardLayout";
import ClientsProfile from "../pages/Worker/ClientsProfile";
import HomeGuestLayout from "../layouts/HomeGuestLayout";
import AdminJobs from "../pages/Admin/AdminJobs";

export const HOME = "/";
export const ADMINHOME = "/admin";
export const ADMINJOBS = "/admin/jobs";
export const WORKERHOME = "/worker";
export const FILTEREDOFFERS = "/filteredoffers";
export const REQUESTJOB = "/requestjob";
export const LOGIN = "/login";
export const UPDATEPROFILE = "/updateprofile";
export const JOBS = "/jobs";
export const CITIES = "/cities";
export const WORKERS = "/workers";
export const OFFERBYJOBS = "/jobs/:id";
export const OFFERBYCITIES = "/cities/:id";
export const WORKERPROFILE = "/worker/:id";
export const CLIENTSPROFILE = "/clienttoworker/:id";
export const CLIENTSPACE = "/espaceclient";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/signup",
        element: <Register />,
      },
    ],
  },

  {
    element: <HomeGuestLayout />,
    children: [
      {
        path: HOME,
        element: <Home />,
      },

      {
        path: FILTEREDOFFERS,
        element: <FilteredOffers />,
      },
      {
        path: JOBS,
        element: <Jobs />,
      },
      {
        path: CITIES,
        element: <Cities />,
      },
      {
        path: WORKERS,
        element: <Workers />,
      },
      {
        path: OFFERBYCITIES,
        element: <OfferByCities />,
      },
      {
        path: OFFERBYJOBS,
        element: <OfferByJobs />,
      },
    ],
  },
  {
    element: <ClientHomeLayout />,
    children: [
      {
        path: WORKERPROFILE,
        element: <WorkerProfile />,
      },
      {
        path: REQUESTJOB,
        element: <RequestJob />,
      },
      {
        path: UPDATEPROFILE,
        element: <UpdateProfile />,
      },
      {
        path: CLIENTSPACE,
        element: <ClientSpace />,
      },
    ],
  },
  {
    element: <WorkerDashboardLayout />,
    children: [
      {
        path: WORKERHOME,
        element: <WorkerHome />,
      },
      {
        path: CLIENTSPROFILE,
        element: <ClientsProfile />,
      },
    ],
  },
  {
    element: <ADminDashboardLayout />,
    children: [
      {
        path: ADMINJOBS,
        element: <AdminJobs />,
      },
      {
        path: ADMINHOME,
        element: <AdminHome />,
      },
    ],
  },
]);
