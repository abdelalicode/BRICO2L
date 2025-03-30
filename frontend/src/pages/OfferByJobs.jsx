import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useParams } from "react-router-dom";
import Api from "./../services/Api";
import EnrollOfferModal from "../components/Home/EnrollOfferModal";
import MyFooter from './../components/Home/MyFooter';

export default function OfferByJobs() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await Api.OffersByJob(id);
      setOffers(response.data.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

   useEffect(() => {
      const isAuth = localStorage.getItem("AUTHENTICATED") ?? false;
  
      if(isAuth === "false") {
        navigate('/login');
      }
  
    }, []);

  const fetchOffers = async () => {
    const response = await Api.OffersByJob(id);
    setOffers(response.data.data);
  };

  if (loading) {
    return <div className="mx-auto mt-24 spinner"></div>;
  }

  return (
    <>
      <h1 className="text-center my-12 m-4 text-4xl">AVAILABLE OFFERS</h1>
      <div className="flex justify-center mt-12">
        <div className="flex justify-center p-2 gap-4 flex-wrap">
          {offers.length > 0 ? (
            offers.map((offer, key) => (
              <div className="max-w-md mb-8 overflow-hidden bg-white rounded-lg dark:bg-gray-800">
                <img
                  className="object-cover w-full h-64 rounded-md"
                  src="https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/8C53/production/_120232953_gettyimages-1020785030.jpg.webp"
                  alt="Article"
                />

                <div className="p-6">
                  <div>
                    <div className="flex justify-between items-center">

                    {new Date(offer.endDate) < new Date() ? ( <span class="bg-yellow-100 mb-3 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Expired</span>
                    ) : offer.client?.id != null ? (
                        <span className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                          This Offer Is Enrolled
                        </span>
                      ) : (
                        <EnrollOfferModal
                          offerId={offer.id}
                          fetchOffers={fetchOffers}
                        />
                      )} 
                    
                      <span className="text-xs font-medium text-pink-800 uppercase dark:text-blue-400">
                        Hourly Rate: {offer.hourlyRate} MAD
                      </span>
                    </div>

                    <p
                      className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
                      tabIndex="0"
                    >
                      {offer.title}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {offer.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <img
                          className="object-cover h-10 rounded-full"
                          src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                          alt="Avatar"
                        />
                        <Link to={`/worker/${offer.worker.id}`}>
                          <p
                            className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                            tabIndex="0"
                          >
                            {offer.worker.firstName} {offer.worker.lastName}
                          </p>
                        </Link>
                      </div>  
                      <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                        <span> AVAILABLE FROM {offer.startDate} <br /> TO{" "}
                        {offer.endDate} </span>
                        
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="mb-96">No Offers Available!</h1>
          )}
        </div>
      </div>

      <MyFooter/>
    </>
  );
}
