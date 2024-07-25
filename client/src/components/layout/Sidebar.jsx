import { Box, Button, ButtonGroup, Center, Stack, Code, Avatar, Divider, } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FOLLOWERS, FOLLOWING, PROTECTED } from "../../lib/routes";
import { useAuth } from '../../hooks/useAuth';
  
export default function Sidebar() {
    
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

            <Button as={Link} to={`${PROTECTED}/new-post`} colorScheme="green" w="full">
                New Post
            </Button>

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
  