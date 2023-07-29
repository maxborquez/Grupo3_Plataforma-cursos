import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Heading, Box, Input, Button, HStack, Image, Center } from "@chakra-ui/react";
import { login, getUserRole } from "../data/auth";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const token = await login(email);

      Cookies.set("jwtToken", token);

      const userRoles = getUserRole(token);

      if (userRoles.includes("admin")) {
        router.push("/adminPages/cursosAdmin");
      } else if (userRoles.includes("profesor")) {
        router.push("/profesorPages/profesor");
      } else if (userRoles.includes("alumno")) {
        router.push("/alumnoPages/alumno");
      } else {
        router.push("/error");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      const userRoles = getUserRole(jwtToken);

      if (userRoles.includes("admin")) {
        router.push("/adminPages/cursosAdmin");
      } else if (userRoles.includes("profesor")) {
        router.push("/profesorPages/profesor");
      } else if (userRoles.includes("alumno")) {
        router.push("/alumnoPages/alumno");
      } else {
        router.push("/error");
      }
    }
  }, []);

  const handleGoToHome = () => {
    router.push("/");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
      <Center maxW="400px" width="100%">
        <Image src="/logo.png" width={150} alt="Logo" mb={4} />
      </Center>
      <Heading color="naranja" mb={4}>
        <strong>Iniciar sesión</strong>
      </Heading>
      <Center maxW="400px" width="100%">
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={4}
          bg="amarillo"
          color="cafe"
        />
      </Center>
      <HStack spacing={4} mt={4}>
        <Button flex={1} bg="cafe" color="blanco" onClick={handleLogin}>
          Login
        </Button>
        <Button flex={1} bg="naranja" color="blanco" onClick={handleGoToHome}>
          Volver
        </Button>
      </HStack>
    </Box>
  );
};

export default LoginPage;
