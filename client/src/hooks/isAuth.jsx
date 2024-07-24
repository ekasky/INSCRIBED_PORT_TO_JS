import { useEffect, useState } from "react"


export function useAuth() {

    /* Define State */
    const [loading, setLoading] = useState(false);
    const [user, setUser]       = useState(null);
    const [error, setError]     = useState(null);

    // Make a API call to attempt to get the user,
    // this will only return a user if the user is 
    // logged in so its fine to use to check auth
    // state
    useEffect(() => {

        const fetchUser = async () => {

            // While the request is processing
            // set the loading state of the true
            // to allow other compoents to know we
            // are checking the auth state currently
            setLoading(true);

            try {

                // Make an API call to the /api/user endpoint
                // and save the response. Make sure you pass the 
                // user auth token from localstroage to check 
                // the auth state of the token  
                const response = await fetch('/api/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // If we get to this point, no error had occured meaning 
                // the user is logged in, so save the user data
                setUser(response.data.user);

                // We are now done with the request so set the
                // loading state to be false letting other componets
                // know we are done fetching the user auth state
                setLoading(false);
                

            }

            catch(error) {

                // If there was an error, set the error state so
                // other components can use the error response
                setError(error.response ? error.response.data : 'An unexptected error has occured')

                // We are once again done processing the request
                // so set the loading state to false
                setLoading(false);

            }

        };

        // Call the fetch User function

    }, []);

    return { user: user, isLoading: loading }

}