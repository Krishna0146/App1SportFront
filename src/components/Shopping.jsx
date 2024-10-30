import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Image,
    Text,
    Button,
    SimpleGrid,
    Card,
    CardBody,
    CardHeader,
    Alert,
    AlertIcon,
    Spinner,
    Select,
} from '@chakra-ui/react';
import { api } from './actions/api';

const ItemGrid = () => {
    const user = sessionStorage.auth ? JSON.parse(sessionStorage.auth) : null;
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filterHighDiscount, setFilterHighDiscount] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState('all');

    useEffect(() => {
        const fetchItems = async () => {
            setError(null);
            setLoading(true);
            try {
                const response = await axios.get(`${api}/items`);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
                setError('Failed to load items.');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleAddToCart = async (item) => {
        if (user) {
            const cartItem = {
                itemName: item.itemName,
                sellerName: item.sellerName,
                cost: item.sellingPrice,
                quantity: 1,
                imageUrl: item.imageUrl,
                shopName: item.shopName,
            };

            try {
                await axios.post(`${api}/cart`, cartItem);
                alert('Item added to cart successfully');
            } catch (error) {
                console.error('Error adding item to cart:', error);
                alert('Failed to add item to cart');
            }
        } else {
            alert('Please log in to add items to the cart');
        }
    };

    // Toggle the discount filter
    const toggleFilter = () => {
        setFilterHighDiscount((prev) => !prev);
    };

    // Filter items based on selected criteria
    const filteredItems = items.filter(item => {
        const discountCondition = filterHighDiscount ? item.discountPercentage > 25 : true;
        const categoryCondition = categoryFilter === 'all' || item.category === categoryFilter;

        return discountCondition && categoryCondition;
    });

    return (
        <Box p={4}>
            {error && (
                <Alert status="error" mb={4}>
                    <AlertIcon />
                    {error}
                </Alert>
            )}
            <Button colorScheme="teal" mb={4} onClick={toggleFilter}>
                {filterHighDiscount ? 'Show All Items' : 'Show Discounts Over 25%'}
            </Button>

            <Select mb={4} onChange={(e) => setCategoryFilter(e.target.value)} placeholder="Filter by Category">
                <option value="all">All Categories</option>
                <option value="cricket">Cricket</option>
                <option value="tennis">Tennis</option>
                <option value="golf">Golf</option>
                {/* Add more categories as needed */}
            </Select>

            {loading ? (
                <Spinner size="xl" />
            ) : (
                <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                    {filteredItems.map((item) => (
                        <Card key={item._id} borderWidth="1px" borderRadius="lg" overflow="hidden">
                            <CardHeader>
                                <Text fontSize="xl" fontWeight="bold">{item.itemName}</Text>
                            </CardHeader>
                            <CardBody>
                                <Image src={item.imageUrl} alt={item.itemName} boxSize="150px" objectFit="cover" mb={2} />
                                <Text>Category: {item.category}</Text>
                                <Text>Discount: {item.discountPercentage}%</Text>
                                <Text>Original Price: <Text as="s">₹{item.originalPrice}</Text></Text>
                                <Text fontWeight="bold">Selling Price: ₹{item.sellingPrice}</Text>
                                <Button colorScheme="blue" mt={2} onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                                <Button colorScheme="green" mt={2} ml={2} onClick={() => {/* Add buy now logic */}}>Buy Now</Button>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};

export default ItemGrid;
