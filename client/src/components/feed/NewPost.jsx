import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {

      const token = localStorage.getItem('token');

      const response = await fetch('/api/post', {
        
        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },

        body: JSON.stringify({ content, hashtags }),

      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();
      
      toast({
        title: 'Post created',
        description: 'Your post has been created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate(`/protected/posts/${data._id}`);
    } 
    
    catch (error) {

      toast({
        title: 'Error creating post',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });

    } 
    
    finally {
      setIsLoading(false);
    }
  };

  return (

    <Box p={4} maxWidth="500px" mx="auto">
      
      <form onSubmit={handleSubmit}>
        
        <VStack spacing={4} align="stretch">
          
          <FormControl isRequired>
            <FormLabel>Content</FormLabel>
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            Create Post
          </Button>

        </VStack>

      </form>

    </Box>
  );
}
