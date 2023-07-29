import Link from 'next/link';
import { Box, Button, Heading, VStack, Text, Image } from '@chakra-ui/react';

const IndexPage = () => {
  return (
    <Box p={4} bg="NegroPri" minHeight="100vh"> {/* Usamos el color primaryBlack de la paleta */}
      <VStack spacing={8} align="center">
        <br/>
        <br/>
        <Heading as="h1" size="2xl" textAlign="center" color="naranja">
          Centro de Formación Tech
        </Heading>
        <Image src="/logo.png" width={150} alignContent='center' alt="Logo" mb={4} />
        <Text fontSize="xl" textAlign="center" color="amarillo">
          Aprende y crece con nosotros.
        </Text>
        <Link href="/login">
          <Button bg="cafe" color="blanco" size="lg"> {/* Usamos el color naranjo de la paleta */}
            Iniciar Sesión
          </Button>
        </Link>
        <Link href="/signup">
          <Button bg="naranja" color="blanco" size="lg"> {/* Usamos el color café de la paleta */}
            Registrarse
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default IndexPage;
