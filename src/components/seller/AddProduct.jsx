import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Input,
    Select,
    Image,
    Card,
    CardBody,
    SimpleGrid,
    Spinner,
    Alert,
    AlertIcon,
    Stack,
    HStack,
    Tag,
    TagLabel,
    TagCloseButton,
    Text,
} from '@chakra-ui/react';
import axios from 'axios';

const AddItemCard = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [refurbished, setRefurbished] = useState('');
    const [condition, setCondition] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [availability, setAvailability] = useState('');
    const [sizes, setSizes] = useState([]);
    const [sizeInput, setSizeInput] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const shopName = sessionStorage.auth ? JSON.parse(sessionStorage.auth).shopName : '';
    const sellerName = sessionStorage.auth ? JSON.parse(sessionStorage.auth).email : '';

    const handleSizeAdd = () => {
        if (sizeInput && !sizes.includes(sizeInput)) {
            setSizes([...sizes, sizeInput]);
            setSizeInput('');
        }
    };

    const handleSizeRemove = (sizeToRemove) => {
        setSizes(sizes.filter((size) => size !== sizeToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/profiles', {
                imageUrl,
                itemName,
                category,
                refurbished,
                condition,
                originalPrice,
                sellingPrice: originalPrice * (1 - discountPercentage / 100),
                discountPercentage,
                availability,
                sizes,
                shopName,
                sellerName,
            });

            setItems((prevItems) => [...prevItems, response.data]);
            setImageUrl('');
            setItemName('');
            setCategory('');
            setRefurbished('');
            setCondition('');
            setOriginalPrice('');
            setDiscountPercentage('');
            setAvailability('');
            setSizes([]);
        } catch (err) {
            setError('Failed to add item');
        } finally {
            setLoading(false);
        }
    };

    const fetchItems = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('/user-items', {
                params: { shopName },
            });
            setItems(response.data);
        } catch (err) {
            setError('');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <Box maxWidth="600px" mx="auto" mt={8} p={4}>
            <Card>
                <CardBody>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <Input
                                placeholder="Image URL"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                            <Input
                                placeholder="Item Name"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                            <Select
                                placeholder="Select Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="athletics">Athletics</option>
                                <option value="roller sports">Roller Sports</option>
                                <option value="combat sports">Combat Sports</option>
                                <option value="golf">Golf</option>
                                <option value="soccer">Soccer</option>
                                <option value="taekwondo">Taekwondo</option>
                                <option value="tennis">Tennis</option>
                                <option value="acrobatics">Acrobatics</option>
                                <option value="air sports">Air Sports</option>
                                <option value="bowling">Bowling</option>
                                <option value="weightlifting">Weightlifting</option>
                                <option value="basketball">Basketball</option>
                                <option value="cricket">Cricket</option>
                            </Select>
                            <Select
                                placeholder="Refurbished"
                                value={refurbished}
                                onChange={(e) => setRefurbished(e.target.value)}
                            >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </Select>
                            <Select
                                placeholder="Condition"
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                            >
                                <option value="new">New</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                                <option value="poor">Poor</option>
                            </Select>
                            <Input
                                placeholder="Original Price"
                                type="number"
                                value={originalPrice}
                                onChange={(e) => setOriginalPrice(e.target.value)}
                            />
                            <Input
                                placeholder="Discount Percentage"
                                type="number"
                                value={discountPercentage}
                                onChange={(e) => setDiscountPercentage(e.target.value)}
                            />
                            <Input
                                placeholder="Availability"
                                value={availability}
                                onChange={(e) => setAvailability(e.target.value)}
                            />
                            <Box>
                                <Text mb={1}>Sizes</Text>
                                <HStack spacing={2}>
                                    <Input
                                        placeholder="Add Size"
                                        value={sizeInput}
                                        onChange={(e) => setSizeInput(e.target.value)}
                                    />
                                    <Button onClick={handleSizeAdd}>Add</Button>
                                </HStack>
                                <HStack spacing={2} mt={2}>
                                    {sizes.map((size, index) => (
                                        <Tag
                                            key={index}
                                            borderRadius="full"
                                            variant="solid"
                                            colorScheme="teal"
                                        >
                                            <TagLabel>{size}</TagLabel>
                                            <TagCloseButton onClick={() => handleSizeRemove(size)} />
                                        </Tag>
                                    ))}
                                </HStack>
                            </Box>
                            <Button type="submit" colorScheme="blue" width="full">
                                Add Item
                            </Button>
                        </Stack>
                    </form>
                </CardBody>
            </Card>

            {loading ? (
                <Spinner size="xl" />
            ) : error ? (
                <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
                    {items.map((item, index) => (
                        <Card key={index} width="300px" borderWidth="1px" borderRadius="lg">
                            <Image src={item.imageUrl} alt={item.itemName} />
                            <CardBody>
                                <Text fontSize="xl" fontWeight="bold">{item.itemName}</Text>
                                <Text>{item.category}</Text>
                                <Text>{item.sellingPrice}</Text>
                                <Text>Condition: {item.condition}</Text>
                                <Text>Sizes: {item.sizes.join(', ')}</Text>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};

export default AddItemCard;
