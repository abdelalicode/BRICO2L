import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Api from "../../services/Api";


function ProfileTabs(props) {
  const [uId, setUId] = React.useState(null);
  const [showDeleteNotification, setShowDeleteNotification] = React.useState(false);

  useEffect(() => {
    const userId = window.localStorage.getItem('xs');
    setUId(userId);
  }, []);


  const handleDeleteReview = async (reviewId) => {
    try {
      await props.handleReviewDeleted(reviewId);
      setShowDeleteNotification(true);

      setTimeout(() => {
        setShowDeleteNotification(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };




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
    <>
      {showDeleteNotification && (
        <div className="fixed top-72 right-4 z-50 animate-fade-in-down">
          <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Review deleted successfully!</span>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Worker's Offers</TabsTrigger>
            <TabsTrigger value="password">Reviews on Worker</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="flex gap-2 flex-wrap">
              {props.worker_offers ? (
                props.worker_offers.map((offer, key) => (
                  <div key={key} className="w-full my-4 p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 relative group">


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
              {props.reviews_as_worker ? (
                props.reviews_as_worker.map((review, key) => (
                  <div className="w-full my-4 p-4 text-left bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 relative group" key={key}>
                    {uId == review.client.id && (
                      <button onClick={() => handleDeleteReview(review.id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                    )}

                    <div className="flex items-center space-x-8">
                      <div className="flex space-x-8 items-center">
                        <h5 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                          {review.client.firstName} {review.client.lastName}
                        </h5>

                        <StarRating rating={review.stars} />
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm ">
                      {new Date(review.date).toLocaleDateString()}
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
    </>
  );
}

export default ProfileTabs;
