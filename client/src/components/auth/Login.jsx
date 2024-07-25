import React, { useEffect } from 'react';
import { Center, Box, Heading, FormControl, FormLabel, Input, FormErrorMessage, Button, Link, Text, useToast } from "@chakra-ui/react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { DASHBOARD, LOGIN, REGISTER } from "../../lib/routes";
import { useLogin } from "../../hooks/useLogin";
import { useForm } from 'react-hook-form';
import { usernameValidate, passwordValidate } from '../../util/form-validate';

export default function Login() {

    /* Use the custom login hook */
    const { login, isLoading } = useLogin();

    /* Use the useForm hook from react-hook-forms for input validation */
    const { register, handleSubmit, reset, formState: { errors }} = useForm();

    const toast = useToast();
    const [searchParams] = useSearchParams();

    // if coming from a successful registration, show a message
    useEffect(() => {
        if (searchParams.get('verified') === 'true') {
            toast({
                title: 'Account verified',
                description: 'Your account has been successfully verified.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        }
    }, [searchParams, toast]);

    /* Function to handle login submit */
    const handleLogin = async (data) => {
        
        const success = await login({ username: data.username, password: data.password, redirectTo: DASHBOARD });

        if(success) {
            reset();
        }

    };

    return (
        
        <Center w='100%' h='100vh'>

            <Box mx="1" maxW='md' p='9' borderWidth='1px' borderRaduis='lg'>

                <Heading mb="4" textAlign='center'>Login</Heading>

                <form onSubmit={handleSubmit(handleLogin)}>

                    {/* Username Input */}
                    <FormControl py='2' isInvalid={errors.username}>

                        <FormLabel>Username</FormLabel>
                        <Input type="text" placeholder="Username" {...register('username', usernameValidate)} />
                        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>

                    </FormControl>

                    {/* Password Input */}
                    <FormControl py='2' isInvalid={errors.password}>

                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="Password" {...register('password', passwordValidate)}/>
                        <FormErrorMessage>{ errors.password && errors.password.message }</FormErrorMessage>

                    </FormControl>

                    <Button mt="4" size='md' w='full' type="submit" colorScheme='blue' isLoading={isLoading} loadingText="Logging In">
                        Login
                    </Button>

                </form>

                {/* Link to register */}
                <Text fontSize="xlg" align='center' mt='5'>
                    Need an account?{" "}
                    <Link to={REGISTER} color='blue.800' fontWeight='medium'  >
                    Register here
                    </Link>

                </Text>

            </Box>

        </Center>

    );

}