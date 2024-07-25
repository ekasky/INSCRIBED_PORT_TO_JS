import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  VStack,
  Text,
  Divider,
  useColorMode,
  Flex,
  IconButton
} from '@chakra-ui/react';
import { FaUserEdit, FaUsers, FaUserFriends, FaCompass, FaStream, FaPlusCircle, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { useLogout } from '../../hooks/useLogout';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { DISCOVER_FEED, LOGIN, SETTINGS } from '../../lib/routes';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = () => {

    // use the logout function from the uselogout hook
    const { logout, loading } = useLogout();

    // create a navigate function from the useNavigate hook
    const navigate = useNavigate();

    // use the auth state to get the user info
    const { user, isLoading, error } = useAuth();

    // get the userIngo from the useAuth hook
    useEffect(() => {
        if (!isLoading && !user) {
          navigate(LOGIN);
        }
      }, [isLoading, user, navigate]);
    

    const { colorMode } = useColorMode();
    const bgColor = { light: 'gray.100', dark: 'gray.900' };
    const textColor = { light: 'black', dark: 'white' };

    return (
        
        <Box
            w="250px"
            p="20px"
            bg={bgColor[colorMode]}
            color={textColor[colorMode]}
            h="100vh"
            position="fixed"
            top="0"
            left="0"
        >

            <VStack spacing={5} align="stretch">

                <Box textAlign="center">

                <Avatar size="xl" name={user?.username || ''} />

                <Text mt={2} fontSize="lg" fontWeight="bold">
                    {user?.username || 'UserName'}
                </Text>

                </Box>

                <Divider />

                <Button leftIcon={<FaUserEdit />} colorScheme="teal" variant="solid" as={RouterLink} to={SETTINGS}>
                Edit Settings
                </Button>

                <Button leftIcon={<FaCompass />} colorScheme="teal" variant="outline" as={RouterLink} to={DISCOVER_FEED}>
                Discover Feed
                </Button>

                <Button leftIcon={<FaStream />} colorScheme="teal" variant="outline">
                Follower Feed
                </Button>

                <Button leftIcon={<FaClipboardList />} colorScheme="teal" variant="outline">
                Your Posts
                </Button>

                <Button leftIcon={<FaPlusCircle />} colorScheme="teal" variant="solid">
                New Post
                </Button>

                <Button leftIcon={<FaUsers />} colorScheme="teal" variant="outline">
                Followers
                </Button>

                <Button leftIcon={<FaUserFriends />} colorScheme="teal" variant="outline">
                Following
                </Button>

            </VStack>

            <IconButton
                aria-label="Logout"
                icon={<FaSignOutAlt />}
                colorScheme="red"
                variant="solid"
                size="sm"
                position="absolute"
                bottom="10px"
                left="10px"
                onClick={logout}
                loading={loading}
            />

        </Box>
    );
};

export default Sidebar;
