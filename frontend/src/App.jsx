import { useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import UserContext from "./context/UserContext";
import HomeContext from "./context/HomeContext";

function App() {
    return (
        <>
            <UserContext>
                <HomeContext>
                    <RouterProvider router={router} />
                </HomeContext>
            </UserContext>
        </>
    );
}

export default App;
