import { Box, Button, ButtonGroup, Center, Stack, Code, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../lib/routes";
import { useAuth } from '../../hooks/useAuth';

export default function Sidebar() {
  return (
    
    <Box
        px='6'
        h='100vh'
        w='100%'
        maxW='300px'
        borderRight='1px solid'
        position='sticky'
        top='16'
        display={{ base: 'none', md: 'block' }}
    >   

    {/* Current User */}
    <CurrentUser />

    {/* Divider Bar */}
    <Box as='ul' borderBottom='2px solid' borderColor='blue.200' />

    {/* Folloing and Followers Buttons */}
    <Center mt='4'>
        <ButtonGroup spacing='2'>
          <Button>Followers</Button>
          <Button>Following</Button>
        </ButtonGroup>
      </Center>

    </Box>

  );
}

export const CurrentUser = () => {
  
     // Use the auth context to display the current user's profile
    const { user, loading } = useAuth();

    // Use the logout auth hook
    const { logout } = useAuth();

    // if the user is loading, display a message
    if(loading) return <p>Loading...</p>;

    // if now user is found, log the user out
    if(!user) {
        return null;
    }
    
    console.log(user);

    return (
        
            
        <Stack align='center' spacing='5' my='8'>

            {/* Avatar */}
            <Avatar size='xl' as={Link} to={`${PROTECTED}/profile/${user._id}`} name={user.username} _hover={{ cursor: 'pointer', opacity: '0.8' }} />

            {/* Username */}
            <Code>@{user.username}</Code>

            {/* Edit Profile Button */}
            <Button as={Link} to={`${PROTECTED}/profile/${user._id}`} colorScheme='blue' w='full'>Edit Profile</Button>

    </Stack>


  );
}