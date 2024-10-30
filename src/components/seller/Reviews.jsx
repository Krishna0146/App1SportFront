import React, { useEffect, useState } from 'react';
import { Box, Text, Stack, HStack } from '@chakra-ui/react';
import axios from 'axios';
import { api } from '../actions/api';

const ReviewDisplay = () => {
    const [reviews, setReviews] = useState([]);
    const user = sessionStorage.auth ? JSON.parse(sessionStorage.auth) : null;

    useEffect(() => {
        const fetchReviews = async () => {
            if (!user) return;

            try {
                const response = await axios.get(api + '/reviews', {
                    params: {
                        shopName: user.shopName,
                        sellerEmail: user.email, 
                    },
                });
                console.log('Fetched Reviews:', response.data); 
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [user]);

    const renderStars = (stars) => {
        return [...Array(5)].map((_, index) => (
            <Text key={index} color={index < stars ? 'yellow.400' : 'gray.300'}>
                ★
            </Text>
        ));
    };

    return (
        <Box p={4}>
            {reviews.length === 0 ? (
                <Text>No reviews found for this user.</Text>
            ) : (
                reviews.map((review, index) => (
                    <Box key={index} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
                        <Stack spacing={2}>
                            <Text><strong>Comments:</strong> {review.comments}</Text>
                            <HStack spacing={1}>
                                <Text><strong>Stars:</strong></Text>
                                {renderStars(review.stars)}
                            </HStack>
                        </Stack>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default ReviewDisplay;
