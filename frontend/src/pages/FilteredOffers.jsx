import React, { useEffect } from "react";
import "../../src/App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useHomeContext } from "../context/HomeContext";
import { HOME } from "../router";
import SelectBar from "../components/Home/SelectBar";

export default function FilteredOffers() {
  const location = useLocation();
  const { selectedCity, selectedJob, selectedDate, filteredOffers ,loading } =
    useHomeContext();

  if (!selectedCity || !selectedJob || !filteredOffers || !selectedDate ) {
    return (
      <div className="mx-24">
        <SelectBar />
        <h1 className="my-12 text-4xl font-bold">
          AVAILABLE OFFERS LIST 
        </h1>
        <p className="text-lg text-gray-500">No offers available</p>
      </div>
    );
  }


  return (
    <div className="mx-24 mb-24">
      <SelectBar />
      <h1 className=" my-12 text-4xl font-bold">
        AVAILABLE OFFERS LIST on {selectedDate}
      </h1>

      {filteredOffers?.length === 0 ? (
        <p className="text-lg text-gray-500">No offers available</p>
      ) : (
        filteredOffers?.map((item) => (
          <div key={item.worker.id}>
            {item.offers != null ? (
              item.offers.map((offer) => (
                <div
                  key={offer.id}
                  className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row mb-6"
                >
                  <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
                      alt="card-image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                  <Link to={`/worker/${item.worker.id}`}>
                    <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                      Worker: {item.worker.firstname} {item.worker.lastname}
                    </h6>
                  </Link>
                    <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                      {offer.title}
                    </h4>
                    <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                      {offer.description}
                    </p>
                    <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                      <span className="font-semibold">AVAILABLE FROM</span>{" "}
                      {offer.start_date}{" "}
                      <span className="font-semibold">TO</span> {offer.end_date}
                    </p>
                    <Link to={`/worker/${item.worker.id}`}>
                      <button
                        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                        type="button"
                      >
                        Contact the worker
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          ></path>
                        </svg>
                      </button>
                    </Link>
                    {offer.cancelled ? <p className="text-red-500">CANCELLED</p> : ""}
                  </div>
                </div>
              ))
            ) : (
              <p>No Offers Available</p>
            )}
          </div>
        ))
      )}
    </div>
    // <div className="m-24">
    //   {filteredOffers.length === 0 ? (
    //     <p className="text-lg text-gray-500">No offers available</p>
    //   ) : (
    //     filteredOffers.map((item) => (
    //
    //     ))
    //   )}
    // </div>
  );
}
