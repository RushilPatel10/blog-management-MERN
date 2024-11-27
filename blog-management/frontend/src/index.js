import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';


import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Home";
import AddBlog from "./AddBlog";
import EditBlog from "./EditBlog";
import SingleBlog from "./SingleBlog";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/addblog" element={<AddBlog />} />
                <Route path="/edit/:id" element={<EditBlog />} />
                <Route path="/blog/:id" element={<SingleBlog />} />
            </Route>
        </>
    )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
