import { useState, useEffect } from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Flex, Button, Link } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar';
import withAuth from '../../data/withAuth';
import UserItem from '../../components/userItem';
import { getUsers, deleteUser } from '../../data/usersData';

const UsuariosAdminPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [allUsers, setAllUsers] = useState([]);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsersResponse = await getUsers();
        setAllUsers(allUsersResponse.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      const updatedAllUsersResponse = await getUsers();
      setAllUsers(updatedAllUsersResponse.data);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const tabs = ['Todos', 'Administradores', 'Profesores', 'Alumnos'];

  const filteredUsers = tabIndex === 0
    ? allUsers
    : tabIndex === 1
    ? allUsers.filter((user) => user.roles.some((role) => role.name === 'admin'))
    : tabIndex === 2
    ? allUsers.filter((user) => user.roles.some((role) => role.name === 'profesor'))
    : allUsers.filter((user) => user.roles.some((role) => role.name === 'alumno'));


  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />

      <Box p={4} ml={18} flexGrow={1} fontFamily="Baloo Bhai, sans-serif" display="flex">
        <Box flex="1" p={4} borderRadius="10px" bg="gray.300" textAlign="center" display="flex">
          <Box w="100%" height="100vh" overflowY="auto">
            <Tabs index={tabIndex} onChange={handleTabChange}>
              <TabList>
                {tabs.map((tab) => (
                  <Tab key={tab}>{tab}</Tab>
                ))}
              </TabList>
              <TabPanels>
                <TabPanel>
                  {filteredUsers.map((user) => (
                    <UserItem key={user._id} user={user} onDeleteClick={handleDeleteUser} />
                  ))}
                </TabPanel>
                <TabPanel>
                  {filteredUsers.map((user) => (
                    <UserItem key={user._id} user={user} onDeleteClick={handleDeleteUser} />
                  ))}
                </TabPanel>
                <TabPanel>
                  {filteredUsers.map((user) => (
                    <UserItem key={user._id} user={user} onDeleteClick={handleDeleteUser} />
                  ))}
                </TabPanel>
                <TabPanel>
                  {filteredUsers.map((user) => (
                    <UserItem key={user._id} user={user} onDeleteClick={handleDeleteUser} />
                  ))}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          <Flex justify="flex-end" p={2}>
            <Link href="/adminPages/usuarioCreate">
              <Button colorScheme="green" size="lg">
                +
              </Button>
            </Link>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default withAuth(UsuariosAdminPage, 'admin');
