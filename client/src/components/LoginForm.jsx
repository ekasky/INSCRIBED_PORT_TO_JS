import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, Box, Container, Grid, Link, Typography, TextField, Button, Alert } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';

export default function LoginForm() {

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState('');

    const onSubmit = async (data) => {
        
        // While making the login requrst set the loading state to true
        setLoading(true);

        try {

            // Attempt to log the user in with the credentials
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Get the response from the request
            const result = await response.json();

            // If it was okay, sign in the user
            if (response.ok) {

                setServerMessage('Login successful!');
                localStorage.setItem('token', result.token);
                navigate('/home');

            } 
            
            else {

                setServerMessage(result.message || 'Login failed');

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
                    Sign in
                </Typography>

                {/* Login Form */}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                   
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
                        autoComplete="current-password"
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
                    
                    {/* Disaply any server message */}
                    {serverMessage && (
                        <Alert severity='error'>{serverMessage}</Alert>
                    )}
                    
                    {/* Form Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading || !isValid}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    {/* Links to reset password and register */}
                    <Grid container>

                        <Grid item xs>
                            
                            <Link variant="body2" component={ReactRouterLink} to="/forgot-password" sx={{ textDecoration: 'none' }}>
                                Forgot Password
                            </Link>

                        </Grid>

                        <Grid item>

                            <Link variant="body2" component={ReactRouterLink} to="/register" sx={{ textDecoration: 'none' }}>
                                Need an account? Sign up.
                            </Link>

                        </Grid>

                    </Grid>

                </Box>

            </Box>

        </Container>
    );
}
