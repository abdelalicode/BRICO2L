import React, { useEffect, useState } from "react";
import { useHomeContext } from "../context/HomeContext";
import "../App.css";
import Api from "../services/Api";
import { Link, useNavigate } from "react-router-dom";
import MyFooter from "../components/Home/MyFooter";

export default function Cities() {
  const { cities, loading } = useHomeContext();
  const navigate = useNavigate();

  // const handleCityClick = async (id) => {
  // navigate(`/cities/${id}`);

  // };

  if (!cities || loading) {
    return <div className="mx-auto mt-24 spinner"></div>;
  }
  return (
    <>
    <div className="mt-12 mb-24">
      <h1 className="text-center mb-16 m-4 text-4xl">AVAILABLE CITIES</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {cities.data.map((city, key) => (
          <div
            key={city.id}
            className="relative grid h-[18em] w-full max-w-[26em] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700"
          >
            <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://img.freepik.com/photos-gratuite/beaux-immeubles-grande-hauteur-angle-eleve-du-ciel_23-2149444947.jpg?w=360&t=st=1713272536~exp=1713273136~hmac=66dab0789d1aad74118cdab90120ec09cc112ad3929e54b4eb80ce2c501a43d5')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
              <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
            </div>
            <div className="relative flex flex-col items-center p-6 px-6 py-14 md:px-12">
              <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                {city.name}
              </h2>
              <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
                Check Offers
              </h5>
              <Link to={`/cities/${city.id}`}>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency-systems-filled/48/FAB005/search-bar.png"
                  alt="search-bar"
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
