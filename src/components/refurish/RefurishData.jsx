import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Image,
    Text,
    SimpleGrid,
    Card,
    CardBody,
    CardHeader,
    Alert,
    AlertIcon,
    Spinner,
} from '@chakra-ui/react';
import { api } from '../actions/api'; 

const RefurbishedItems = () => {
    const [refurbishedItems, setRefurbishedItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRefurbishedItems = async () => {
            setError(null);
            setLoading(true);
            try {
                const response = await axios.get(`${api}/items/refurbished`);
                setRefurbishedItems(response.data);
            } catch (error) {
                console.error('Error fetching refurbished items:', error);
                setError('Failed to load refurbished items.');
            } finally {
                setLoading(false);
            }
        };

        fetchRefurbishedItems();
    }, []);

    return (
        <Box p={4}>
            {error && (
                <Alert status="error" mb={4}>
                    <AlertIcon />
                    {error}
                </Alert>
            )}
            {loading ? (
                <Spinner size="xl" />
            ) : (
                <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                    {refurbishedItems.map((item) => (
                        <Card key={item._id} borderWidth="1px" borderRadius="lg" overflow="hidden">
                            <CardHeader>
                                <Text fontSize="xl" fontWeight="bold">{item.itemName}</Text> {/* Display itemName */}
                            </CardHeader>
                            <CardBody>
                                <Image src={item.imageUrl} alt={item.itemName} boxSize="150px" objectFit="cover" mb={2} /> {/* Display imageUrl */}
                                <Text>Category: {item.category}</Text> {/* Display category */}
                                <Text>Discount: {item.discountPercentage}%</Text> {/* Display discountPercentage */}
                                <Text>Original Price: <Text as="s">₹{item.originalPrice}</Text></Text> {/* Display originalPrice */}
                                <Text fontWeight="bold">Selling Price: ₹{item.sellingPrice}</Text> {/* Display sellingPrice */}
                                <Text>Availability: {item.availability}</Text> {/* Display availability */}
                                <Text>Condition: {item.condition}</Text>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};

export default RefurbishedItems;
