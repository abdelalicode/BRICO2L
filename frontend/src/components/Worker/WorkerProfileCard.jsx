import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { useHomeContext } from "../../context/HomeContext";
import Api from "../../services/Api";
import "../../App.css";
import ChangeProfilePictureModal from "./ChangeProfilePictureModal";

export default function WorkerProfileCard() {
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const {user , setUser} = useUserContext();

  const { cities, jobs } = useHomeContext();

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleJobChange = (event) => {
    setSelectedJob(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await Api.updateWorkerProfile(
      worker.id,
      selectedCity,
      selectedJob
    );
    getUpdatedAuthWorker();
  };

  useEffect(() => {
    const fetchWorkerData = async () => {
      const response = await Api.getAuthWorker();
      setWorker(response.data);
      setUser(response.data);
      setLoading(false);
    };

    fetchWorkerData();
  }, []);

  const getUpdatedAuthWorker = async () => {
    const response = await Api.getAuthWorker();
    setWorker(response.data);
    setUser(response.data);
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
    <div>
      <div className=" gap-6 flex items-center justify-center">
        <div className="bg-slate-700 w-[600px] min-h-[350px] px-12 bg-opacity-80 dark:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
          <div className="flex items-center gap-4">
            
            <ChangeProfilePictureModal workerid={worker.id} worker={worker} getUpdatedAuthWorker={getUpdatedAuthWorker}/>


            <div className="w-fit transition-all transform duration-500">
              <h1 className="text-gray-400 capitalize text-xl dark:text-gray-200 font-bold">
                {worker.firstname} {worker.lastname}
              </h1>
              <p className="text-gray-400">Email: {worker.email}</p>
              <p className="text-gray-400">Location: {worker.city.name}</p>
              <p className="text-gray-400">Job Type: {worker.job.type}</p>
            </div>
          </div>
          <div className="absolute group-hover:bottom-1 delay-250 -bottom-16 transition-all duration-500 bg-transparent dark:bg-gray-100 right-1 rounded-lg">
            <div className="flex justify-evenly items-center gap-2 p-3 text-2xl text-white dark:text-gray-600">
              <form onSubmit={handleSubmit}>
                <p className="p-2">Edit Your Profile</p>
                <select
                  onChange={handleCityChange}
                  value={selectedCity}
                  className="ml-6 text-white py-2.5 text-sm text-gray-500 bg-transparent border-0 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option value="">Which city</option>
                  {cities &&
                    cities.data.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                </select>
                <select
                  onChange={handleJobChange}
                  value={selectedJob}
                  className="ml-5 text-white py-2.5 text-sm text-gray-500 bg-transparent border-0  border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option value="">What type of work</option>
                  {jobs &&
                    jobs.data.data.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.type}
                      </option>
                    ))}
                </select>

                <button className="font-semibold text-[12px] bg-yellow-500 px-6 py-2 ml-2">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
