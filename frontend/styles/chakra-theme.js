// chakra-theme.js

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Baloo Bhai, sans-serif', // Fuente para los encabezados (headings)
    body: 'Baloo Bhai, sans-serif',    // Fuente para el contenido principal (body)
  },
});

export default theme;
