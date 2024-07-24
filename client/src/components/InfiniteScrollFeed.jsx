import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Typography, CircularProgress, Card } from '@mui/material';
import PostCard from './PostCard';

export default function InfiniteScrollFeed({ apiEndpoint, userId }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPosts([]);
        setPage(1);
        setHasMore(true);
        fetchPosts(1);
    }, [apiEndpoint]);

    /* Function to fetch posts */
    const fetchPosts = async (pageNumber) => {
        if (loading) return; // Prevent simultaneous fetches
        setLoading(true);
        
        try {
            // Get the user login token from localstorage
            const token = localStorage.getItem('token');

            // Call the get feed api endpoint to get posts
            const response = await fetch(`${apiEndpoint}?page=${pageNumber}&limit=10`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // If the user is not logged throw a unauthorized error
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            
            // Get the posts in json form
            const data = await response.json();

            // If there are no more post to fetch set the has more state to false
            if (!data.posts || data.posts.length === 0) {
                setHasMore(false);
                return;
            }

            // Add the posts to the post state
            setPosts((prevPosts) => pageNumber === 1 ? data.posts : [...prevPosts, ...data.posts]);
        } 
        catch (error) {
            console.error('Error fetching posts:', error);
        } 
        finally {
            setLoading(false);
        }
    };

    // Function to increment to page by 1
    const fetchMoreData = () => {
        setPage((prevPage) => prevPage + 1);
    };

    // Handles the like post button 
    const handleLike = async (postId) => {
        try {
            // Get the user login token from the localstorage
            const token = localStorage.getItem('token');
            
            // Attempt to like the post
            const response = await fetch(`/api/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // If we were abel to like the post update the current posts state in the feed to relfect the new change
            if (response.ok) {
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post._id === postId ? { ...post, likes: [...post.likes, userId] } : post
                    )
                );
            }
        } 
        catch (error) {
            console.error('Error liking post:', error);
        }
    };

    // Function to handle unliking a post
    const handleUnlike = async (postId) => {
        try {
            // Get the user login token from the localstorage
            const token = localStorage.getItem('token');

            // Make a api call to try and unlike the post
            const response = await fetch(`/api/posts/${postId}/unlike`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // If we successfully unliked the post, update the current post state to reflect the changes
            if (response.ok) {
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post._id === postId ? { ...post, likes: post.likes.filter((like) => like !== userId) } : post
                    )
                );
            }
        } 
        catch (error) {
            console.error('Error unliking post:', error);
        }
    };

    // Function to handle deleting a post
    const handleDelete = async (postId) => {
        try {
            // Get the user login token from the localstorage
            const token = localStorage.getItem('token');

            // Make a api call to attempt to delete a post
            const response = await fetch(`/api/posts/${postId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // If the post was deleted successfully, remove the post from the current feed
            if (response.ok) {
                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
            }
        } 
        catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={loading && hasMore ? <CircularProgress /> : null}
                endMessage={<Typography variant="body2">You have seen all posts.</Typography>}
            >
                {posts.map((post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                        handleLike={handleLike}
                        handleUnlike={handleUnlike}
                        handleDelete={handleDelete}
                        userId={userId}
                    />
                ))}
            </InfiniteScroll>
        </Box>
    );
}
