import React, { useEffect, useState } from "react";
import "../../App.css";
import { useParams } from "react-router-dom";
import Api from "../../services/Api";
import "../../App.css"

export default function ClientsProfile() {

  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      const response = await Api.getClientToWorker(id);
      setClient(response.data);
      setLoading(false);
    };

    fetchClient();
  }, [id]);

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
    <>
    <h1 className="text-center text-4xl">CLIENT'S PROFILE</h1>
    <div className="flex justify-center mt-6">
      
      <div className="w-96 px-6 py-6  text-center bg-slate-700 rounded-lg lg:mt-0 xl:px-10">
        <div className="space-y-4 xl:space-y-6">
          <img
            className="mx-auto rounded-full h-36 w-36"
            src="https://static-00.iconduck.com/assets.00/avatar-default-icon-512x512-4mctvw9j.png"
            alt="author avatar"
          />
          <div className="space-y-2">
            {client != null ?
            <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
              <h3 className="text-white">{client.firstname} {client.lastname}</h3>
              <p className="text-indigo-300"><span className="text-white"> Email : </span>{client.email} <br /> <span className="text-white"> Phone : </span>{client.phone != null ? client.phone : "No Phone for The user"}</p>
              <div className="flex justify-center mt-5 space-x-5">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Contact</button>
              </div>
            </div> : "This user is not a client"  }
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
