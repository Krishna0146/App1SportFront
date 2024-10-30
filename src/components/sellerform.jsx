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
import { EmailIcon, LockIcon, InfoIcon, PhoneIcon, AtSignIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { api } from './actions/api';
import { Link, useNavigate } from 'react-router-dom';

export const SellerRegistration = () => {
  const [sellerName, setSellerName] = useState(''); // Changed from fullName to sellerName
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [location, setLocation] = useState('');
  const [key, setKey] = useState('');
  const nav = useNavigate();

  const registerSeller = async () => {
    const result = await axios.post(api + '/seller-registration', {
      sellerName,  
      email,
      password,
      phone,
      shopName,
      address,
      licenseNumber,
      location,
      key
    });
    if (result.data.message === "Email already registered") {
      alert("Email already exists");
    } else if (result.data.message === "sendall") {
      alert("Fill all fields here");
    } else {
      alert("Application submitted successfully");
      nav('/main');
    }
  };

  return (
    <Box
      bgGradient="linear(to-br, teal.300, blue.400)"
      p={8}
      maxWidth="500px"
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
          Seller Registration
        </Heading>

        <FormControl>
          <FormLabel color="teal.700">Seller Name</FormLabel> {/* Updated label */}
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <InfoIcon color="teal.400" />
            </InputLeftElement>
            <Input
              type="text"
              onChange={(e) => setSellerName(e.target.value)} // Updated to setSellerName
              placeholder="Enter your seller name"
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
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              focusBorderColor="teal.500"
              _hover={{ borderColor: "blue.400" }}
            />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel color="teal.700">Shop Name</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <InfoIcon color="teal.400" />
            </InputLeftElement>
            <Input
              type="text"
              onChange={(e) => setShopName(e.target.value)}
              placeholder="Enter your shop name"
              focusBorderColor="teal.500"
              _hover={{ borderColor: "blue.400" }}
            />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel color="teal.700">Address</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <AtSignIcon color="teal.400" />
            </InputLeftElement>
            <Input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              focusBorderColor="teal.500"
              _hover={{ borderColor: "blue.400" }}
            />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel color="teal.700">License Number</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <InfoIcon color="teal.400" />
            </InputLeftElement>
            <Input
              type="text"
              onChange={(e) => setLicenseNumber(e.target.value)}
              placeholder="Enter your license number"
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
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter your key"
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
          onClick={registerSeller}
          bgGradient="linear(to-r, teal.400, blue.500)"
          _hover={{
            bgGradient: "linear(to-r, teal.500, blue.600)",
            transform: "scale(1.05)",
          }}
          transition="all 0.3s ease"
        >
          Register
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
