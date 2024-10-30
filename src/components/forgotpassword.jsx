import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
} from '@chakra-ui/react';
import { api } from './actions/api';
import axios from 'axios';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [key, setKey] = useState(''); 

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const res = await axios.post(api + '/forgot-password', { email, password, key });
      if (res.data.message === "success") {
        alert("Data uploaded");
        setEmail('')
        setPassword('')
        setKey('')
      } else {
        alert("Email or key are mismatched check once");
        setEmail('')
        setPassword('')
        setKey('')
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading as="h3" size="lg" mb={4} textAlign="center">
        Forgot Password
      </Heading>
      <Text mb={4} textAlign="center">
        Enter your email here to reset
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" isRequired mb={4}>
          <FormLabel>Email Address:</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your-email@example.com"
          />
        </FormControl>
        <FormControl id="key" isRequired mb={4}> {/* New field for key */}
          <FormLabel>Key:</FormLabel>
          <Input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter your key"
          />
        </FormControl>
        <FormControl id="password" isRequired mb={4}>
          <FormLabel>New Password:</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="new password"
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          width="full"
        >
          Reset Password
        </Button>
      </form>
    </Box>
  );
};

export default ForgotPasswordForm;
