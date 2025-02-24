import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { CITIES, JOBS, WORKERS } from "../../router";

export default function NavTup() {
  return (
    <Navbar
      fluid
      rounded
      className="bg-[#26303D] border-gray-200 dark:bg-gray-900 px-12 sm:px-36 py-4"
    >
      <Navbar.Brand>
        <img
          width="144"
          height="144"
          src="https://i.ibb.co/kDVqMN5/LOGO-3.png"
          alt="BRICOOL"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse >
        <ul className="font-semibold text-white sm:hidden flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
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
        
        <ul className="font-medium hidden text-white sm:flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg lg:space-x-20 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <h3 className="tracking-wide leading-4 font-light">
              Need to fill a report? <br />
              contact our support 24 / 7{" "}
            </h3>
          </li>

          <li className="flex gap-2 items-center">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios-filled/50/FAB005/phone.png"
              alt="phone"
            />
            <h3 className="tracking-wide leading-4 font-light">
              8000 <br />
              2125222222
            </h3>
          </li>
          <li className="flex gap-2 items-center">
            <img
              width="24"
              height="14"
              src="https://img.icons8.com/ios-filled/50/FAB005/mail.png"
              alt="mail"
            />
            <h3 className="tracking-wide leading-4 font-light">
              contact@bricool.ma
            </h3>
          </li>
        </ul>
      </Navbar.Collapse>
    </Navbar>
  );
}
