// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import RootLayout from "@/app.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PortfolioPage from "@/pages/portfolio";
import CVPage from "@/pages/cv";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <PortfolioPage />,
            },
            {
                path: "/cv",
                element: <CVPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
