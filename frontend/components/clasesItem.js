import React from "react";
import { ListItem, Flex, Box } from "@chakra-ui/react";

const ClaseItem = ({ clase}) => {

  return (
    <ListItem display="flex" alignItems="center">
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <Box mr={20}>
          {clase.nombre} - Fecha: {new Date(clase.fecha).toLocaleDateString()}
        </Box>
      </Flex>
    </ListItem>
  );
};

export default ClaseItem;
