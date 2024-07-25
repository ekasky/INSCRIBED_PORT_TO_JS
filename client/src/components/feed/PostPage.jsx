import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Spinner, Text, useToast } from '@chakra-ui/react';
import PostCard from './PostCard';
import { useAuth } from '../../hooks/useAuth';

export default function PostPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const toast = useToast();

  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user) {
      getPost(id);
    }
  }, [id, authLoading, user]);

  const getPost = async (postId) => {
    
    try {

        // set the post loading state to true
        setPostLoading(true);

        // get the token from local storage
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/posts/${postId}`, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            }
        });

        // Check if the response is not ok
        if (!response.ok) {
            throw new Error('Post not found');
        }

        // Get the data from the response
        const data = await response.json();
        setPost(data);

      // Check if the current user is following the author
      setIsFollowing(data.author.followers.includes(user._id));

    } 
    
    catch (error) {

        // Log the error to the console
        console.error('Error fetching post:', error);

        // Show a toast notification with the error message
        toast({
            title: 'Error fetching post',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    } 
    
    finally {

      setPostLoading(false);

    }
  };

  const handleLike = async (postId) => {

    try {

        // get the token from local storage
        const token = localStorage.getItem('token');

        // send a POST request to the server to like the post
        const response = await fetch(`/api/posts/${postId}/like`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
        });


        // Check if the response is ok
        if (response.ok) {
            
            setPost((prevPost) => ({
                ...prevPost,
                likes: [...prevPost.likes, user._id],
            }));

            toast({
                title: 'Post liked',
                description: 'You have liked the post.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
      }
      
    } 
    
    catch (error) {

      console.error('Error liking post:', error);

      toast({
        title: 'Error liking post',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });

    }

  };

  const handleUnlike = async (postId) => {


    try {

        // get the token from local storage
        const token = localStorage.getItem('token');

        // send a DELETE request to the server to unlike the post
        const response = await fetch(`/api/posts/${postId}/unlike`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
        });

        // Check if the response is ok
      if (response.ok) {
        
        // remove the user's id from the likes array
        setPost((prevPost) => ({
            ...prevPost,
            likes: prevPost.likes.filter((like) => like !== user._id),
        }));

        // show a toast notification
        toast({
            title: 'Post unliked',
            description: 'You have unliked the post.',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });

      }

    } 
    
    catch (error) {

        // Log the error to the console
        console.error('Error unliking post:', error);
        
        toast({
            title: 'Error unliking post',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    }

  };

  const handleDelete = async (postId) => {

    try {

        const token = localStorage.getItem('token');

        const response = await fetch(`/api/posts/${postId}/delete`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
        });

      if (response.ok) {

            // set the post to null
            setPost(null);

            // show a toast notification
            toast({
                title: 'Post deleted',
                description: 'The post has been deleted.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        }

    } 
    
    catch (error) {

        // Log the error to the console
        console.error('Error deleting post:', error);
        
        // Show a toast notification with the error message
        toast({
            title: 'Error deleting post',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    }
  };

  if (postLoading || authLoading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner />
        <Text>Loading...</Text>
      </Box>
    );
  }


  const handleFollow = async (authorId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/follow/${authorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsFollowing(true);
        toast({
          title: 'User followed',
          description: 'You have followed the user.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error following user:', error);
      toast({
        title: 'Error following user',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUnfollow = async (authorId) => {
    
    try {

        const token = localStorage.getItem('token');
        
        const response = await fetch(`/api/users/unfollow/${authorId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
    });

    if (response.ok) {

        setIsFollowing(false);
        
        toast({
            title: 'User unfollowed',
            description: 'You have unfollowed the user.',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
        
        }
    } 
    
    catch (error) {
      console.error('Error unfollowing user:', error);
      toast({
        title: 'Error unfollowing user',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };


  if (!post) {
    return (
      <Box p={4} textAlign="center">
        <Text>Post not found</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <PostCard
        post={post}
        userId={user._id}
        handleLike={handleLike}
        handleUnlike={handleUnlike}
        handleDelete={handleDelete}
      />
    </Box>
  );
}
