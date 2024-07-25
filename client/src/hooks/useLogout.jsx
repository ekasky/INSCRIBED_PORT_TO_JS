import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../lib/routes";


export function useLogout() {

    // Define state to hold wheater
    // we are in the process of logging
    // a user out
    const [loading, setLoading] = useState(false);

    // useNavigate hook to redirect upon logout
    const naviagte = useNavigate();

    // toast hook to show response messages
    const toast = useToast();

    // define a logout function that will
    // be used to call the logout api endpoint
    const logout = async () => {

        // set the loading state to true while
        // logging a user out
        setLoading(true);

        try {

            // Make a api call to the log
            // out endpoint to attempt tp
            // logout the user
            const response = await fetch('/api/logout', {

                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }

            });

            // Get the response data from the api call
            const data = await response.json();

            // If the logout was successful remove
            // the token from localstorage, naviagte
            // back to the login page, and set toast
            // telling the user they have logged out
            if(response.ok) {

                localStorage.removeItem('token');

                toast({
                    title: 'User logged out',
                    status: 'success',
                    position: 'top',
                    duration: 5000,
                    isClosable: true
                });

                naviagte(LOGIN);

                setLoading(false);
                return true;

            }
            // If something went wrong while logging out,
            // display the error message in toast
            else {

                toast({
                    title: 'Logout Failed',
                    description: data.message,
                    status: 'error',
                    position: 'top',
                    duration: 5000,
                    isClosable: true
                });

                setLoading(false);
                return false;

            }
            
        }

        // If something really went wrong
        // this is called, just show a general
        // error message
        catch(error) {

            toast({
                title: 'Logout Failed',
                description: 'Please try again later',
                status: 'error',
                position: 'top',
                duration: 5000,
                isClosable: true
            });

            setLoading(false);
            return false;

        }

    };

    return { logout, loading };

}