import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from './actions/api';
import {
    Box,
    Heading,
    Text,
    Button,
    VStack,
    List,
    ListItem,
    ListIcon,
    Spinner,
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const BuyerProfile = () => {
    const [buyer, setBuyer] = useState(null);
    const [pendingSellers, setPendingSellers] = useState([]);
    const [approvedSellers, setApprovedSellers] = useState([]);
    const user = sessionStorage.auth ? JSON.parse(sessionStorage.auth) : null;

    useEffect(() => {
        const fetchBuyerProfile = async () => {
            if (user && user.email) {
                try {
                    const response = await axios.get(`${api}/buyer-profile/${user.email}`);
                    setBuyer(response.data);
                } catch (error) {
                    console.error('Error fetching buyer profile:', error);
                }
            }
        };

        fetchBuyerProfile();
    }, [user]);

    useEffect(() => {
        if (user && user.admin) {
            const fetchPendingSellers = async () => {
                try {
                    const response = await axios.get(`${api}/pending-sellers`);
                    setPendingSellers(response.data);
                } catch (error) {
                    console.error('Error fetching pending sellers:', error);
                }
            };

            fetchPendingSellers();
        }
    }, [user]);

    const approveSeller = async (sellerId) => {
        try {
            await axios.post(`${api}/approve-seller`, { id: sellerId });
            setApprovedSellers((prev) => [...prev, sellerId]); 
        } catch (error) {
            console.error('Error approving seller:', error);
        }
    };

    if (!user) {
        return (
            <Box textAlign="center" mt={10}>
                <Text fontSize="lg" color="gray.500">
                    Please sign in to check your account.
                </Text>
            </Box>
        );
    }

    return (
        <Box className="buyer-profile" p={5} bg="gray.50" borderRadius="md" boxShadow="md">
            {buyer ? (
                <VStack spacing={4} align="start">
                    <Heading as="h2" size="lg" color="teal.500">{buyer.fname}'s Profile</Heading>
                    <Text fontSize="md">Email: <strong>{buyer.email}</strong></Text>
                    <Text fontSize="md">Phone: <strong>{buyer.phone}</strong></Text>
                    <Text fontSize="md">Location: <strong>{buyer.location}</strong></Text>

                    {user.admin && (
                        <Box mt={5}>
                            <Heading as="h3" size="md" color="teal.400">Pending Seller Applications:</Heading>
                            {pendingSellers.length > 0 ? (
                                <List spacing={3} mt={3}>
                                    {pendingSellers.map((seller) => (
                                        <ListItem key={seller._id} bg="white" borderRadius="md" p={3} boxShadow="sm">
                                            <ListIcon as={CheckCircleIcon} color="teal.500" />
                                            <Text display="inline" fontWeight="semibold">{seller.sellerName} - {seller.shopName}</Text>
                                            <Button
                                                ml={4}
                                                colorScheme="teal"
                                                onClick={() => approveSeller(seller._id)}
                                                disabled={approvedSellers.includes(seller._id)}
                                            >
                                                {approvedSellers.includes(seller._id) ? 'Approved' : 'Approve'}
                                            </Button>
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Alert status="info" mt={3}>
                                    <AlertIcon />
                                    <Text>No pending applications.</Text>
                                </Alert>
                            )}
                        </Box>
                    )}
                </VStack>
            ) : (
                <Spinner size="xl" />
            )}
        </Box>
    );
};

export default BuyerProfile;
