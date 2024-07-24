import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, Box, Container, Grid, Link, Typography, TextField, Button, Alert } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link as ReactRouterLink, useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPasswordForm() {

    /* For Navigstion */
    const navigate = useNavigate();

    /* React Form Field */
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
    
    /* Define State */
    const [loading, setLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState('');
    const [responseCode, setResponseCode] = useState(0);
    
    // Get the token from the url
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const onSubmit = async (data) => {

        // While making the reset password request set the loading state to true
        setLoading(true);

        try {

            // Attempt to reset the password with the provided data and token
            const response = await fetch(`/api/reset-password?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data }),
            });

            // Get the response from the request
            const result = await response.json();

            // Set the response code
            setResponseCode(response.status);

            // If it was okay, show success message and navigate to login
            if (response.ok) {

                setServerMessage('Password reset successful! Please log in with your new password.');
                setTimeout(() => navigate('/'), 3000);

            } 
            
            else {

                setServerMessage(result.message || 'Password reset failed');
                
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
                    Reset Password
                </Typography>

                {/* Reset Password Form */}
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, minWidth: '300px' }}>
                    
                    {/* New Password Input */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="New Password"
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
                        {loading ? 'Resetting Password...' : 'Reset Password'}
                    </Button>

                    {/* Link to login */}
                    <Grid container justifyContent="flex-end">

                        <Grid item>

                            <Link variant="body2" component={ReactRouterLink} to="/login" sx={{ textDecoration: 'none' }}>
                                Remember your password? Sign in.
                            </Link>

                        </Grid>
                    </Grid>

                </Box>

            </Box>

        </Container>
    );
}
