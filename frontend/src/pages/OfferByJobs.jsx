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
      setOffers(response.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const fetchOffers = async () => {
    const response = await Api.OffersByJob(id);
    setOffers(response.data);
  };

  if (loading) {
    return <div className="mx-auto mt-24 spinner"></div>;
  }

  return (
    <>
      <h1 className="text-center my-12 m-4 text-4xl">AVAILABLE OFFERS</h1>
      <div className="flex justify-center mt-12">
        <div className="flex gap-6 flex-wrap">
          {offers.length > 0 ? (
            offers.map((offer, key) => (
              <div className="max-w-md mb-8 overflow-hidden bg-white rounded-lg dark:bg-gray-800">
                <img
                  className="object-cover w-full h-64 rounded-md"
                  src={offer.media_url}
                  alt="Article"
                />

                <div className="p-6">
                  <div>
                    <div className="flex justify-between items-center">
                    {offer.client_id != null ? (
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
                        Hourly Rate: {offer.hourly_rate}
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
                            {offer.worker.firstname} {offer.worker.lastname}
                          </p>
                        </Link>
                      </div>  
                      <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                        {new Date(offer.end_date) < new Date() ? <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Expired</span>
 : <span> AVAILABLE FROM {offer.start_date} <br /> TO{" "}
                        {offer.end_date} </span>}
                        
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
