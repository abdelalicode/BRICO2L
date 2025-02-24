import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import Api from "../services/Api";
import { useNavigate } from "react-router";
import { HOME } from "../router/index";

export const StateContext = createContext({
  cities: {},
  jobs: {},
  selectedCity: null,
  selectedJob: null,
  authenticated: false,
  setCities: () => {},
  setJobs: () => {},
  setAuthenticated: () => {},
  setSelectedCity: () => {},
  setSelectedJob: () => {},
  filteredOffers: {},
  setFilteredOffers: () => {},
  loading : true,
  setLoading : () => {}
});

export default function HomeContext({ children }) {
  const [cities, setCities] = useState(null);
  const [jobs, setJobs] = useState(null);
  // const [user, setUser]= useState()
  const [authenticated, setAuthenticated] = useState(false);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCities = async () => {
      const cities = await Api.getCities();
      setCities(cities);
      setLoading(false)
    };

    fetchCities();

    const fetchJobs = async () => {
      const jobs = await Api.getJobs();
      setJobs(jobs);
      setLoading(false)
    };

    fetchJobs();

    setSelectedCity(selectedCity);
    setSelectedJob(selectedJob);
    setSelectedDate(selectedDate);
    setFilteredOffers(filteredOffers);
  }, []);


  return (
    <>
      <StateContext.Provider
        value={{
          cities,
          jobs,
          setCities,
          setJobs,
          authenticated,
          setAuthenticated,
          filteredOffers,
          setFilteredOffers,
          selectedCity,
          selectedDate,
          selectedJob,
          setSelectedCity,
          setSelectedJob,
          setSelectedDate,
          loading,
          setLoading
        }}
      >
        {children}
      </StateContext.Provider>
    </>
  );
}

export const useHomeContext = () => useContext(StateContext);
