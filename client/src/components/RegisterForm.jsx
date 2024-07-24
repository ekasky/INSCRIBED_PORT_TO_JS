import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, Box, Container, Grid, Link, Typography, TextField, Button } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    
    const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm({ mode: 'onChange' });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState('');

    const onSubmit = async (data) => {
        
        // While making the registration request set the loading state to true
        setLoading(true);

        try {
            // Attempt to register the user with the provided data
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Get the response from the request
            const result = await response.json();
            console.log(result);

            // If it was okay, navigate to the login page
            if (response.ok) {

                setServerMessage('Registration successful! Please check your email to verify your account.');
                navigate('/');

            } 
            
            else {

                setServerMessage(result.message || 'Registration failed');
            
                // Set any conflict messages that might occur
                if (result.errors && Array.isArray(result.errors)) {

                    result.errors.forEach(error => {

                        if (error.msg === 'Username is taken') {
                            setError('username', { 
                                type: 'manual', 
                                message: 'This username is already taken'
                            });
                        }

                        if (error.msg === 'Email is taken') {
                            setError('email', { 
                                type: 'manual', 
                                message: 'This email is already registered' 
                            });
                        }

                    });
                }

            }
            
        } 
        
        catch (error) {

            setServerMessage('An error occurred. Please try again later.');

        } 
        
        finally {

            setLoading(false);

        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Form Icon */}
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>

                {/* Form Title */}
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>

                {/* Registration Form */}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    {/* First Name Input */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="given-name"
                        {...register('firstName', {
                            required: 'First name required',
                            maxLength: {
                                value: 50,
                                message: 'First name too long',
                            },
                            pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: 'First name must be alphabetic',
                            },
                        })}
                        error={!!errors.firstName}
                        helperText={errors.firstName ? errors.firstName.message : ''}
                    />

                    {/* Last Name Input */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        {...register('lastName', {
                            required: 'Last name required',
                            maxLength: {
                                value: 50,
                                message: 'Last name too long',
                            },
                            pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: 'Last name must be alphabetic',
                            },
                        })}
                        error={!!errors.lastName}
                        helperText={errors.lastName ? errors.lastName.message : ''}
                    />

                    {/* Email Input */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        {...register('email', {
                            required: 'Email required',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Invalid email address',
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ''}
                    />

                    {/* Username Input */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        {...register('username', {
                            required: 'Username required',
                            maxLength: {
                                value: 50,
                                message: 'Username too long',
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: 'Username must be alphanumeric',
                            },
                        })}
                        error={!!errors.username}
                        helperText={errors.username ? errors.username.message : ''}
                    />

                    {/* Password Input */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        {...register('password', {
                            required: 'Password required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters long',
                            },
                            maxLength: {
                                value: 64,
                                message: 'Password cannot exceed 64 characters',
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                    />
                    
                    {/* Display any server message */}
                    {serverMessage && (
                        <Typography color="error" variant="body2" align="center">
                            {serverMessage}
                        </Typography>
                    )}
                    
                    {/* Form Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading || !isValid}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>

                    {/* Link to login */}
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link variant="body2" component={ReactRouterLink} to="/login" sx={{ textDecoration: 'none' }}>
                                Already have an account? Sign in.
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
