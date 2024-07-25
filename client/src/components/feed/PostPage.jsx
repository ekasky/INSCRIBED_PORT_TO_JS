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
      setPostLoading(true);

      const token = localStorage.getItem('token');
      const response = await fetch(`/api/posts/${postId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Post not found');
      }

      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast({
        title: 'Error fetching post',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setPostLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

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
    } catch (error) {
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
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/posts/${postId}/unlike`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPost((prevPost) => ({
          ...prevPost,
          likes: prevPost.likes.filter((like) => like !== user._id),
        }));
        toast({
          title: 'Post unliked',
          description: 'You have unliked the post.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
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
        setPost(null);
        toast({
          title: 'Post deleted',
          description: 'The post has been deleted.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
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
