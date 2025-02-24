import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div>
      <nav className="bg-[#26303D] border-gray-200 dark:bg-gray-900 px-4">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
              to={"/"}
              className="flex ml-8 items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                width="144"
                height="144"
                src="https://i.ibb.co/kDVqMN5/LOGO-3.png"
                alt="BRICOOL"
              />
            </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium text-[0.8em] flex text-white flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              
              <li>
                  <h3 className="tracking-wide leading-4 font-light">Need to fill a report? <br />contact our support 24 / 7 </h3>
            </li>
              
              <li className="flex gap-2 items-center">
              <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/FAB005/phone.png" alt="phone"/>
               <h3 className="tracking-wide leading-4 font-light">8000 <br />2125222222</h3> 
              </li>
              <li className="flex gap-2 items-center">
              <img width="24" height="14" src="https://img.icons8.com/ios-filled/50/FAB005/mail.png" alt="mail"/>
              <h3 className="tracking-wide leading-4 font-light">contact@bricool.ma</h3> 
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
