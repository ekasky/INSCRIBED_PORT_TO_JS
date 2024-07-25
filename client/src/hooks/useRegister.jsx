import { useState } from "react";
import { LOGIN } from "../lib/routes";
import { header } from "express/lib/request";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";


export function useRegister() {

    // Define state to keep track of the 
    // loaing state of the hook
    const [loading, setLoading] = useState(false);

    // Define state to keep track of the 
    // error messages
    const [errors, setErrors] = useState(null);

    // Define use navaiate to redirect users upon 
    // successful registration
    const navigate = useNavigate();

    // Use the toast hook to show response messages
    // to the user
    const toast = useToast();

    // define a function to call the register
    // api endpoint to attempt to register
    // a new user to the platform
    const register = async ({ first_name, last_name, username, email, password, redirectTo=LOGIN }) => {

        // WHile attempting to register a user
        // set the loading state to be true
        setLoading(true);

        try {

            // Make a API call to the register api
            // to attempt to sign a user up with
            // the provided user infomaton
            const response = await fetch('/api/register', {

                method: 'POST',

                headers: {

                    'Content-Type': 'application/json'

                },

                body: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    username: username,
                    password: password
                }

            });

            // Get the response data
            const data = await response.data;

            console.log(data);


            // If the response is 201 Created,
            // the user was successfully registered
            // so return a success toast message
            // and redirect to the login page
            if(response.status === 201) {

                toast({
                    message: 'User Registered Successfully',
                    description: data.message,
                    status: 'success',
                    position: 'top',
                    duration: 5000,
                    isClosable: true
                });

                navigate(redirectTo);
                
                setLoading(false);
                return true;

            }

            // If the user failed to register
            // display a toast message with a error
            // and return the errors that occured
            else {

                toast({
                    title: 'Account not created',
                    description: data.message,
                    status: 'error',
                    position: 'top',
                    duration: 5000,
                    isClosable: true
                });

                setErrors(data);

                setLoading(false);
                return false;

            }

        }  

        // If we get to this point something
        // wrong happend, display a general
        // error response
        catch(error) {

            toast({
                title: 'An Error Occured',
                description: 'User could not be registered. Please try again later',
                status: 'error',
                position: 'top',
                duration: 5000,
                isClosable: true
            });

            setErrors(data);
            setLoading(false);
            return false;

        }

    };

    return { register, loading, errors };

}