import React from 'react';
import { Box, Avatar, Text, VStack, HStack, IconButton } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart, AiFillDelete } from 'react-icons/ai';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function PostCard({ post, handleLike, handleUnlike, handleDelete, userId }) {
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

    <Box
      p={4}
      mb={4}
      borderWidth={1}
      borderRadius="lg"
      cursor="pointer"
      onClick={handleCardClick}
      _hover={{ shadow: 'md' }}
    >

      <VStack align="start" spacing={4}>

        {/* Author username and profile image */}
        <HStack spacing={3}>

          <Avatar name={post.author.username} src={post.author.profilePic} />
          <Text fontWeight="bold">{post.author.username}</Text>

        </HStack>

        {/* Post content */}
        <Text>{post.content}</Text>
        
        {/* Post Actions */}
        <HStack spacing={3}>

          {/* Use the current like state to determine what version and function to call when showing like/unlike button */}
          <IconButton
            aria-label="Like post"
            icon={likedByUser ? <AiFillHeart /> : <AiOutlineHeart />}
            onClick={handleLikeClick}
          />

          {/* If the user is the owner of the post, show the delete button */}
          {isOwner && (
            <IconButton
              aria-label="Delete post"
              icon={<AiFillDelete />}
              onClick={handleDeleteClick}
            />

          )}

          {/* Show the time the post was created at */}
          <Text fontSize="sm" color="gray.500">
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </Text>

        </HStack>

      </VStack>

    </Box>
  );
}
