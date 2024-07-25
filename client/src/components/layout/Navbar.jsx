import React from 'react';
import { Box, Flex, HStack, Input, Button, useColorModeValue, Link } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useLogout } from '../../hooks/useLogout';
import { Link as RouterLink} from 'react-router-dom';
import { DASHBOARD } from '../../lib/routes';

export default function Navbar() {

    const { logout, loading } = useLogout();

    return (

        <Box bg='green.900' px={4}>

            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                
                <HStack spacing={8} alignItems={'center'}>
                
                    <Link as={RouterLink} to={DASHBOARD} color='white' >
                        Dashboard
                    </Link>

                </HStack>

                <HStack spacing={8} alignItems={'center'}>

                    <Input
                        placeholder="Search"
                        size="md"
                        variant="filled"
                        color="white"
                        bg='green.700'
                        _placeholder={{ color: 'gray.200' }}
                        _hover={{ bg: 'green.700' }}
                    />

                </HStack>

                <HStack spacing={8} alignItems={'center'}>

                    <Button colorScheme="red" variant="solid" onClick={logout} isLoading={loading}>
                        Logout
                    </Button>

                </HStack>

            </Flex>

        </Box>
    );
};
