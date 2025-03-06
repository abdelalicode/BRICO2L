import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import { useHomeContext } from "../../context/HomeContext";
import Api from "./../../services/Api";

export default function () {

  const navigate = useNavigate();
  const [loading , setLoading] = useState(true)


  const {
    cities,
    jobs,
    selectedCity,
    setSelectedCity,
    selectedJob,
    setSelectedJob,
    selectedDate,
    setSelectedDate,
    filteredOffers, 
    setFilteredOffers
  } = useHomeContext();


  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleJobChange = (event) => {
    setSelectedJob(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    offersby();
  };

  const offersby = async () => {
    const data = await Api.filterOffers(selectedCity, selectedJob, selectedDate)
      setFilteredOffers(data.data);
      setLoading(false)
  };


  return (
    <>
      <div className="grid grid-cols-2 gap-4 my-24">

          <div className="mt-2  text-[12px] min-w-[558px] min-h-[60px] bg-[#26303D] rounded-lg  backdrop-blur-xl flex items-center">
            <form onSubmit={handleSubmit}>
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
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="ml-5 text-white py-2.5 text-sm bg-transparent border-0 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:border-gray-200 peer"
              />
              {/* <Link
                to={{
                  pathname: "/filteredoffers",
                }}
              > */}
                <button className="font-semibold text-[12px] bg-yellow-500 px-6 py-2 ml-2">
                  SUBMIT
                </button>
              {/* </Link> */}
            </form>
          </div>
          
        </div>

    </>
  );
}
