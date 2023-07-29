import React from "react";
import { ListItem, Box } from "@chakra-ui/react";

const AvisoItem = ({ aviso}) => {
  return (
    <ListItem display="flex" alignItems="center">
      <Box mr={20} >
        {aviso.contenido}
      </Box>
    </ListItem>
  );
};

export default AvisoItem;
