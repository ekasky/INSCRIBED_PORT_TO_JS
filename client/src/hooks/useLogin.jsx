import { useToast } from '@chakra-ui/react';
import HOME from '../lib/routes';
import { body } from 'express-validator';
import { useNavigate } from 'react-router-dom';

export function useLogin() {

    /* Define State */
    const [loading, setLoading] = useState(false);

    /* Use the naviate hook to redirect users */
    const navigate = useNavigate();

    // Use the toast hook from charkra
    // this will be used to show messages
    // returned by the response
    const toast = useToast();
    
    // Define a function to login a user
    // by calling the /api/login endpoint
    const login = async({ username, password, redirectTo=HOME }) => {

        // while making the login request set the loading state
        // to true as the request is being processed
        setLoading(true);

        try {

            // Make a API call to try and
            // sign in the user
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            // Get the data from the response
            const data = await response.json();

            // check if the the response was successful
            // if they were set the toast to a success message
            // store the token in storage, and redirect to 
            // the home page
            if(response.ok) {

                toast({
                    title: 'Login Successful',
                    description: data.message,
                    status: 'success',
                    duration: 5000,
                    isClosable: true
                });

                localStorage.setItem('token', data.token);

                navigate(redirectTo);

                return true;

            }

            // If the response was not okay, set a error 
            // message in the toast

            else {

                toast({
                    title: 'Login Failed',
                    description: data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top'
                });

                return false;

            }

        }

        catch(error) {

            // Handle any unexptected errors
            // that may occur by setting a 
            // error message in the toast
            toast({
                title: 'An error occured',
                description: 'Server Error. Please try later.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });

            return false;

        }

        finally {

            // When we are done with the request
            // make sure we set the loading state to 
            // be false
            setLoading(false);

        }

    };

    return { login: login, isLoading: loading };

}