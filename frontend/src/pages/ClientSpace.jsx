import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import Api from "../services/Api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CancelRequestModal from "../components/Home/CancelRequestModal";
import { useNavigate } from "react-router-dom";
import { HOME, WORKERHOME } from "../router";

export default function ClientSpace() {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);
  const { logout } = useUserContext();
  const navigate = useNavigate();

  const [phoneformData, setphoneFormData] = useState({
    phone: "",
  });

  const [formData, setFormData] = useState({
    address: "",
  });

  useEffect(() => {
    const fetchClient = async () => {
      const response = await Api.getClient();
      setClient(response.data);
      setLoading(false);
    };
    fetchClient();
  }, []);

  const updateRole = async () => {
    const response = await Api.UpdateRole(client.id);
    logout();
    navigate(HOME);
  };

  const fetchUpdatedClient = async () => {
    const response = await Api.getClient();
    setClient(response.data);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setphoneFormData({ ...phoneformData, [name]: value });
  };

  const handletextChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitPhone = async (event) => {
    event.preventDefault();
    const response = await Api.UpdatePhone(phoneformData.phone, client.id);
    console.log(response);
    await fetchUpdatedClient();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await Api.UpdateAddress(formData.address, client.id);
    console.log(response);
    await fetchUpdatedClient();
  };

  if (loading) {
    return <div className="mx-auto mt-24 spinner"></div>;
  }
  if (client.role_id === 2) {
    navigate(WORKERHOME);
  }

  return (
    <div>
      <div className="mb-24">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4"
                    alt="profile-pic"
                  />
                  <h1 className="text-xl font-bold capitalize">
                    {client.firstname} {client.lastname}
                  </h1>
                  <p className="text-gray-700">{client.username}</p>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    PERSONAL INFORMATIONS
                  </span>
                  <ul className="text-sm">
                    <li className="mb-4 flex items-center gap-2">
                      Email:{" "}
                      <span className="bg-gray-100 rounded-md bg-opacity-70 p-1">
                        {client.email}
                      </span>
                    </li>
                    <li className="mb-4 flex items-center gap-2">
                      Phone:{" "}
                      {client.phone ? (
                        <span className="bg-gray-100 p-1">
                          {" "}
                          {client.phone}{" "}
                        </span>
                      ) : (
                        <span className="text-red-300">Add phone</span>
                      )}
                      <Popover>
                        <PopoverTrigger>
                          <img
                            className="transition duration-100 ease-in-out opacity-0 hover:opacity-100"
                            width="18"
                            height="18"
                            src="https://img.icons8.com/cotton/64/edit--v2.png"
                            alt="edit--v2"
                          />
                        </PopoverTrigger>
                        <PopoverContent>
                          <form
                            onSubmit={handleSubmitPhone}
                            className="w-full max-w-sm"
                          >
                            <div className="flex gap-3 items-center">
                              <div className="md:w-2/3">
                                <input
                                  name="phone"
                                  value={phoneformData.phone}
                                  onChange={handleInputChange}
                                  type="text"
                                  id="phone"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-50 focus:border-blue-50 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Your Phone Number"
                                  required
                                />
                              </div>
                              <button
                                className="focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="submit"
                              >
                                <img
                                  width="24"
                                  height="24"
                                  src="https://img.icons8.com/pulsar-color/48/filled-sent.png"
                                  alt="filled-sent"
                                />{" "}
                              </button>
                            </div>
                          </form>
                        </PopoverContent>
                      </Popover>
                    </li>
                    <li className="mb-4 flex items-center gap-2">
                      Address:{" "}
                      {client.address ? (
                        <span className="bg-gray-100 p-1">
                          {" "}
                          {client.address}{" "}
                        </span>
                      ) : (
                        <span className="text-red-300">Add address</span>
                      )}
                      <Popover>
                        <PopoverTrigger>
                          <img
                            className="transition duration-100 ease-in-out opacity-0 hover:opacity-100"
                            width="18"
                            height="18"
                            src="https://img.icons8.com/cotton/64/edit--v2.png"
                            alt="edit--v2"
                          />
                        </PopoverTrigger>
                        <PopoverContent>
                          <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-sm"
                          >
                            <div className="flex gap-3 items-center">
                              <div className="md:w-2/3">
                                <textarea
                                  name="address"
                                  value={formData.address}
                                  onChange={handletextChange}
                                  type="text"
                                  id="address"
                                  rows="1"
                                  className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-50 focus:border-blue-50 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Your Address"
                                >
                                  {formData.address}
                                </textarea>
                              </div>
                              <button
                                className="focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="submit"
                              >
                                <img
                                  width="24"
                                  height="24"
                                  src="https://img.icons8.com/pulsar-color/48/filled-sent.png"
                                  alt="filled-sent"
                                />{" "}
                              </button>
                            </div>
                          </form>
                        </PopoverContent>
                      </Popover>
                    </li>
                    <li className="mb-4">
                      Member Since:{" "}
                      <span className="bg-gray-100 rounded-md bg-opacity-70 p-1">
                        {new Date(client.created_at).toLocaleDateString()}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white rounded-lg p-6">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold my-12 ">All My Requests</h2>
                  <button
                    type="button"
                    onClick={updateRole}
                    className="text-slate-800 h-full bg-gradient-to-br from-yellow-500 to-yellow-400 hover:bg-gradient-to-bl focus:ring-0 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Become A Worker!
                  </button>
                </div>

                {client.requests.length > 0 ? (
                  client.requests.map((request) => (
                    <div className="mb-6" key={request.id}>
                      <div className="flex justify-between flex-wrap gap-2 w-full">
                        <span className="text-gray-700 font-bold">
                          {request.city}
                        </span>
                        <p>
                          <span className="text-gray-700 mr-2">
                            <span className="bg-slate-200 text-slate-700 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                              {new Date(request.created_at).toLocaleString()}
                            </span>
                          </span>
                        </p>
                      </div>
                      <p className="mt-2">{request.description}</p>
                      <div className="flex items-center mt-4">
                        {request.status ? (
                          <span className="bg-indigo-100 h-full text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                            Active
                          </span>
                        ) : (
                          <span className="bg-pink-100 h-full  text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                            Cancelled
                          </span>
                        )}

                        {request.status === 1 && (
                          <CancelRequestModal
                            fetchUpdatedClient={fetchUpdatedClient}
                            requestid={request.id}
                          />
                        )}
                      </div>
                      <hr className="my-6 border-t border-gray-300" />
                    </div>
                  ))
                ) : (
                  <p>No Requests From You Yet</p>
                )}
              </div>

              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-bold mt-8 mb-12 ">
                  All My Reviews
                </h2>

                {client.reviews.length > 0 ? (
                  client.reviews.map((review) => (
                    <div className="mb-6" key={review.id}>
                      <div className="flex justify-between flex-wrap gap-2 w-full">
                        <span className="text-gray-700 font-bold">
                          {review.stars} STARS
                        </span>
                        <p>
                          <span className="text-gray-700 mr-2">
                            <span className="bg-slate-100 text-slate-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                              {new Date(review.created_at).toLocaleString()}
                            </span>
                          </span>
                        </p>
                      </div>
                      <p className="mt-2">{review.content}</p>
                      <hr className="my-6 border-t border-gray-300" />
                    </div>
                  ))
                ) : (
                  <p>No Reviews From You Yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
