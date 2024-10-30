import React, { useEffect, useState } from 'react';
import { Box, Text, Stack, Circle } from '@chakra-ui/react';
import axios from 'axios';
import { api } from '../actions/api';

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const user = sessionStorage.auth ? JSON.parse(sessionStorage.auth) : null;

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const response = await axios.get(api + '/orders', {
                    params: { shopName: user.shopName, sellerName: user.sellerName }
                });
                console.log('Fetched Orders:', response.data); 
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [user]); 

    console.log('User:', user);
    console.log('Orders:', orders);

    return (
        <Box p={4}>
            {orders.length === 0 ? (
                <Text>No orders found for this user.</Text>
            ) : (
                orders.map((order, index) => {
                    const formattedDate = order.date ? new Date(order.date).toLocaleDateString() : 'Date not available';
                    const buyerName = order.buyerName || 'Buyer name not available';

                    return (
                        <Box key={index} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
                            <Stack spacing={2}>
                                <Text><strong>Date:</strong> {formattedDate}</Text>
                                <Text><strong>Buyer Name:</strong> {buyerName}</Text>
                                <Text><strong>Type:</strong> {order.type ? 'Refurbished' : 'New'}</Text>
                                <Text>
                                    <strong>Delivery:</strong> 
                                    <Circle
                                        size="10px"
                                        bg={order.delivery ? 'green.500' : 'red.500'}
                                        display="inline-block"
                                        ml={2}
                                    />
                                </Text>
                            </Stack>
                        </Box>
                    );
                })
            )}
        </Box>
    );
};

export default OrderDetails;
