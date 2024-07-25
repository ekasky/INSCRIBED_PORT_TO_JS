import { createBrowserRouter } from "react-router-dom";


import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Dashboard from "../components/dashboard";
import Layout from "../components/layout";

export const ROOT     = '/';
export const LOGIN    = '/login';
export const REGISTER = '/register';

export const PROTECTED = '/protected';
export const DASHBOARD = '/protected/dashboard';
export const FOLLOWERS = '/protected/followers';
export const FOLLOWING = '/protected/following';
export const PROFILE   = '/protected/profile/:userid';

export const router = createBrowserRouter([
    
    { path: ROOT, element: <Login /> },
    { path: LOGIN, element: <Login /> },
    { path: REGISTER, element: <Register /> },
    { path: PROTECTED, element: <Layout />, children: [

        {path: DASHBOARD, element: <Dashboard />},
        {path: FOLLOWERS, element: "Followers"},
        {path: FOLLOWING, element: "Following"},
        {path: PROFILE, element: "Profile"}
    ]}

]);