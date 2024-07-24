import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD } from '../lib/routes';

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const login = async ({ username, password, redirectTo = DASHBOARD }) => {

        // While making the request set the loading
        // state to true allowing other components to
        // know we are in the process of fetching
        // from the api
        setLoading(true);

        try {

            // Make the api call to attempt to log the user in
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            // Get the response data from the api call
            const data = await response.json();

            // If the response is okay, set the toast to be success,
            // set the token in localstroage, and redirect to the dashboard
            // page
            if (response.ok) {
                toast({
                    title: 'Login Successful',
                    description: data.message,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });

                localStorage.setItem('token', data.token);
                
                console.log('Navigating to:', redirectTo);
                
                setLoading(false);

                navigate(redirectTo);

                return true;

            } 
            
            // If there was a unsuccessful login attempt
            // do not log in the user and set the toast to
            // be an error
            else {

                toast({
                    title: 'Login Failed',
                    description: data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                });

                setLoading(false);
                return false;

            }
        } 
        
        // Catch any unexptected errors, set the toast to
        // be an error, and do not log the user in
        catch (error) {
            toast({
                title: 'An error occurred',
                description: 'Server Error. Please try later.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top',
            });

            setLoading(false);
            return false;
        }
    };

    return { login, isLoading: loading };
}
