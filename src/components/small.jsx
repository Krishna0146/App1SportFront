import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Image,
    Text,
    Grid,
    GridItem,
    Card,
    CardBody,
    CardHeader,
} from '@chakra-ui/react';
import { api } from './actions/api'; 
import { motion } from 'framer-motion';

const AnimatedCard = motion(Card);

const AnimatedItemsGrid = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`${api}/items`);
                setItems(response.data.slice(0, 6)); // Get only the first 6 items
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    return (
        <Box p={4}>
            <Grid
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                gap={6} // Set the gap for even distribution
            >
                {items.map((item) => (
                    <GridItem key={item._id}>
                        <AnimatedCard
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            whileHover={{ scale: 1.05 }} // Slightly adjusted scale for better effect
                            transition={{ type: "spring", stiffness: 300 }}
                            boxShadow="md" // Added box shadow for better visibility
                        >
                            <CardHeader>
                                <Text fontSize="xl" fontWeight="bold">{item.itemName}</Text> {/* Display itemName */}
                            </CardHeader>
                            <CardBody>
                                <Image src={item.imageUrl} alt={item.itemName} boxSize="150px" objectFit="cover" mb={2} /> {/* Display imageUrl */}
                                <Text>Category: {item.category}</Text> {/* Display category */}
                                <Text>Discount: {item.discountPercentage}%</Text> {/* Display discountPercentage */}
                                <Text>Original Price: <Text as="s">₹{item.originalPrice}</Text></Text> {/* Display originalPrice */}
                                <Text fontWeight="bold">Selling Price: ₹{item.sellingPrice}</Text> {/* Display sellingPrice */}
                                <Text>Condition: {item.condition}</Text> {/* Display condition */}
                                <Text>Availability: {item.availability}</Text> {/* Display availability */}
                            </CardBody>
                        </AnimatedCard>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
};

export default AnimatedItemsGrid;
