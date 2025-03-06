import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHomeContext } from "../context/HomeContext";
import "../App.css";
import { Link } from "react-router-dom";
import Api from "../services/Api";
import MyFooter from "../components/Home/MyFooter";

export default function Workers() {
  const [workers, setWorkers] = useState({});
  const [loading, setLoading] = useState(true);

  const card = useEffect(() => {
    const fetchWorkers = async () => {
      const response = await Api.getWorkers();
      setWorkers(response.data);
      setLoading(false);
    };
    fetchWorkers();
  }, []);

  if (!workers || loading) {
    return <div className="mx-auto mt-24 spinner"></div>;
  }
  console.log(workers);

  return (
    <>
    <div className="mt-12 mb-24">
      <h1 className="text-center mb-16 m-4 text-4xl">WORKERS NETWORK</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {workers.map((worker) => (
          <section
            key={worker.id}
            class="w-64 mx-auto bg-[#26303D] rounded-xl px-8 py-6 shadow-lg"
          >
            <Link to={`/worker/${worker.id}`}>
              <div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-400 text-sm">{worker.job.type}</span>
                  <span class="text-emerald-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </span>
                </div>
                <div class="mt-6 w-fit mx-auto">
                {worker.profile_image_url ? (
                    <img
                      src={worker.profile_image_url}
                      className="rounded-full w-28"
                      alt="profile picture"
                    />
                  ) : (
                    <img width="100" height="100" src="https://img.icons8.com/ios-filled/100/EBEBEB/user-male-circle.png" alt="user-male-circle"/>
                  )}
                </div>

                <div class="mt-8 ">
                  <h2 class="text-white font-bold text-2xl tracking-wide">
                    {worker.firstname} <br /> {worker.lastname}
                  </h2>
                </div>
                {worker.available ? (
                  <p class="text-emerald-400 font-semibold mt-2.5">Available</p>
                ) : (
                  <p class="text-pink-600 font-semibold mt-2.5">
                    Not Available
                  </p>
                )}

                <div class="h-1 w-full bg-black mt-8 rounded-full">
                  <div class="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
                </div>
                <div class="mt-3 text-white text-sm">
                  <span class="text-gray-400 font-semibold">Rating: </span>
                  <span>40%</span>
                </div>
              </div>
            </Link>
          </section>
        ))}
      </div>
    </div>
    <MyFooter/>
    </>
  );
}
