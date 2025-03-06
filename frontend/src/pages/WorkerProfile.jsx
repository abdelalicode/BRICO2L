import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHomeContext } from "../context/HomeContext";
import "../App.css";
import { useParams } from "react-router-dom";
import Api from "../services/Api";
import ProfileTabs from "../components/Home/ProfileTabs";
import ReviewModal from "../components/Home/ReviewModal";

export default function WorkerProfile() {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorker = async () => {
      const response = await Api.getWorker(id);
      setWorker(response.data);
      setLoading(false);
    };

    fetchWorker();
  }, [id]);

  console.log(worker);

  if (loading) {
    return <div className="mx-auto mt-24 spinner"></div>;
  }

  return (
    <main className="profile-page mt-72">
      <section className="relative block h-500-px">
        <div className="absolute top-0 w-full h-full bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')]">
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div className="top-auto translate-z-0 bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px">
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-sm rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full flex justify-center lg:items-center   lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center ">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <ReviewModal worker={worker}  />

                    <button
                      className="bg-slate-800 mr-4 mx-4 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Contact
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        10
                      </span>
                      <span className="text-sm text-blueGray-400">Offers</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        3
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Enrolled Offers
                      </span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        89
                      </span>
                      <span className="text-sm text-blueGray-400">Reviews</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {worker.firstname} {worker.lastname}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {worker.job.type}
                </div>
                <div className="mb-2 text-blueGray-600 mt-4">
                  <div className="flex justify-center">
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/ios-filled/50/map-pin.png"
                      alt="map-pin"
                    />
                    <p>{worker.city.name}</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <ProfileTabs
                      worker_offers={worker.worker_offers}
                      reviews_as_worker={worker.reviews_as_worker}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
