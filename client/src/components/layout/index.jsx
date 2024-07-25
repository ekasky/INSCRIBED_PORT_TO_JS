import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LOGIN } from "../../lib/routes";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../navbar";

export default function Layout() {

  const { pathname } = useLocation();
  const { user, isLoading, error } = useAuth();
  const navigate = useNavigate();

  // useEffect to handle redirection 
  // based on authentication state
  useEffect(() => {

    // If the authentication state 
    // is still loading, do nothing
    if (isLoading) {
      return;

    }

    // If the current path starts with '/protected'
    // and there is no authenticated user, 
    // redirect to the login page
    if (pathname.startsWith('/protected') && !user) {

      navigate(LOGIN);

    }

  }, [pathname, user, isLoading, navigate]);

  // While authentication state is loading, 
  // show a loading message
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If user is authenticated, render the child routes 
  // using Outlet, otherwise show a redirecting message
  return (

    <>

      {/* {user ? <Outlet /> : <div>Redirecting...</div>} */}

      <Navbar />
      <Outlet />

    </>
    )
  ;
}
