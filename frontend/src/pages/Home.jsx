import { useUserContext } from "../context/UserContext";
import "../../src/App.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Middle from "../components/Home/Middle";
import MyFooter from "../components/Home/MyFooter";

export default function Home() {

  const context = useUserContext();
  return (
    <>
      <Middle/>

      <MyFooter/>
    </>
  );
}
