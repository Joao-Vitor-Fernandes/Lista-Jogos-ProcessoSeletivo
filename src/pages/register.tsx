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
        <Container py={24}>
            <Box bg="#1c242c" p={8} borderRadius="md" boxShadow="md">
                <Heading as="h1" fontSize="xl" mb={4} textAlign={'center'}>
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

                    <Text mt={4} fontSize="sm" color="gray.500">
                        Já tem uma conta? <Link href="/login">Faça login aqui</Link>.
                    </Text>

                    {errorMessage && (
                        <Text mt={4} fontSize="sm" color="red.500">
                            {errorMessage}
                        </Text>
                    )}

                    <Box display={'flex'} justifyContent={'end'} mr={'4'}>
                        <Button colorScheme="teal" onClick={handleSignCreate}
                            fontSize="20px"
                            borderRadius={'0'}
                            fontWeight="500"
                            color="#316be2"
                            variant={'link'}
                            position="relative"
                            transition="color .3s ease-in-out, box-shadow .3s ease-in-out"
                            _hover={{
                                color: "white",
                                boxShadow: "inset 0 -2px 0 white",
                            }}
                        >
                            Criar conta
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default Cadastro;
