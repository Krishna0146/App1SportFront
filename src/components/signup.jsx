import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { EmailIcon, LockIcon, InfoIcon, PhoneIcon, AtSignIcon } from '@chakra-ui/icons'; // Use AtSignIcon as the location icon
import axios from 'axios';
import { api } from './actions/api';
import { Link, useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [fname, setFname] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [key, setKey] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const nav = useNavigate();

    const Signup = async () => {
        if (!fname || !email || !password || !phone || !location || !key) {
            alert("Please fill all fields.");
            return;
        }
        if (phone.length !== 10) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        setLoading(true); 
        try {
            const result = await axios.post(`${api}/signup`, { fname, email, password, phone, location, key });
            if (result.data.message === "already") {
                alert("Email already exists. Try signing in.");
                nav('/signin');
            } else {
                alert("Account created successfully!");
                nav('/signin');
            }
        } catch (error) {
            console.error("Error during sign up:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            bgGradient="linear(to-br, teal.300, blue.400)"
            p={8}
            maxWidth="400px"
            borderWidth={2}
            borderRadius={16}
            boxShadow="2xl"
            bg="white"
            m="auto"
            mt={10}
            transition="all 0.3s ease"
            _hover={{
                transform: "scale(1.05)",
                boxShadow: "dark-lg",
            }}
        >
            <VStack spacing={6} align="stretch">
                <Heading as="h2" size="lg" textAlign="center" color="teal.600">
                    Create Account
                </Heading>

                <FormControl>
                    <FormLabel color="teal.700">Full Name</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <InfoIcon color="teal.400" />
                        </InputLeftElement>
                        <Input
                            type="text"
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            placeholder="Enter your full name"
                            focusBorderColor="teal.500"
                            _hover={{ borderColor: "blue.400" }}
                        />
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel color="teal.700">Email Address</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <EmailIcon color="teal.400" />
                        </InputLeftElement>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            focusBorderColor="teal.500"
                            _hover={{ borderColor: "blue.400" }}
                        />
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel color="teal.700">Phone Number</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <PhoneIcon color="teal.400" />
                        </InputLeftElement>
                        <Input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number"
                            focusBorderColor="teal.500"
                            _hover={{ borderColor: "blue.400" }}
                        />
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel color="teal.700">Location</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <AtSignIcon color="teal.400" /> 
                        </InputLeftElement>
                        <Input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter your location"
                            focusBorderColor="teal.500"
                            _hover={{ borderColor: "blue.400" }}
                        />
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel color="teal.700">Key</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <AtSignIcon color="teal.400" /> 
                        </InputLeftElement>
                        <Input
                            type="text"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            placeholder="Remember key in case of changing password"
                            focusBorderColor="teal.500"
                            _hover={{ borderColor: "blue.400" }}
                        />
                    </InputGroup>
                </FormControl>

                <FormControl>
                    <FormLabel color="teal.700">Password</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <LockIcon color="teal.400" />
                        </InputLeftElement>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            focusBorderColor="teal.500"
                            _hover={{ borderColor: "blue.400" }}
                        />
                    </InputGroup>
                </FormControl>

                <Button
                    colorScheme="teal"
                    size="lg"
                    width="full"
                    isLoading={loading} // Loading state
                    onClick={Signup}
                    bgGradient="linear(to-r, teal.400, blue.500)"
                    _hover={{
                        bgGradient: "linear(to-r, teal.500, blue.600)",
                        transform: "scale(1.05)",
                    }}
                    transition="all 0.3s ease"
                >
                    Sign Up
                </Button>

                <Box textAlign="center" mt={4}>
                    <Text color="teal.600" fontSize="sm">
                        Already have an account?{" "}
                        <Button
                            as={Link}
                            to="/signin"
                            variant="link"
                            color="blue.400"
                            _hover={{ color: "blue.600" }}
                        >
                            Sign In
                        </Button>
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
};
