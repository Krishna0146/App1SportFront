import React from 'react';
import { Box, Button, Heading, VStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const First = () => {
  return (
    <Box
      bgGradient="linear(to-br, teal.300, blue.400)"
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
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <VStack spacing={6} align="stretch">
          <Heading as="h2" size="lg" textAlign="center" color="teal.600">
            Select Your Profile Type
          </Heading>

          <Text fontSize="md" textAlign="center" color="gray.600">
            Please choose one of the options below to get started.
          </Text>

          <VStack spacing={4} align="stretch">
            <Link to="/seller-registration">
              <Button colorScheme="teal" size="lg" width="full">
                Seller
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="blue" size="lg" width="full">
                Buyer
              </Button>
            </Link>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default First;
