import React from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Image,
  Button,
  keyframes,
  Flex,
} from '@chakra-ui/react';

const articles = [
  {
    id: 1,
    title: 'Team A Wins Championship',
    description: 'In an exhilarating match, Team A emerged victorious...',
    date: 'August 12, 2024',
    image: 'https://th.bing.com/th/id/OIP.CF55pl_DLJpMBTHj-096ywHaEK?w=332&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7', 
  },
  {
    id: 2,
    title: 'Player X Breaks Record',
    description: 'Player X has set a new record in the league...',
    date: 'August 11, 2024',
    image:'https://th.bing.com/th/id/OIP.Inyb8ipRocGow1cnXjvfMgHaEK?w=326&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7'
  },
  {
    id: 3,
    title: 'Upcoming Match Preview',
    description: 'A look ahead at the exciting match between Team B and Team C...',
    date: 'August 10, 2024',
    image: 'https://th.bing.com/th/id/OIP.WrCm3LylqJnodLLgy0c0zQHaEK?w=301&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
  {
    id: 4,
    title: 'Top 5 Players of the Season',
    description: 'A rundown of the best players this season...',
    date: 'August 9, 2024',
    image: 'https://th.bing.com/th/id/OIP.gk13nsQ-aPB8Mtn3T2s4dAHaFj?w=242&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
  {
    id: 5,
    title: 'Behind the Scenes: Team D',
    description: 'A sneak peek into Team D’s training camp...',
    date: 'August 8, 2024',
    image: 'https://th.bing.com/th/id/OIP.ltbrF2BOEnpwnDXEg-AkdAHaD4?w=345&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
];

const magazines = [
  {
    id: 1,
    title: 'Sports Monthly',
    description: 'The latest issue covers exclusive interviews and insights.',
    image: 'https://th.bing.com/th/id/OIP.BHNr13bUpt9zrAf44GWE_gHaEK?w=332&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
  {
    id: 2,
    title: 'Athlete Today',
    description: 'Get to know the stories behind your favorite athletes.',
    image: 'https://th.bing.com/th/id/OIP._vdTiIVkP35U0mr3g46nzwHaEo?w=299&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
];

const marqueeAnimation = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const Marquee = () => (
  <Box overflow="hidden" whiteSpace="nowrap" bg="gray.100" p={2}>
    <Flex
      as="span"
      animation={`${marqueeAnimation} 15s linear infinite`}
      fontWeight="bold"
      color="teal.500"
    >
      <Text mx={4}>Breaking News: Player Y has joined Team Z!</Text>
      <Text mx={4}>Match Highlights: Team B defeats Team C in a thrilling finish!</Text>
      <Text mx={4}>Injury Update: Player X to miss next match due to injury.</Text>
    </Flex>
  </Box>
);

const SportsNews = () => {
  return (
    <Box p={5} bg="gray.100">
      <Heading as="h1" size="xl" textAlign="center" mb={6}>
        Sports News
      </Heading>

      {/* Articles Section */}
      <Heading as="h2" size="lg" mb={4}>
        Latest Articles
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {articles.map((article) => (
          <GridItem key={article.id}>
            <Box
              borderWidth={1}
              borderRadius="lg"
              overflow="hidden"
              bg="white"
              boxShadow="lg"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.05)' }}
            >
              <Image src={article.image} alt={article.title} />
              <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                  {article.title}
                </Heading>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  {article.date}
                </Text>
                <Text mb={4}>{article.description}</Text>
                <Button colorScheme="teal">Read More</Button>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>

      {/* Magazines Section */}
      <Heading as="h2" size="lg" mt={10} mb={4}>
        Featured Magazines
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {magazines.map((magazine) => (
          <GridItem key={magazine.id}>
            <Box
              borderWidth={1}
              borderRadius="lg"
              overflow="hidden"
              bg="white"
              boxShadow="lg"
              p={4}
              textAlign="center"
            >
              <Image src={magazine.image} alt={magazine.title} />
              <Heading as="h3" size="md" mt={2}>
                {magazine.title}
              </Heading>
              <Text mb={2}>{magazine.description}</Text>
              <Button colorScheme="teal">View Magazine</Button>
            </Box>
          </GridItem>
        ))}
      </Grid>

      {/* News Marquee */}
      <Marquee />
    </Box>
  );
};

export default SportsNews;
