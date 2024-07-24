import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Box, Typography, CircularProgress, Card } from '@mui/material';
import PostCard from './PostCard';

export default function InfiniteScrollFeed({ apiEndpoint, userId }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setPosts([]);
        setPage(1);
        setHasMore(true);
        fetchPosts(1);
    }, [apiEndpoint]);

    const fetchPosts = async (pageNumber) => {
        
        try {

            // Get the user token 
            const token = localStorage.getItem('token');

            // make api call to get feed
            const response = await fetch(`${apiEndpoint}?page=${pageNumber}&limit=10`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // If you are not logged in show unauthrized
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }

            const data = await response.json();

            // If there are no more posts to fetch set the has more state to false
            if (!data.posts || data.posts.length === 0) {
                setHasMore(false);
                return;
            }

            setPosts((prevPosts) => [...prevPosts, ...data.posts]);

        } 
        
        catch (error) {

            console.error('Error fetching posts:', error);

        }
    };

    const fetchMoreData = () => {

        setPage((prevPage) => prevPage + 1);
        fetchPosts(page + 1);

    };

    return (
        <Box sx={{ padding: 2 }}>

            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<CircularProgress />}
                endMessage={<Typography variant="body2">You have seen all posts.</Typography>}
            >

                {posts.map((post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                        handleLike={() => {}}
                        handleUnlike={() => {}}
                        handleDelete={() => {}}
                        userId={userId}
                    />
                ))}
                
            </InfiniteScroll>
        </Box>
    );
}
