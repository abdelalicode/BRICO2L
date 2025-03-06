import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavTop from "../components/Home/NavTop";



export default function Layout() {


    return (
        <>
            <header>
             < NavTop/>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
