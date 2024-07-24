import { Center, Box, Heading, FormControl, FormLabel, Input, FormErrorMessage, Button, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { LOGIN, REGISTER } from "../../lib/routes";

export default function Login() {

    return (
        
        <Center w='100%' h='100vh'>

            <Box mx="1" maxW='md' p='9' borderWidth='1px' borderRaduis='lg'>

                <Heading mb="4" textAlign='center'>Login</Heading>

                <form onSubmit={() => {}}>

                    {/* Username Input */}
                    <FormControl py='2' isInvalid={true}>

                        <FormLabel>Username</FormLabel>
                        <Input type="text" placeholder="Username" />
                        <FormErrorMessage>Username is required</FormErrorMessage>

                    </FormControl>

                    {/* Password Input */}
                    <FormControl py='2' isInvalid={true}>

                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="Password" />
                        <FormErrorMessage>Password is required</FormErrorMessage>

                    </FormControl>

                    <Button mt="4" size='md' w='full' type="submit" colorScheme='blue' isLoading={true} loadingText="Logging In">
                        Login
                    </Button>

                </form>

                {/* Link to register */}
                <Text fontSize="xlg" align='center' mt='5'>
                    Need an account?{" "}
                    <Link to={REGISTER} color='blue.800' fontWeight='medium'  >
                    Register here
                    </Link>

                </Text>

            </Box>

        </Center>

    );

}