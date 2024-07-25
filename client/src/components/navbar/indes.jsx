import { Button, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { DASHBOARD } from '../../lib/routes';

export default function Navbar() {

    return (

        <Flex
            shadow='sm'
            pos='fixed'
            width='full'
            borderTop='6px solid'
            borderTopColor='blue.400'
            height='16'
            zIndex='3'
            justify='center'
        >

            <Flex px='4' w='full' align='center' maxW='1200px'>

                <Link color='blue' fontWeight='bold' as={RouterLink} to={DASHBOARD}>Home</Link>

                <Button ml='auto' colorScheme='blue' size='sm'>Logout</Button>

            </Flex>

        </Flex>

    );

}