import React, { useEffect, useState } from 'react';
import { Center, Box, Heading, FormControl, FormLabel, Input, FormErrorMessage, Button, Link, Text, useToast } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LOGIN } from "../../lib/routes";
import { useForm } from 'react-hook-form';
import { emailValidate } from '../../util/form-validate'; // Assuming you have email validation

export default function ForgotPassword() {
    
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    const toast = useToast();


    // Function to handle password reset submit

    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (data) => {
        
        try {

            // While we are processing the request, set loading to true
            setLoading(true);

            // Make a fetch request to the server to send the reset link
            const response = await fetch('/api/send-password-reset-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Fetch the response
            const resData = await response.json();

            // If the request was successful, show a success toast
            if(response.ok) {
                toast({
                    title: "Reset Link Sent",
                    description: resData.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: 'top'
                });

                // Reset the form
                reset();

                // Navigate to the login page
                navigate(`${LOGIN}?reset=true`);
            }

        }
        catch(error) {

            // If there was an error, show an error toast
            toast({
                title: "An error occurred.",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'top'
            });

        }

        // Set loading to false after the request is complete
        setLoading(false);
        
    };

    return (

        <Center w='100%' h='100vh'>

            <Box width="400px" maxW='400px' p='9' borderWidth='1px' borderRadius='lg'>

                <Heading mb="4" textAlign='center'>Reset Password</Heading>
                
                {/* Reset Pasword Form */}
                <form onSubmit={handleSubmit(handleResetPassword)}>

                    {/* Email Input */}
                    <FormControl py='2' isInvalid={errors.email}>
                        
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="Email" {...register('email', emailValidate)} />
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>

                    </FormControl>

                    <Button mt="4" size='md' w='full' type="submit" colorScheme='blue'>
                        Send Reset Link
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
