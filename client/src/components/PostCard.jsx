import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Box, Avatar } from '@mui/material';
import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function PostCard ({ post, handleLike, handleUnlike, handleDelete, userId }) {
    
    /* Check if the user is the owner, and if they liked the post */
    const isOwner = post.author._id === userId;
    const likedByUser = post.likes.includes(userId);

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/post/${post._id}`);
    };

    const handleLikeClick = (event) => {
        event.stopPropagation();
        likedByUser ? handleUnlike(post._id) : handleLike(post._id);
    };

    const handleDeleteClick = (event) => {
        event.stopPropagation();
        handleDelete(post._id);
    };
    
    return (

        <Card sx={{ marginBottom: 2, cursor: 'pointer' }} onClick={handleCardClick}>

            <CardContent>

                {/* Author username and profile image */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                    
                    <Avatar alt={post.author.username} src={post.author.profilePic} />
                    
                    <Typography variant="h6" sx={{ marginLeft: 1 }}>
                        {post.author.username}
                    </Typography>

                </Box>

                {/* Post content */}
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    {post.content}
                </Typography>
                
                {/* Post Actions */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    
                    {/* Use the current like state to determine what version and function to call when showing like/unlike buton */}
                    <IconButton
                        color="primary"
                        onClick={handleLikeClick}
                    >
                        {likedByUser ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>

                    {/* If the user is the owner of the post, show the delete button */}
                    
                    {isOwner && (
                        <IconButton color="secondary" onClick={handleDeleteClick}>
                            <Delete />
                        </IconButton>
                    )}

                    {/* Show the time the post was created at */}
                    <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 1 }}>
                        {formatDistanceToNow(new Date(post.createdAt))} ago
                    </Typography>

                </Box>

            </CardContent>

        </Card>
    );
};
