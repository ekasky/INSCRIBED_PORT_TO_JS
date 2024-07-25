import { useState } from "react";
import { Box, Button, ButtonGroup, Center, Stack, Code, Avatar, Divider, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Textarea, } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FOLLOWERS, FOLLOWING, PROTECTED } from "../../lib/routes";
import { useAuth } from '../../hooks/useAuth';
  
export default function Sidebar() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (

        <Box
            px="6"
            h="100vh"
            w="100%"
            maxW="300px"
            borderRight="1px solid"
            borderColor="green.700"
            position="sticky"
            top="16"
            display={{ base: 'none', md: 'block' }}
            bg="green.900"
            color="white"
        >

        {/* Current User */}
        <CurrentUser />
  
        {/* Divider Bar */}
        <Divider borderColor="green.700" />
  
        {/* Following and Followers Buttons */}
        <Center mt="4">

          <ButtonGroup spacing="2">

            <Button colorScheme="green" w="full" as={Link} to={FOLLOWERS}>Followers</Button>
            <Button colorScheme="green" w="full" as={Link} to={FOLLOWING}>Following</Button>

          </ButtonGroup>

        </Center>

        {/* New Post Button */}
        <Center mt="4">

            <Button onClick={onOpen} colorScheme="green" w="full">
                New Post
            </Button>

            <NewPostModal isOpen={isOpen} onClose={onClose} />

        </Center>

      </Box>

    );
}
  
export function CurrentUser() {
    
    const { user, loading } = useAuth();
    const { logout } = useAuth();
  
    if (loading) return <p>Loading...</p>;


    // log the user out if not found
    const handleLogout = async () => {
        await logout();
    };

    if(!user) {
        handleLogout();
        return;
    }
    
  
    return (

        <Stack align="center" spacing="5" my="8">
        
            {/* Avatar */}
            <Avatar
                size="xl"
                as={Link}
                to={`${PROTECTED}/profile/${user._id}`}
                name={user.username}
                _hover={{ cursor: 'pointer', opacity: '0.8' }}
            />
  
            {/* Username */}
            <Code>@{user.username}</Code>
  
            {/* Edit Profile Button */}
            <Button
                as={Link}
                to={`${PROTECTED}/profile/${user._id}`}
                colorScheme="green"
                w="full"
            >
                Edit Profile
            </Button>

        </Stack>
    );
}
  


function NewPostModal({ isOpen, onClose }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { user } = useAuth();
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    content: content,
                    user: user._id
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Post created successfully!');
                setContent(''); // Clear the form
                setTimeout(() => {
                    onClose();
                    setMessage('');
                }, 2000);
            } else {
                throw new Error(data.message || 'Error creating post');
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="green.800" color="white">
                <ModalHeader>Create a New Post</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <FormControl mt={4} isRequired>
                            <FormLabel>Content</FormLabel>
                            <Textarea 
                                name="content" 
                                placeholder="Content" 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </FormControl>
                        {message && <Box mt={4} color={message.includes('Error') ? 'red.300' : 'green.300'}>{message}</Box>}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} type="submit" isLoading={loading} isDisabled={!content.trim()}>
                            Post
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}