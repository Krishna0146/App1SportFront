import React from 'react';
import {
  Box,
  Flex,
  Text,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  const navigate = useNavigate();
  const user = sessionStorage.auth ? JSON.parse(sessionStorage.auth) : null; 
  

  return (
    <Box bgGradient="linear(to-r, blue.500, purple.500)" p={4}>
      <Flex alignItems="center">
        <nav style={{ flex: 1, textAlign: 'center' }}>
          <Text
            as="span"
            fontSize="xl"
            fontWeight="bold"
            color="white"
            cursor="pointer"
            onClick={() => navigate('/products')}
            className="nav-item"
          >
            Products
          </Text>
          <Text
            as="span"
            fontSize="xl"
            fontWeight="bold"
            color="white"
            cursor="pointer"
            onClick={() => navigate('/order-management')}
            className="nav-item"
          >
            Order Management
          </Text>
          <Text
            as="span"
            fontSize="xl"
            fontWeight="bold"
            color="white"
            cursor="pointer"
            onClick={() => navigate('/reviews')}
            className="nav-item"
          >
            Reviews
          </Text>
        </nav>
        <Spacer />
        <Flex gap={4}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="white"
            cursor="pointer"
            onClick={() => navigate('/help')}
            className="nav-item"
          >
            Help
          </Text>
          <Popover>
            <PopoverTrigger>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="white"
                cursor="pointer"
                className="nav-item"
              >
                Account
              </Text>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>{user ? `${user.fname || user.fullName}` : "User"}</PopoverHeader>
              <PopoverBody>
                {user ? (
                  <Box>
                    <Text>Email: {user.email}</Text>
                    <Text>Type: {user.admin ? 'Buyer' : 'Seller'}</Text>
                  </Box>
                ) : (
                  <Text>No user information available</Text>
                )}
              </PopoverBody>
              <PopoverFooter>
                <Button colorScheme='blue' onClick={() => {/* Add sign out functionality */}}>Sign Out</Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
