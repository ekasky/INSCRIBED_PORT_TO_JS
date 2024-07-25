import React, { useState } from 'react';
import { Center, Box, Heading, FormControl, FormLabel, Input, FormErrorMessage, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../lib/routes";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useLogout } from '../../hooks/useLogout';

export default function Settings() {

    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    const toast = useToast();

    // use the auth state from auth hook to get the user's info
    const { user } = useAuth();

    // use the logout function from the useLogout hook
    const { logout, loading: logoutLoading } = useLogout();

    // Function to handle form submit

    const [loading, setLoading] = useState(false);

    const handleEditSettings = async (data) => {

        try {

            // setLoading to true while the request is being made
            setLoading(true);

            // Make the request to the server
            const response = await fetch(`/api/user/update/${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(data),
            });

            // Parse the response
            const resData = await response.json();
            
            console.log(resData)

            // If the response is successful, show a success toast
            if (response.ok) {
                toast({
                    title: "Settings Updated",
                    description: "Your settings have been updated successfully.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: 'top'
                });
            }

            else  {

                // If the response is not successful, show an error toast
                toast({
                    title: "Error",
                    description: resData.error,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: 'top'
                });

            }

        }
        
        catch(error) {


            // If there is an error, show an error toast
            toast({
                title: "Error",
                description: "An error occurred. Please try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'top'
            });

        }

        // Reset the form
        reset();

        // Set loading to false
        setLoading(false);
        
    };

    // Function to handle logout
    const handleLogout = async () => {

        await logout();
        navigate(LOGIN);
    };

    // Function to handle account deletion
    const handleDeleteAccount = async () => {
        
    };

    return (
        <Center w='100%' h='100vh'>

            <Box width="400px" maxW='400px' p='9' borderWidth='1px' borderRadius='lg'>

                <Heading mb="4" textAlign='center'>Edit Settings</Heading>
                
                {/* Edit Settings Form */}
                <form onSubmit={handleSubmit(handleEditSettings)}>

                    {/* First Name Input */}
                    <FormControl py='2' isInvalid={errors.firstName}>
                        
                        <FormLabel>First Name</FormLabel>
                        <Input type="text" placeholder="First Name" {...register('firstName')} />
                        <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
                    
                    </FormControl>
                    
                    {/* Last Name Input */}
                    <FormControl py='2' isInvalid={errors.lastName}>

                        <FormLabel>Last Name</FormLabel>
                        <Input type="text" placeholder="Last Name" {...register('lastName')} />
                        <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
                    
                    </FormControl>
                    
                    {/* Username Input */}
                    <FormControl py='2' isInvalid={errors.username}>

                        <FormLabel>Username</FormLabel>
                        <Input type="text" placeholder="Username" {...register('username')} />
                        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                    
                    </FormControl>
                    
                    {/* Profile Picture Input */}
                    <FormControl py='2' isInvalid={errors.profilePic}>

                        <FormLabel>Profile Picture URL</FormLabel>
                        <Input type="url" placeholder="Profile Picture URL" {...register('profilePic')} />
                        <FormErrorMessage>{errors.profilePic && errors.profilePic.message}</FormErrorMessage>
                   
                    </FormControl>
                    
                    {/* Current Password Input */}
                    <FormControl py='2' isInvalid={errors.currentPassword}>

                        <FormLabel>Current Password</FormLabel>
                        <Input type="password" placeholder="Current Password" {...register('currentPassword')} />
                        <FormErrorMessage>{errors.currentPassword && errors.currentPassword.message}</FormErrorMessage>
                    
                    </FormControl>
                    
                    {/* New Password Input */}
                    <FormControl py='2' isInvalid={errors.newPassword}>

                        <FormLabel>New Password</FormLabel>
                        <Input type="password" placeholder="New Password" {...register('newPassword')} />
                        <FormErrorMessage>{errors.newPassword && errors.newPassword.message}</FormErrorMessage>
                   
                    </FormControl>
                    
                    <Button mt="4" size='md' w='full' type="submit" colorScheme='blue' isLoading={loading}>
                        Save Changes
                    </Button>

                </form>

                {/* Logout Button */}
                <Button mt="4" size='md' w='full' colorScheme='red' onClick={handleLogout}>
                    Logout
                </Button>

                {/* Delete Account Button */}
                <Button mt="4" size='md' w='full' colorScheme='red' variant='outline' onClick={handleDeleteAccount}>
                    Delete Account
                </Button>

            </Box>

        </Center>
    );
}
