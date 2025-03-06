import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function MyFooter() {
  return (
    <Footer container className="bg-[#26303D] rounded-xs">
      <div className="w-full bg-[#26303D]">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
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
            
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link >BRICOOL</Footer.Link>
                <Footer.Link >SPRING BOOT REACT JS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link >Github</Footer.Link>
                <Footer.Link >Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link >Privacy Policy</Footer.Link>
                <Footer.Link >Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="text-gray-600" />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright  by="BRICOOL™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center text-gray-300">
            <Footer.Icon  icon={BsFacebook} />
            <Footer.Icon  icon={BsInstagram} />
            <Footer.Icon  icon={BsTwitter} />
            <Footer.Icon  icon={BsGithub} />
            <Footer.Icon  icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
