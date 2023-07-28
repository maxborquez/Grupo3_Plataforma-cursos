import Link from 'next/link';
import { Box, Button, Heading, VStack, Text } from '@chakra-ui/react';

const IndexPage = () => {
  return (
    <Box p={4} bg="gray.100" minHeight="100vh">
      <VStack spacing={8} align="center">
        <br/>
        <br/>
        <Heading as="h1" size="2xl" textAlign="center" color="teal.500">
          Centro de Formación Tech
        </Heading>
        <Text fontSize="xl" textAlign="center" color="gray.600">
          Aprende y crece con nosotros.
        </Text>
        <Link href="/login">
          <Button colorScheme="teal" size="lg">
            Iniciar Sesión
          </Button>
        </Link>
        <Link href="/signup">
          <Button colorScheme="blue" size="lg">
            Registrarse
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default IndexPage;
