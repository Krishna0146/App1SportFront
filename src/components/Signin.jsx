import {
    Input,
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftElement,
    Button,
    Box,
    Heading,
    VStack,
    Text,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { api } from "./actions/api";
import { useState } from "react";

export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleSignIn = async () => {
        setLoading(true); // Set loading state to true when starting sign-in
        try {
            const response = await axios.post(`${api}/signin`, { email, password });
            if (response.data.values) {
                console.log(response.data.values)
                sessionStorage.setItem('auth', JSON.stringify(response.data.values));
                navigate('/main'); // Redirect to profile or main page after sign-in
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
        } finally {
            setLoading(false); // Reset loading state regardless of success or failure
        }
    };

    return (
        <Box
            bgGradient="linear(to-r, teal.500, green.500)"
            minHeight="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
        >
            <Box
                p={8}
                maxWidth="400px"
                borderWidth={1}
                borderRadius={16}
                boxShadow="2xl"
                bg="white"
                animation="scale-up 0.3s ease-in-out"
            >
                <VStack spacing={6} align="stretch">
                    <Heading as="h2" size="lg" textAlign="center" color="teal.500">
                        Sign In
                    </Heading>

                    <FormControl>
                        <FormLabel color="teal.600">Email address</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <EmailIcon color="teal.500" />
                            </InputLeftElement>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                focusBorderColor="teal.500"
                                _hover={{ borderColor: "teal.400" }}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <FormLabel color="teal.600">Password</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <LockIcon color="teal.500" />
                            </InputLeftElement>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                focusBorderColor="teal.500"
                                _hover={{ borderColor: "teal.400" }}
                            />
                        </InputGroup>
                    </FormControl>

                    <Button
                        colorScheme="teal"
                        size="lg"
                        width="full"
                        mt={4}
                        isLoading={loading} // Disable and show loading state
                        loadingText="Signing In"
                        onClick={handleSignIn} // Call the correct function here
                    >
                        Submit
                    </Button>

                    <Box textAlign="center" mt={4}>
                        <ChakraLink
                            as={Link}
                            to="/forgot-password"
                            color="teal.500"
                            _hover={{ color: "teal.600", textDecoration: "underline" }}
                        >
                            Forgot Password?
                        </ChakraLink>
                    </Box>

                    <Box textAlign="center" mt={4}>
                        <Text fontSize="sm" color="gray.500">
                            By signing in, you agree to our{" "}
                            <ChakraLink as={Link} to="/privacy" color="teal.500">
                                Privacy Policy
                            </ChakraLink>{" "}
                            and{" "}
                            <ChakraLink as={Link} to="/terms" color="teal.500">
                                Terms of Service
                            </ChakraLink>.
                        </Text>
                    </Box>
                </VStack>
            </Box>
        </Box>
    );
};
