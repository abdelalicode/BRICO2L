import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { CITIES, JOBS, WORKERS } from "../../router";

export default function ({logout}) {
  const context = useUserContext();

  return (
    <div>
      <nav className="bg-[#D9D9D9] bg-opacity-50 border-gray-200 dark:bg-gray-900 px-4">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 pr-16">
          <ul className="font-semibold hidden sm:flex  mx-9 text-[12px] text-dark flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg lg:space-x-20 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to={"/"}>HOME</Link>
            </li>
            <li>
              <Link to={JOBS}>JOBS</Link>
            </li>
            <li>
              <Link to={CITIES}>CITIES</Link>
            </li>
            <li>
              <Link to={WORKERS}>WORKERS</Link>
            </li>
          </ul>

          <div className="flex gap-8 ">
            <ul className="flex space-x-8 hidden sm:flex">
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/fluency/48/facebook-new.png"
                  alt="facebook-new"
                />
              </li>
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/fluency/48/linkedin.png"
                  alt="linkedin"
                />
              </li>
              <li>
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/fluency/48/twitter.png"
                  alt="twitter"
                />
              </li>
            </ul>
            <div
              className="w-full  md:w-auto -my-4 pl-36 sm:pl-0"
              id="navbar-default"
            >
              {context.authenticated ? (
                <div className="flex gap-4 items-center">
                  <Link to={"/espaceclient"}>
                    <img width="24" height="24" src="https://img.icons8.com/color/48/gender-neutral-user.png" alt="gender-neutral-user"/>
                  </Link>
                  <Link to="/requestjob">
                    <button className="h-full  bg-white p-[18px] text-sm">
                      REQUEST A JOB
                    </button>
                  </Link>
                    <button onClick={logout} className="h-full  bg-transparent p-[17px] text-sm">
                      LOGOUT
                    </button>
                </div>
              ) : (
                <Link to="/login">
                  <button className="h-full ml-24 sm:ml-0  bg-white p-[17px] text-sm">
                    LOGIN
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
