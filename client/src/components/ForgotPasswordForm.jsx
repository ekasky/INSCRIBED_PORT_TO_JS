import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert,     Avatar, Box, Container, Grid, Link, Typography, TextField, Button } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link as ReactRouterLink } from 'react-router-dom';

export default function ForgotPasswordForm() {

    const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm({ mode: 'onChange' });
    const [loading, setLoading] = useState(false);
    const [responseCode, setResponseCode] = useState(0);
    const [serverMessage, setServerMessage] = useState('');

    const onSubmit = async (data) => {
        
        // While making the forgot password request set the loading state to true
        setLoading(true);

        try {

            // Attempt to send the password reset email with the provided data
            const response = await fetch('/api/send-password-reset-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Get the response from the request
            const result = await response.json();

            // Set the response code
            setResponseCode(response.status);

            // If it was okay, show success message
            if (response.ok) {

                setServerMessage('Password reset email sent! Please check your inbox.');

            } 
            
            else {
                
                setServerMessage(result.message || 'Password reset failed');
                
                // Set any conflict messages that might occur
                if (result.errors && Array.isArray(result.errors)) {
                    result.errors.forEach(error => {
                        if (error.msg === 'Email not found') {
                            setError('email', { 
                                type: 'manual', 
                                message: 'This email is not registered' 
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
                    Forgot Password
                </Typography>

                {/* Forgot Password Form */}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, minWidth: '300px' }}>
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
                    
                    {/* Display any server message */}
                    {serverMessage && (
                        <Alert severity={responseCode === 200 ? 'success' : 'error'}>{serverMessage}</Alert>
                    )}
                    
                    {/* Form Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading || !isValid}
                    >
                        {loading ? 'Sending...' : 'Reset Password'}
                    </Button>

                    {/* Link to login */}
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link variant="body2" component={ReactRouterLink} to="/" sx={{ textDecoration: 'none' }}>
                                Remember your password? Sign in.
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
