import { createBrowserRouter } from "react-router-dom";


import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Dashboard from '../components/dashboard/index';
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";
import Settings from "../components/dashboard/Settings";

import Layout from "../components/layout";
import DiscoverFeed from "../components/feed/DiscoverFeed";
import ForYouFeed from "../components/feed/ForYouFeed";
import YourPosts from "../components/feed/YourPosts";
import NewPost from "../components/feed/NewPost";


export const ROOT     = '/';
export const LOGIN    = '/login';
export const REGISTER = '/register';
export const FORGOT_PASSWORD = '/forgot-password';
export const RESET_PASSWORD = '/reset-password';

export const PROTECTED = '/protected';
export const DASHBOARD = '/protected/dashboard';
export const SETTINGS = '/protected/settings';
export const DISCOVER_FEED = '/protected/discover-feed';
export const FOR_YOU_FEED = '/protected/for-you-feed';
export const YOUR_POSTS = '/protected/your-posts';
export const NEW_POST = '/protected/new-post';


export const router = createBrowserRouter([
    
    { path: ROOT, element: <Login /> },
    { path: LOGIN, element: <Login /> },
    { path: REGISTER, element: <Register /> },
    { path: FORGOT_PASSWORD, element: <ForgotPassword /> },
    { path: RESET_PASSWORD, element: <ResetPassword /> },

    { path: PROTECTED, element: <Layout />, children: [

        { path: DASHBOARD, element: <Dashboard /> },
        { path: SETTINGS, element: <Settings /> },
        { path: DISCOVER_FEED, element: <DiscoverFeed /> },
        { path: FOR_YOU_FEED, element: <ForYouFeed /> },
        { path: YOUR_POSTS, element: <YourPosts /> },
        { path: NEW_POST, element: <NewPost /> },

    ]}

]);