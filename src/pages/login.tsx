import React, { useState, useEffect } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Link, Text } from '@chakra-ui/react';
import { signInWithEmailAndPassword, getAuth, AuthErrorCodes } from 'firebase/auth';
import { auth } from 'config/firebase';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();

    function handleSignIn(e: { preventDefault: () => void }) {
        e.preventDefault();
        setErrorMessage(''); // Limpa a mensagem de erro antes de fazer o login

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                router.push('/'); // Redireciona para a página Home após o login
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/invalid-email') {
                    setErrorMessage('Email inválido. Verifique se o email está correto.');
                } else if (errorCode === 'auth/wrong-password') {
                    setErrorMessage('Senha incorreta. Verifique se a senha está correta.');
                } else if (errorCode === 'auth/user-not-found') {
                    setErrorMessage('Usuário não encontrado. Verifique se o email está correto.');
                } else {
                    setErrorMessage('Erro ao fazer login. Por favor, tente novamente mais tarde.');
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
                    Login
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
                        Não tem uma conta? <Link href="/register">Crie uma aqui</Link>.
                    </Text>

                    {errorMessage && (
                        <Text mt={4} fontSize="sm" color="red.500">
                            {errorMessage}
                        </Text>
                    )}

                    <Box display={'flex'} justifyContent={'end'} mr={'4'}>
                        <Button colorScheme="teal" onClick={handleSignIn}
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
                            Login
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
