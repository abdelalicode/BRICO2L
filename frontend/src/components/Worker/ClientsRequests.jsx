import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import Api from "../../services/Api";
import "../../App.css";
import Toast from '../../components/Worker/Toast';
import { useUserContext } from './../../context/UserContext';
import { Link } from "react-router-dom";

export default function ClientsRequests() {
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(true);
  const [requests, setRequests] = useState([]);
  const {user , setUser} = useUserContext();

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await Api.getRequests();
      setRequests(response.data);
      setLoading(false);
    };
    fetchRequests();
  }, []);


  const TakeRequest = async (requestId) => {
      const response = await Api.TakeRequest(requestId);
      fetchUpdatedRequests();
  }


  const fetchUpdatedRequests = async () => {
    const response = await Api.getRequests();
    setRequests(response.data);
    setLoading(false);
  };


  if (loading) {
    return (
      <div className="flex mt-12 justify-center items-center">
        <div className="loader">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mb-5">
      {requests.map((request) => (
        <Card
          className="max-w-sm shadow-xl bg-slate-700 border-0"
          key={request.id}
        >
          <div className="flex justify-between">
            <span className="bg-yellow-400 b text-yellow-900 h-full text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-slate-900 dark:text-indigo-300">{ new Date(request.created_at).toLocaleString()}</span>
            <div className="flex">
            <img width="22" height="8" src="https://img.icons8.com/ios-filled/50/FFFFFF/map-pin.png" alt="map-pin"/>
            <p>{request.city}</p>
            </div> 
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-50 dark:text-white capitalize">
          <Link to={`/clienttoworker/${request.client.id}`}>
                          {request.client.firstname} {request.client.lastname}
           </Link>
          </h5>
          <p className="font-normal text-gray-50 dark:text-gray-400">
          {request.description}
          </p>
          {request.worker_id == null ?
          <Button onClick={() => TakeRequest(request.id)}  className="hover:bg-slate-800 focus:ring-0">
            Accept This Request
            <svg
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            
          </Button> : <span className="bg-red-100 w-2/3 text-center text-red-800 text-xs font-medium me-2 px-2.5 py-1 rounded dark:bg-red-900 dark:text-red-300">{user.id === request.worker_id ? "Request Taken By You" : "Already Taken By A Worker"}</span>

           }
        </Card>
      ))}
    </div>
  );
}
