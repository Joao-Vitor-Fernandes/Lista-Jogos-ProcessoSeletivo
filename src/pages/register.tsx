import React, { useEffect, useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Link, Text } from '@chakra-ui/react';
import { createUserWithEmailAndPassword, getAuth, AuthErrorCodes } from 'firebase/auth';
import { auth } from 'config/firebase';
import { useRouter } from 'next/router';

const Cadastro: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();

    function handleSignCreate(e: { preventDefault: () => void; }) {
        e.preventDefault();
        setErrorMessage(''); // Limpa a mensagem de erro antes de cadastrar o usuário

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Redireciona para a página Home se o usuário for criado com sucesso
                if (userCredential.user) {
                    router.push('/');
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/invalid-email') {
                    setErrorMessage('Email inválido. Verifique se o email está correto.');
                } else if (errorCode === 'auth/weak-password') {
                    setErrorMessage('Senha fraca. A senha deve ter pelo menos 6 caracteres.');
                } else if (errorCode === 'auth/email-already-in-use') {
                    setErrorMessage('Este email já está em uso. Por favor, use outro email.');
                } else {
                    setErrorMessage('Erro ao criar a conta. Por favor, tente novamente mais tarde.');
                }
            });
    }

    useEffect(() => {
        if (auth.currentUser) {
            router.push('/'); // Redireciona para a página Home se o usuário já estiver autenticado
        }
    }, [router]);

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

                    {errorMessage && (
                        <Text mt={4} fontSize="sm" color="red.500">
                            {errorMessage}
                        </Text>
                    )}

                    <Text mt={4} fontSize="sm" color="gray.500">
                        Já tem uma conta? <Link href="/login">Faça login aqui</Link>.
                    </Text>
                </form>
            </Box>
        </Container>
    );
};

export default Cadastro;
