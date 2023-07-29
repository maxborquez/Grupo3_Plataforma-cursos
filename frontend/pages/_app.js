import '../styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import dotenv from 'dotenv';
import chakraTheme from '../styles/chakra-theme'; // Asegúrate de usar la ruta correcta hacia tu chakra-theme.js

dotenv.config();

function MyApp({ Component, pageProps }) {
  const combinedTheme = extendTheme(chakraTheme, {
    // Puedes definir más estilos específicos de la aplicación aquí si lo deseas
  });

  return (
    <ChakraProvider theme={combinedTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
