import React, { useState } from "react";
import { useEffect } from "react";
import Api from "../../services/Api";
import { Badge } from "flowbite-react";
import { AddOffer } from "./AddOffer";
import { useUserContext } from "../../context/UserContext";
import CancelOfferModal from "./CancelOfferModal";
import { Link } from "react-router-dom";

export default function Offers({user}) {
  const [workerOffers, setWorkerOffers] = useState([]);
  

  useEffect(() => {
    const fetchWorkerOffers = async () => {
      const response = await Api.getWorkerOffers();
      setWorkerOffers(response.data.data);
      console.log(workerOffers);
    };
    fetchWorkerOffers();
  }, []);


  const fetchUpdatedOffers = async () => {
    const response = await Api.getWorkerOffers();
    setWorkerOffers(response.data.data);
  };

 

  return (
    <div>
      <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg">
        {user.city != null && user.profession != null ? (
          <AddOffer fetchUpdatedOffers={fetchUpdatedOffers} />
        ) : (
          <div
            className="p-4 w-full sm:w-1/2 mb-4 text-sm text-red-800 rounded-md bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Info Needed!</span> Add Your City and
            Job To Your Profile Section
          </div>
        )}
        <table className="w-full text-sm  text-left rtl:text-right text-white dark:text-white">
          <thead className="text-xs  text-white uppercase dark:text-white">
            <tr className="border-b border-8 border-slate-800 dark:border-gray-700">
              <th
                scope="col"
                className="px-3 py-3 bg-slate-500 dark:bg-slate-800"
              >
                Title
              </th>
              <th scope="col" className="px-3 py-3 bg-slate-600">
                Description
              </th>
              <th
                scope="col"
                className="px-2 py-3 bg-slate-500 dark:bg-slate-700"
              >
                Start Date
              </th>
              <th scope="col" className="px-2 py-3 bg-slate-600">
                End Date
              </th>
              <th scope="col" className="px-3 py-3 bg-slate-500">
                Hourly Rate
              </th>
              <th scope="col" className="px-3 py-3 bg-slate-600">
                Status
              </th>
              <th scope="col" className="px-3 py-3 bg-slate-500">
                Cancel Offer
              </th>
            </tr>
          </thead>
          <tbody>
            {workerOffers.length > 0 ? (
              workerOffers.map((offer, key) => (
                <tr
                  key={offer.id}
                  className="border-b border-8 border-slate-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-white whitespace-nowrap bg-slate-600 dark:text-white dark:bg-slate-800"
                  >
                    {offer.title}
                  </th>
                  <td className="px-3 py-3 bg-slate-700">
                    { offer.description.length > 50 ? offer.description.slice(0, 50) + "..." : offer.description}
                  </td>
                  <td className="px-2 py-3 bg-slate-600 dark:bg-slate-800">
                    <Badge className="justify-center " color="indigo">
                      {offer.startDate}
                    </Badge>
                  </td>
                  <td className="px-1 py-3 bg-slate-700">
                    <Badge className="justify-center w-full" color="warning">
                      {offer.endDate}
                    </Badge>
                  </td>
                  <td className="px-1 py-3 pl-12 bg-slate-600 dark:bg-slate-800">
                    {offer.hourlyRate}
                  </td>
                  <td className="px-3 py-3 bg-slate-700">
                    {offer.canceled ? (
                      "Cancelled"
                    ) : offer.client?.id != null ? (
                      <span>
                        Taken By{" "}
                        <Link to={`/clienttoworker/${offer.client?.id}`}>
                          {offer.client?.firstName} {offer.client?.lastName}
                        </Link>
                      </span>
                    ) : (
                      "Not Enrolled Yet"
                    )}
                  </td>

                  <td className="px-3 py-4 bg-slate-600">
                    {!offer.canceled && (
                      <CancelOfferModal
                        fetchUpdatedOffers={fetchUpdatedOffers}
                        offerid={offer.id}
                      />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <span className="m-12 text-xl font-semibold">
                No Offers From You Yet!
              </span>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
