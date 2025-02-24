import React, { useState } from "react";
import "../../src/App.css";
import Api from "../services/Api";

const CustomPopup = ({ message, color }) => (
  <div
    className={`fixed z-10 inset-0 overflow-y-auto ${
      color === "success" ? "bg-green-200" : "bg-red-200"
    } flex justify-center items-center`}
    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
  >
    <div
      className={`${
        color === "success" ? "bg-green-700" : "bg-red-700"
      } p-8 rounded shadow-md`}
    >
      <div className="text-xl text-white font-semibold mb-4">
        {color === "success" ? "Success" : "Error"}
      </div>
      <div className="text-lg text-white">{message}</div>
    </div>
  </div>
);

export default function RequestJob({ transactions, loading }) {
  const [formData, setFormData] = useState({
    city: "",
    description: "",
  });
  const [popupInfo, setPopupInfo] = useState({ message: "", color: "" });
  const [sent, setSent] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      const response = await Api.SendRequestJob(
        formData.city,
        formData.description
      );
      console.log(response);
      setPopupInfo({ message: response.data.message, color: "success" });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setPopupInfo({ message: error.response.data.error, color: "error" });
      } else {
        setPopupInfo({ message: "An error occurred.", color: "error" });
      }
    } finally {
      setTimeout(() => {
        setPopupInfo({ message: "", color: "" });
      }, 3000);
    }
  };

  return (
    <div className="m-24">
      <h1 className="m-24 font-semibold text-4xl">ADD NEW REQUEST</h1>

      {popupInfo.message && (
        <CustomPopup message={popupInfo.message} color={popupInfo.color} />
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="city"
            >
              YOUR CITY
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="city"
              type="text"
              name="city"
              placeholder="Your city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="description"
            >
              REQUEST DESCRIPTION
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="description"
              type="text"
              name="description"
              placeholder="Your description here"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-slate-500 hover:bg-slate-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              ADD REQUEST
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
