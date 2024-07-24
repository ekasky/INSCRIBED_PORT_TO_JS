import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // State to keep user info
    const [user, setUser] = useState(null);

    // State to determine if fetching from db/api
    const [loading, setLoading] = useState(true);

    // Function to fetch user data from database
    const fetchUser = async () => {

        // Get the current user session token from the localstorage
        const token = localStorage.getItem('token');

        // If the token is not found the user is not logged in,
        // set the loading state to false as we will not fetch from
        // the db, set the user to null, and exit the function
        if(!token) {

            setLoading(false);
            setUser(null);
            return;

        }

        // We have a token in the browser so we will attempt to make a request
        // to fetch user data from the db
        try {

            // Make a API call to the get user info endpoint
            // Hit the endpoint: /api/user
            // Attach the bearer token with the request
            // to validate the user on the server
            const response = await fetch('/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            // If the request reuturns a 401 Unauthorized response
            // The user token is not valid and should no longer be stored
            // in the browser as they are not logged in
            if(!response.ok) {

                localStorage.removeItem('token');
                setLoading(false);
                return;

            }

            // If the response was successful the user has a valid token
            // and is logged in. Now extract the user info from the response
            // and store it into the user state
            const userInfo = await response.json();
            setUser(userInfo.data);

        }

        catch(error) {

            // Something bad happend and the user should not be logged in,
            // if there is a token in the browser remove it
            localStorage.removeItem('token');

        }

        finally {

            // When the user data is done being fetched,
            // set the loading to false as we are no longer
            // proccessing a requet
            setLoading(false);

        }

    };

    // Function to log a user into the website
    const login = async (data, navigate) => {

        // When making a request to the database set
        // loading to true to allow the site to know
        // we are in the process on fetching data
        setLoading(true);

        try {

            // Attempt to log the user in with the credentials
            // provided in the parameters by making an API call
            // to this endpoint: /api/login
            const response = await fetch('/api/login', { method: 'POST',  headers: {
                'Content-Type': 'application/json'
            } });

            // Fetch the result from the api call. This will have a messahe
            // attached letting us know we successfully logged in, or if any
            // errors have occured
            const result = await response.json();

            // If the response code wad not ok, the user failed to login
            // propagate the error message back to the component (i.e. login form)
            // to alert the user of what went wrong
            if(!response.ok) {
                throw new Error(result.message || 'Login failed');
            }

            // If the response was okay, that means the user provided good credentials
            // and should be logged in. Store the token provided in the response in
            // localstorage. This will be needed for most request while using the site
            localStorage.setItem('token', result.token);

            // At this point we also want to make sure we have all the user data,
            // so call the fetch user data to get a inital baseline
            await fetchUser();

            // The user is now authetricated and has a valid token, redirect them to the home
            // page which will be the main feed
            navigate('/home');

        }

        catch(error) {

            // If we get to this point something went wrong so log
            // the user out
            localStorage.removeItem('token');

        }

        finally {


            // When the request is done being made,
            // set the loading state back to false
            // allowing the app to know we are done fetching
            setLoading(false);

        }

        // Function to logout the user
        const logout = (navigate) => {
            
            // to log the user out we will 

        };

    };


};