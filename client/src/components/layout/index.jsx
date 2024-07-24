import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LOGIN } from "../../lib/routes";


export default function Layout() {
    
    // Get the current path
    const { pathname } = useLocation();

    // Create a naviator for redirects
    const navigate = useNavigate();

    // If the pathname changes
    useEffect(() => {

        if(pathname.startsWith('/protected')) {
            navigate(LOGIN);
        }

    }, []);

    return (

        <>
        
            <Outlet />

        </>

    );

}