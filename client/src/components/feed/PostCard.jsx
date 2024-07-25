import React from 'react';
import { Box, Avatar, Text, VStack, HStack, IconButton } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart, AiFillDelete } from 'react-icons/ai';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function PostCard({ post, handleLike, handleUnlike, handleDelete, userId }) {
  const isOwner = post.author._id === userId;
  const likedByUser = post.likes.includes(userId);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/protected/posts/${post._id}`);
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
        <HStack spacing={3}>
          <Avatar name={post.author.username} src={post.author.profilePic} />
          <Text fontWeight="bold">{post.author.username}</Text>
        </HStack>
        <Text>{post.content}</Text>
        <HStack spacing={3}>
          <IconButton
            aria-label="Like post"
            icon={likedByUser ? <AiFillHeart /> : <AiOutlineHeart />}
            onClick={handleLikeClick}
          />
          {isOwner && (
            <IconButton
              aria-label="Delete post"
              icon={<AiFillDelete />}
              onClick={handleDeleteClick}
            />
          )}
          <Text fontSize="sm" color="gray.500">
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}
