import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Link, Text } from '@chakra-ui/react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from 'config/firebase';

const Cadastro: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    function handleSignCreate(e: { preventDefault: () => void; }) {
        e.preventDefault();
        createUserWithEmailAndPassword(email, password);
    }

    if(loading) return <p>Carregando...</p>
    return (
        <Container maxW="container.sm" py={8}>
            <Box bg="#1c242c" p={8} borderRadius="md" boxShadow="md">
                <Heading as="h1" fontSize="xl" mb={4}>
                    Cadastro
                </Heading>

                <form>
                    <FormControl id="email" mb={4}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>

                    <FormControl id="password" mb={6}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>

                    <Button colorScheme="teal" onClick={handleSignCreate}>
                        Criar conta
                    </Button>

                    <Text mt={4} fontSize="sm" color="gray.500">
                        Já tem uma conta? <Link href="/login">Faça login aqui</Link>.
                    </Text>
                </form>
            </Box>
        </Container>
    );
};

export default Cadastro;
