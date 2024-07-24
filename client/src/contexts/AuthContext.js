import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create AuthContext
export const AuthContext = createContext();

// Create AuthProvider component

export const AuthProvider = ({ children }) => {

    // Define state
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        // Check if user is logged in
        const checkUser = async () => {

            // Get the token from local stroage
            const token = localStorage.getItem('token');

            // If there is no token set loading to be true and exit funtion
            if(!token) {
                setLoading(false);
                return;
            }

            // Fetch the user info
            try {

                // Make api call to get user info
                const response = await fetch('/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // If the response was bad remove the current token
                if (!response.ok) {
                    localStorage.removeItem('token');
                }

                // Set the user data
                const data = await response.json();
                setUser(data.user);
                
                


            }
            catch(error) {

                console.error('Failed to fetch user:', error);

            }

            finally {

                setLoading(false);
                
            }
        };

        checkUser();

    }, []);

    // Login function
    const login = async (data) => {
        
        // While logging in set the loading state to true

        setLoading(true);

        try {

            // Make api call to login
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Get the result from the call
            const result = await response.json();

            // If the response was not good throw error and do not log in
            if(!result) {
                throw new Error(result.message || 'Login failed');
            }

            // Set the login token and redirect to home
            localStorage.setItem('token', result.token);
            setUser(result.user);
            navigate('/dashboard');


        }

        catch(error) {

            console.error('Login error:', error);

        }

        finally {

            setLoading(false);

        }

    };

    // Logout function
    const logout = () => {

        localStorage.removeItem('token');
        setUser(null);
        navigate('/');

    };

    return (

        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>

    );
};
