import React, { useState } from 'react';
import { Center, Box, Heading, FormControl, FormLabel, Input, FormErrorMessage, Button, Link, Text, useToast } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LOGIN } from "../../lib/routes";
import { useForm } from 'react-hook-form';
import { passwordValidate } from '../../util/form-validate'; // Assuming you have password validation

export default function ResetPassword() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    // Function to handle password reset submit
    const handleResetPassword = async (data) => {
        
        try {

            // while we are processing the request, set loading to true
            setLoading(true);

            // get the token from the query params
            const searchParams = new URLSearchParams(window.location.search);
            const token = searchParams.get('token');

            // make a fetch request to the server to send the reset link
            const response = await fetch(`/api/reset-password?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // fetch the response
            const resData = await response.json();

            // if the request was successful, show a success toast
            if(response.ok) {
                toast({
                    title: "Password Reset",
                    description: resData.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: 'top'
                });

                // reset the form
                reset();

                // navigate to the login page
                navigate(LOGIN);
            }
            else {
                // if there was an error, show an error toast
                toast({
                    title: "Password Reset Error",
                    description: resData.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: 'top'
                });
            }

        }

        catch(error) {

            // if there was an error, show an error toast
            toast({
                title: "Password Reset Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'top'
            });

        }

        // set loading to false after the request is complete
        setLoading(false);

    };

    return (

        <Center w='100%' h='100vh'>

            <Box width="400px" maxW='400px' p='9' borderWidth='1px' borderRadius='lg'>

                <Heading mb="4" textAlign='center'>Reset Password</Heading>
                
                {/* Reset Password Form */}
                <form onSubmit={handleSubmit(handleResetPassword)}>

                    {/* Password Input */}
                    <FormControl py='2' isInvalid={errors.password}>

                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="New Password" {...register('password', passwordValidate)} />
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    
                    </FormControl>
    
                    {/* Reset Password Button */}  
                    <Button mt="4" size='md' w='full' type="submit" colorScheme='blue' isLoading={loading}>
                        Reset Password
                    </Button>

                </form>

                {/* Link to login */}
                <Text fontSize="xlg" align='center' mt='5'>

                    Remembered your password?{" "}
                    <Link as={RouterLink} to={LOGIN} color='blue.800' fontWeight='medium'>
                        Login here
                    </Link>

                </Text>

            </Box>

        </Center>
    );
}
