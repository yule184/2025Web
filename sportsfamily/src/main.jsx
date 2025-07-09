import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import {createBrowserRouter,RouterProvider,Navigate} from "react-router-dom";
import Login from './user/login.jsx'
import Register from "./user/register.jsx";
import Dashboard from "./user/dashboard.jsx";
import Navbar from "./components/navbar.jsx";

const router = createBrowserRouter([
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
        element:<Navbar />,
        children:[
            {
                path:'/dashboard',
                element: <Dashboard />,
            }
        ]
    }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
