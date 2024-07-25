import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useToast, Box } from '@chakra-ui/react';
import PostCard from './PostCard';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function DiscoverFeed() {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { user, loading } = useAuth();
  const toast = useToast();

  const getDiscoverFeed = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/discover-feed?page=${page}&limit=10`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load posts');
      }

      const data = await response.json();

      if (data.posts.length < 10) {
        setHasMore(false);
      }

      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true
      });
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
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, likes: [...post.likes, user._id] } : post
          )
        );
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
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, likes: post.likes.filter((like) => like !== user._id) } : post
          )
        );
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
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
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




  useEffect(() => {
    if (!loading && user) {
      getDiscoverFeed();
    }
  }, [loading, user]);

  if (loading) {
    return <h4>Loading...</h4>;
  }

  return (
    <Box p={4}>
      <InfiniteScroll
        dataLength={posts.length}
        next={getDiscoverFeed}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
      >
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleDelete={handleDelete}
            userId={user ? user._id : ''}
          />
        ))}
      </InfiniteScroll>
    </Box>
  );
}
