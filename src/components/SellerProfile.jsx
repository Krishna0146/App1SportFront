import React, { useState } from 'react';
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
import AddItem from './seller/AddProduct';
import UserItems from './seller/Products';
import OrderDetails from './seller/OrderManage';
import ReviewDisplay from './seller/Reviews';

const Header = () => {
    const [activeSection, setActiveSection] = useState('Products');
    const navigate = useNavigate();
    const user = sessionStorage.auth ? JSON.parse(sessionStorage.auth) : null;

    const handleSignOut = () => {
        sessionStorage.removeItem('auth');
        navigate('/signin');
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'Products':
                return (
                    <div>
                        <AddItem />
                        <UserItems />
                    </div>
                );
            case 'Order Management':
                return <OrderDetails />;
            case 'Reviews':
                return <ReviewDisplay />;
            case 'Help':
                return <div>Help Content Here</div>;
            default:
                return <div>Products Content Here</div>;
        }
    };

    return (
        <Box>
            <Box bgGradient="linear(to-r, blue.500, purple.500)" p={4}>
                <Flex alignItems="center">
                    <nav style={{ flex: 1, textAlign: 'center' }}>
                        {['Products', 'Order Management', 'Reviews', 'Help'].map((label) => (
                            <Text
                                key={label}
                                as="span"
                                fontSize="xl"
                                fontWeight="bold"
                                color="white"
                                cursor="pointer"
                                onClick={() => setActiveSection(label)}
                                className="nav-item"
                                mx={2}
                            >
                                {label}
                            </Text>
                        ))}
                    </nav>
                    <Spacer />
                    <Flex gap={4}>
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
                                    <Button colorScheme='blue' onClick={handleSignOut}>Sign Out</Button>
                                </PopoverFooter>
                            </PopoverContent>
                        </Popover>
                    </Flex>
                </Flex>
            </Box>

            <Box p={4}>
                {renderContent()} {/* Render the content based on the active section */}
            </Box>
        </Box>
    );
};

export default Header;
