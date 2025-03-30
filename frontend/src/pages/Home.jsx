import { useUserContext } from "../context/UserContext";
import "../../src/App.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Middle from "../components/Home/Middle";
import MyFooter from "../components/Home/MyFooter";
import { jwtDecode } from "jwt-decode";

export default function Home() {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const context = useUserContext();


 

  return (
    <>
      <Middle/>

      <MyFooter/>
    </>
  );
}
