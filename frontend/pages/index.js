// pages/index.js
import Link from 'next/link';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';

const IndexPage = () => {
  return (
    <Box p={4}>
      <VStack spacing={4} align="center">
        <Heading as="h1" size="xl">
          Centro de Formación Tech
        </Heading>
        <Link href="/login">
          <Button colorScheme="teal">Login</Button>
        </Link>
        <Link href="/signup">
          <Button colorScheme="blue">Sign Up</Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default IndexPage;
