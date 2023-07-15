import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Link, Text } from '@chakra-ui/react';

const LoginPage: React.FC = () => {
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

        // Aqui você pode adicionar a lógica para fazer o login com os dados fornecidos
        // Exemplo:
        // authService.login(email, password);
    };

    return (
        <Container maxW="container.sm" py={8}>
            <Box bg="white" p={8} borderRadius="md" boxShadow="md">
                <Heading as="h1" fontSize="xl" mb={4}>
                    Login
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
                        Login
                    </Button>
                </form>

                <Text mt={4} fontSize="sm" color="gray.500">
                    Ainda não tem uma conta? <Link href="/register">Crie uma aqui</Link>.
                </Text>
            </Box>
        </Container>
    );
};

export default LoginPage;
