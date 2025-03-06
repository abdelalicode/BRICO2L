import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHomeContext } from "../context/HomeContext";
import "../App.css";
import { Link } from "react-router-dom";
import MyFooter from "../components/Home/MyFooter";

export default function Jobs() {
  const { jobs, loading } = useHomeContext();

  if (!jobs || loading) {
    return <div className="mx-auto mt-24 spinner"></div>;
  }
  return (
    <>
    <div className="mt-12 mb-24 ">
      <h1 className="text-center mb-16 m-4 text-4xl">AVAILABLE JOBS</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {jobs.data.data.map((job, key) => (
          <div className="relative grid h-[18em] w-full max-w-[26em] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
            <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://img.freepik.com/photos-gratuite/portrait-ingenieur-civil-masculin-fond-chantier-construction_1057-37118.jpg?t=st=1713271384~exp=1713274984~hmac=1aedd6f7d204f9c7f0ad25a20fdf0582e90a0247b2a760b59bdcfa72baa1e4ef&w=1060')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
              <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
            </div>
            <div className="relative flex flex-col items-center p-6 px-6 py-14 md:px-12">
              <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                {job.type}s
              </h2>
              <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
                Check Offers
              </h5>
              <Link to={`/jobs/${job.id}`}>
                <img
                  alt="City"
                  src="https://img.icons8.com/color/48/job--v1.png"
                  className="relative inline-block h-[44px] w-[44px] !rounded-full border-2 border-white object-cover object-center"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

    <MyFooter/>
    </>
  );
}
