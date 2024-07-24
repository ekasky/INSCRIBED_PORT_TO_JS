import { useEffect, useState } from "react";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        // Make a request to the api to the user info,
        // if it returns a success that means the token 
        // provided is valid and the user is logged in
        const response = await fetch('/api/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Get the response data that will be used
        // to set the user state
        const data = await response.json();

        if (response.ok) {

          setUser(data.user);

        } 
        
        else {

          setError(data.message);

        }
      } 
      
      catch (error) {

        setError(error.message);

      } 
      
      finally {

        setLoading(false);

      }
    };

    fetchUser();

  }, []);

  return { user, isLoading: loading, error };
}
