import React, { useEffect, useState } from "react";
import Api from "./../../services/Api";

export default function AdminHome() {
  const [stats, setStats] = useState();

  useEffect(() => {
    const fetchStats = async () => {
      const response = await Api.getStats();
      setStats(response.data);
    };

    fetchStats();
  }, []);
  return (
    <>
      <div className="pt-24 max-w-full max-h-full items-center justify-center w-screen h-screen text-slate-800 p-10 bg-slate-50">
        <h1 className="my-24 text-4xl font-bold text-slate-700">
          Welcome to Your Dashboard
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full max-w-6xl">
          {stats?.map((stat, key ) => (
            <div className="flex items-center shadow p-4 bg-white rounded">
              <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
                <svg
                  className="w-6 h-6 fill-current text-green-700"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-grow flex flex-col ml-4">
                <span className="text-xl font-bold">{stat.city_name}</span>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">OFFERS ON THAT CITY</span>
                  <span className="text-green-500 text-xl font-semibold ml-2">
                  {stat.offer_count}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
