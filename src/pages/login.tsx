import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Link, Text } from '@chakra-ui/react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'config/firebase'; // Importe o objeto auth do seu arquivo firebase.tsx
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    function handleSignIn(e: { preventDefault: () => void; }) {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    }

    // const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setEmail(event.target.value);
    // };

    // const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setPassword(event.target.value);
    // };

    // const handleLogin = async () => {
    //     try {
    //         await signInWithEmailAndPassword(auth, email, password);
    //         // Autenticação bem-sucedida, você pode redirecionar o usuário para a página principal
    //     } catch (error) {
    //         console.error(error);
    //         // Tratar erros de autenticação aqui e fornecer feedback ao usuário
    //     }
    // };

    if(loading) {
        return <p>Carregando...</p>
    }
    if(user) {
        return <p>Logado com sucesso!</p>
        console.log(user)
    }
    return (
        <Container maxW="container.sm" py={8}>
            <Box bg="#1c242c" p={8} borderRadius="md" boxShadow="md">
                <Heading as="h1" fontSize="xl" mb={4}>
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

                    <Button colorScheme="teal" onClick={handleSignIn}>
                        Login
                    </Button>

                    <Text mt={4} fontSize="sm" color="gray.500">
                        Não tem uma conta? <Link href="/register">Crie uma aqui</Link>.
                    </Text>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
