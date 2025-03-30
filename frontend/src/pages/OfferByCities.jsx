import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHomeContext } from "../context/HomeContext";
import "../App.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Api from "../services/Api";
import EnrollOfferModal from "../components/Home/EnrollOfferModal";
import MyFooter from "../components/Home/MyFooter";
import { LOGIN } from "../router";
import { jwtDecode } from "jwt-decode";

export default function OfferByCities() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await Api.OffersByCity(id);
      setOffers(response.data.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const isAuth = localStorage.getItem("AUTHENTICATED") ?? false;

    if (isAuth === "false") {
      navigate('/login');
    }

  }, []);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/login');
      }

      const decoded = jwtDecode(token);
      if (!decoded.role.includes('ROLE_CLIENT')) {
        navigate('/worker');
        return;
      }
    }
    catch (error) {
      console.error("Error decoding token:", error);
      navigate('/login');
    }
    finally {
      setIsLoading(false);
    }
  }
    , []);




  const fetchOffers = async () => {
    const response = await Api.OffersByCity(id);
    setOffers(response.data.data);
  };

  console.log(offers);

  if (isLoading || loading) {
    return <div className="mx-auto mt-24 spinner"></div>;
  }

  return (
    <>
      <h1 className="text-center my-12 m-4 text-4xl">AVAILABLE OFFERS</h1>
      <div className="flex justify-center mt-12">
        <div className="flex mx-4 justify-center gap-4 flex-wrap">
          {offers?.length > 0 ? (
            offers.map((offer, key) => (
              <div className="max-w-[27REM] mb-8 overflow-hidden bg-white rounded-lg dark:bg-gray-800">
                <img
                  className="object-cover w-full h-64 rounded-md"
                  src="https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/8C53/production/_120232953_gettyimages-1020785030.jpg.webp"
                  alt="Article"
                />

                <div className="p-6">
                  <div>
                    <div className="flex justify-between items-center">

                      {new Date(offer.endDate) < new Date() ? (
                        <span className="bg-yellow-100 mb-3 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                          Expired
                        </span>
                      ) : offer.canceled ? (
                        <span className="bg-red-700 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                          Cancelled By The Worker
                        </span>
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
                        <p>Worker: </p>

                        <Link to={`/worker/${offer.worker?.id}`}>
                          <p
                            className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                            tabIndex="0"
                          >
                            {offer.worker?.firstName} {offer.worker?.lastName}
                          </p>
                        </Link>
                      </div>
                      <span className="mx-1 text-xs text-gray-600 dark:text-gray-300">
                        AVAILABLE FROM {offer.startDate} <br /> TO{" "}
                        {offer.endDate}
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

      <MyFooter />
    </>
  );
}
