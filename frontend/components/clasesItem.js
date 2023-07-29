import React from "react";
import { ListItem, Button, Flex, Box } from "@chakra-ui/react";

const ClaseItem = ({ clase, onEditarClick, onBorrarClick }) => {
  const handleEditarClick = () => {
    onEditarClick(clase._id);
  };

  const handleBorrarClick = () => {
    onBorrarClick(clase._id);
  };

  return (
    <ListItem display="flex" alignItems="center">
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <Box mr={20}>
          {clase.nombre} - Fecha: {new Date(clase.fecha).toLocaleDateString()}
        </Box>
        <Box>
          <Button size="sm" bg="cafe" color="blanco" onClick={handleEditarClick}>
            Editar
          </Button>
          <Button ml="2" size="sm" bg="red" color="blanco" onClick={handleBorrarClick}>
            Eliminar
          </Button>
        </Box>
      </Flex>
    </ListItem>
  );
};

export default ClaseItem;
