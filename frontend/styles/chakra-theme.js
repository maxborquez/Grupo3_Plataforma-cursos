// chakra-theme.js

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Baloo Bhai, sans-serif',
    body: 'Baloo Bhai, sans-serif',
  },
  colors: {
    'negro-pri': '#212226',
    'negro-sec': '#313236',
    blanco: '#F3F3FB',
    amarillo: '#FEE3A2',
    cafe: '#564734',
    naranja: '#FFA570',
    verde: '#778D45',
  },
  styles: {
    global: {
      body: {
        bg: 'negro-pri', // Usa el color 'negro-pri' como fondo del cuerpo de la página
        color: 'blanco', // Usa el color 'blanco' para el texto en toda la página
      },
    },
  },
});

export default theme;
