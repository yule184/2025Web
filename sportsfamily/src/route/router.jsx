import {createBrowserRouter,Navigate} from "react-router-dom";
import Login from '../user/login.jsx'
import Register from "../user/register.jsx";
import Dashboard from "../user/dashboard.jsx";
import MyNavbar from "../layouts/mainlayouts.jsx";
import Activitylist from "../activity/activitylist.jsx";
import React from "react";
import Stadiumlist from "../stadium/stadiumlist.jsx";
import StadiumDetail from "../stadium/stadiumdetail.jsx";
import ActivityDetail from "../activity/activitydetail.jsx";
import MyActivity from "../activity/myactivity.jsx";

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
            },
            {
                path:'/activitylist',
                element: <Activitylist />,
            },
            {
                path:'/stadiumlist',
                element: <Stadiumlist />,
            },
            {
                path:'/stadium/:id',
                element:<StadiumDetail />
            },{
                path:'/activity/:id',
                element: <ActivityDetail />
            },{
                path:'/myactivity',
                element: <MyActivity />
            }
        ]
    }
])
