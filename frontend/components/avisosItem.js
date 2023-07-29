import React from "react";
import { ListItem, Button, Box } from "@chakra-ui/react";

const AvisoItem = ({ aviso, onEditarClick, onBorrarClick }) => {
  const handleEditarClick = () => {
    onEditarClick(aviso._id);
  };

  const handleBorrarClick = () => {
    onBorrarClick(aviso._id);
  };

  return (
    <ListItem display="flex" alignItems="center">
      <Box mr={20} >
        {aviso.contenido}
      </Box>
      <Box>
        <Button size="sm" bg="cafe" color="blanco" onClick={handleEditarClick}>
          Editar
        </Button>
        <Button ml="2" size="sm" bg="red" color="blanco" onClick={handleBorrarClick}>
          Borrar
        </Button>
      </Box>
    </ListItem>
  );
};

export default AvisoItem;
