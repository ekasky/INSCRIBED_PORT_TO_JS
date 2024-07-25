import { createBrowserRouter } from "react-router-dom";


import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Dashboard from '../components/dashboard/index';
import ForgotPassword from "../components/auth/ForgotPassword";

import Layout from "../components/layout";

export const ROOT     = '/';
export const LOGIN    = '/login';
export const REGISTER = '/register';
export const FORGOT_PASSWORD = '/forgot-password';

export const PROTECTED = '/protected';
export const DASHBOARD = '/protected/dashboard';


export const router = createBrowserRouter([
    
    { path: ROOT, element: <Login /> },
    { path: LOGIN, element: <Login /> },
    { path: REGISTER, element: <Register /> },
    { path: FORGOT_PASSWORD, element: <ForgotPassword /> },
    { path: PROTECTED, element: <Layout />, children: [

        {path: DASHBOARD, element: <Dashboard />},

    ]}

]);