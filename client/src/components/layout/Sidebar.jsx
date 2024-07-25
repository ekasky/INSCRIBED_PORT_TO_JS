import React from 'react';
import {
  Avatar,
  Box,
  Button,
  VStack,
  Text,
  Divider,
  useColorMode,
} from '@chakra-ui/react';
import { FaUserEdit, FaUsers, FaUserFriends } from 'react-icons/fa';

const Sidebar = () => {
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
          <Avatar size="xl" name="User Name" src="https://bit.ly/broken-link" />
          <Text mt={2} fontSize="lg" fontWeight="bold">
            UserName
          </Text>
        </Box>
        <Divider />
        <Button leftIcon={<FaUserEdit />} colorScheme="teal" variant="solid">
          Edit Settings
        </Button>
        <Button leftIcon={<FaUsers />} colorScheme="teal" variant="outline">
          Followers
        </Button>
        <Button leftIcon={<FaUserFriends />} colorScheme="teal" variant="outline">
          Following
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;
