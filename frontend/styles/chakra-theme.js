// chakra-theme.js

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Baloo Bhai, sans-serif',
    body: 'Baloo Bhai, sans-serif',
  },
  colors: {
    NegroPri: '#212226',
    NegroSec: '#313236',
    Blanco: '#F3F3FB',
    Amarillo: '#FEE3A2',
    Cafe: '#564734',
    Naranja: '#FFA570',
    Verde: '#778D45',
  },
  styles: {
    global: {
      body: {
        bg: 'primaryBlack', // Usa el color primaryBlack como fondo del cuerpo de la página
        color: 'white',     // Usa el color white para el texto en toda la página
      },
    },
  },
});

export default theme;
