import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
