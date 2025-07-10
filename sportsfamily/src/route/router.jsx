import {createBrowserRouter,Navigate} from "react-router-dom";
import Login from '../user/login.jsx'
import Register from "../user/register.jsx";
import Dashboard from "../user/dashboard.jsx";
import MyNavbar from "../layouts/mainlayouts.jsx";
import React from "react";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />, // 重定向到/login
    },
    {
        path: '/login',
        element: <Login />,
    },{
        path: '/register',
        element: <Register />,
    },{
        element:<MyNavbar />,
        children:[
            {
                path:'/dashboard',
                element: <Dashboard />,
            }
        ]
    }
])
