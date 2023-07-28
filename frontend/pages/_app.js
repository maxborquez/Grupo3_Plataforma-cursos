import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import dotenv from 'dotenv';

dotenv.config();

function MyApp({ Component, pageProps }) {
  const theme = extendTheme({
    fonts: {
      heading: 'Baloo Bhai, sans-serif',
      body: 'Baloo Bhai, sans-serif',
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
