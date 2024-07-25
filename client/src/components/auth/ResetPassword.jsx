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
        console.log(data);
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
