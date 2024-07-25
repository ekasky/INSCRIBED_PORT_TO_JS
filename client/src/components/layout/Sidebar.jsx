import React from 'react';
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

const Sidebar = () => {

    // use the logout function from the uselogout hook
    const { logout, loading } = useLogout();

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
        >

            <VStack spacing={5} align="stretch">

                <Box textAlign="center">

                <Avatar size="xl" name="User Name" />

                <Text mt={2} fontSize="lg" fontWeight="bold">
                    UserName
                </Text>

                </Box>

                <Divider />

                <Button leftIcon={<FaUserEdit />} colorScheme="teal" variant="solid">
                Edit Settings
                </Button>

                <Button leftIcon={<FaCompass />} colorScheme="teal" variant="outline">
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
