import React, { useState, useEffect } from 'react';
import {
    Box,
    Image,
    Text,
    Card,
    CardBody,
    CardHeader,
} from '@chakra-ui/react';
import axios from 'axios';
import { api } from '../actions/api';

const UserItems = () => {
    const user = sessionStorage.auth ? JSON.parse(sessionStorage.auth) : null;
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            if (user) {
                try {
                    const res = await axios.get(api + '/user-items', {
                        params: {
                            shopName: user.shopName,
                            email: user.email,
                        },
                    });
                    setItems(res.data);
                } catch (error) {
                    console.error('Error fetching user items:', error);
                }
            }
        };

        fetchItems();
    }, [user]);

    const calculateDiscountedPrice = (originalPrice, discount) => {
        return originalPrice - (originalPrice * discount / 100);
    };

    return (
        <Box p={4} display="flex" flexWrap="wrap" justifyContent="center">
            {items.map((item, index) => (
                <Card key={index} width="250px" m={2} borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <CardHeader>
                        <Text fontSize="xl" fontWeight="bold">{item.itemName}</Text>
                    </CardHeader>
                    <CardBody>
                        <Image src={item.imageUrl} alt={item.itemName} boxSize="150px" objectFit="cover" mb={2} />
                        <Text>Category: {item.category}</Text>
                        <Text>Refurbished: {item.refurbished === 'yes' ? 'Yes' : 'No'}</Text>
                        <Text>
                            Original Price: <Text as="s">₹{item.originalPrice}</Text>
                        </Text>
                        <Text>Discount: {item.discount}%</Text>
                        <Text fontWeight="bold">
                            Price: ₹{calculateDiscountedPrice(item.originalPrice, item.discount)}
                        </Text>
                    </CardBody>
                </Card>
            ))}
        </Box>
    );
};

export default UserItems;