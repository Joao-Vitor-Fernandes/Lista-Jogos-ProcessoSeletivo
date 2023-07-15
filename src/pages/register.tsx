import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Link, Text } from '@chakra-ui/react';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Aqui você pode adicionar a lógica para registrar o usuário com os dados fornecidos
    // Exemplo:
    // authService.register(email, password);
  };

  return (
    <Container maxW="container.sm" py={8}>
      <Box bg="white" p={8} borderRadius="md" boxShadow="md">
        <Heading as="h1" fontSize="xl" mb={4}>
          Cadastro
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={handleEmailChange} />
          </FormControl>

          <FormControl id="password" mb={6}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={handlePasswordChange} />
          </FormControl>

          <Button colorScheme="teal" type="submit">
            Cadastrar
          </Button>
        </form>

        <Text mt={4} fontSize="sm" color="gray.500">
          Já tem uma conta? <Link href="/login">Faça login aqui</Link>.
        </Text>
      </Box>
    </Container>
  );
};

export default RegisterPage;
