import { useState, useEffect } from "react";
import { Center, Box, Heading, FormControl, FormLabel, Input, FormErrorMessage, Button, Link, Text, Alert } from "@chakra-ui/react";
import { Form, Link as RouterLink, useNavigate } from "react-router-dom";
import { LOGIN } from "../../lib/routes";
import { useRegister } from "../../hooks/useRegister";
import { useForm } from 'react-hook-form';
import { firstNameValidate, lastNameValidate, usernameValidate, passwordValidate, emailValidate } from '../../util/form-validate';

export default function Register() {
    /* Use the custom register hook */
    const { register, loading, errors: apiErrors } = useRegister();


    /* Use the useForm hook from react-hook-forms for input validation */
    const { register: registerField, handleSubmit, reset, setError, formState: { errors: formErrors }} = useForm();

    /* Function to handle register submit */
    const handleRegister = async (data) => {
        const result = await register({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            username: data.username,
            password: data.password,
            redirectTo: LOGIN
        });
        
    };

    useEffect(() => {

        console.log(apiErrors);

        if (apiErrors) {
            Object.keys(apiErrors).forEach(key => {
                setError(key, {
                    type: "manual",
                    message: apiErrors[key]
                });
            });
        }
    }, [apiErrors, setError]);

    return (
        <Center w='100%' h='100vh'>
            <Box mx="1" maxW='md' p='9' borderWidth='1px' borderRadius='lg'>
                <Heading mb="4" textAlign='center'>Register</Heading>
                <form onSubmit={handleSubmit(handleRegister)}>
                    {/* First Name Input */}
                    <FormControl py='2' isInvalid={formErrors.first_name}>
                        <FormLabel>First Name</FormLabel>
                        <Input type="text" placeholder="First Name" {...registerField('first_name', firstNameValidate)} />
                        <FormErrorMessage>{formErrors.first_name && formErrors.first_name.message}</FormErrorMessage>
                    </FormControl>

                    {/* Last Name Input */}
                    <FormControl py='2' isInvalid={formErrors.last_name}>
                        <FormLabel>Last Name</FormLabel>
                        <Input type="text" placeholder="Last Name" {...registerField('last_name', lastNameValidate)} />
                        <FormErrorMessage>{formErrors.last_name && formErrors.last_name.message}</FormErrorMessage>
                    </FormControl>

                    {/* Email Input */}
                    <FormControl py='2' isInvalid={formErrors.email || apiErrors}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="Email" {...registerField('email', emailValidate)} />
                        <FormErrorMessage>{formErrors.email && formErrors.email.message}</FormErrorMessage>
                        <FormErrorMessage>{apiErrors && 'Email taken'}</FormErrorMessage>
                    </FormControl>

                    {/* Username Input */}
                    <FormControl py='2' isInvalid={formErrors.username || apiErrors}>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" placeholder="Username" {...registerField('username', usernameValidate)} />
                        <FormErrorMessage>{formErrors.username && formErrors.username.message}</FormErrorMessage>
                        <FormErrorMessage>{apiErrors && 'Username taken'}</FormErrorMessage>
                    </FormControl>

                    {/* Password Input */}
                    <FormControl py='2' isInvalid={formErrors.password}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="Password" {...registerField('password', passwordValidate)} />
                        <FormErrorMessage>{formErrors.password && formErrors.password.message}</FormErrorMessage>
                    </FormControl>

                    {/* Display API errors */}
                    

                    <Button mt="4" size='md' w='full' type="submit" colorScheme='blue' isLoading={loading} loadingText="Registering">
                        Register
                    </Button>
                </form>

                {/* Link to login */}
                <Text fontSize="xlg" align='center' mt='5'>
                    Already have an account?{" "}
                    <Link as={RouterLink} to={LOGIN} color='blue.800' fontWeight='medium'>
                        Login here
                    </Link>
                </Text>
            </Box>

        </Center>
    );
}
