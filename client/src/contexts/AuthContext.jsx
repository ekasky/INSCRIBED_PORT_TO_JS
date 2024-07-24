import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            
            // Get the use token from localstrage
            const token = localStorage.getItem('token');
            
            // If not found, exit function
            if (!token) {
                setLoading(false);
                return;
            }

            try {

                // Make api call to get user info
                const response = await fetch('/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // If the info was not reterived successfully, remove the login token

                if (!response.ok) {
                    localStorage.removeItem('token');
                    setLoading(false);
                    return;
                }

                // Get the user data
                const data = await response.json();
                setUser(data.user);

            } 
            
            catch (error) {

                console.error('Failed to fetch user:', error);
                
            } 
            
            finally {

                setLoading(false);

            }

        };

        checkUser();

    }, []);

    const login = async (data, navigate) => {

        setLoading(true);

        try {

            // Make API call to log user in
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            // Get the results from the login i.e the token
            const result = await response.json();

            // If the response was bad do not log the user in
            if (!response.ok) {
                throw new Error(result.message || 'Login failed');
            }

            // Add the token to localstroage, and naviagte to home
            localStorage.setItem('token', result.token);
            setUser(result.user);
            navigate('/home');

        } 
        catch (error) {

            console.error('Login error:', error);
            throw error;
            
        } 
        finally {

            setLoading(false);

        }
    };

    const logout = (navigate) => {
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
