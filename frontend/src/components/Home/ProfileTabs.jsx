import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ProfileTabs(props) {
  console.log(props);

  const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} className="text-2xl text-yellow-500">
          &#9733;
        </span>
      );
    }

    return <div>{stars}</div>;
  };
  return (
    <div className="flex justify-center">
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Worker's Offers</TabsTrigger>
          <TabsTrigger value="password">Reviews on Worker</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="flex gap-2 flex-wrap">
            {props.worker_offers.length > 0 ? (
              props.worker_offers.map((offer, key) => (
                <div className="w-full my-4 p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center space-x-8">
                    <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                      {offer.title}
                    </h5>
                    <p>
                      FROM {offer.start_date} TO {offer.end_date}
                    </p>
                  </div>
                  <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                    {offer.description}
                  </p>
                </div>
              ))
            ) : (
              <p>No Offers From This Worker</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="flex gap-2 flex-wrap">
            {props.reviews_as_worker.length > 0 ? (
              props.reviews_as_worker.map((review, key) => (
                <div className="w-full my-4 p-4 text-left bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center space-x-8">
                    <div className="flex space-x-8 items-center">
                      <h5 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                        {review.client.firstname} {review.client.lastname}
                      </h5>

                      <StarRating rating={review.stars} />
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm ">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                  <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                    {review.content}
                  </p>
                </div>
              ))
            ) : (
              <p>No Reviews Yet...</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProfileTabs;
