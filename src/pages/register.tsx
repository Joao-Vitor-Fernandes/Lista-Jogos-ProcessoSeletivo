import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Link, Text } from '@chakra-ui/react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import auth from 'config/firebase'; // Importe o objeto auth do seu arquivo firebase.tsx

const Cadastro: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSignUp = async () => {
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Nova conta criada com sucesso, você pode redirecionar o usuário para a página principal
            const user = userCredential.user;
            console.log('Nova conta criada:', user);
        } catch (error) {
            console.error('Erro ao criar conta:', error);
            if (error instanceof Error) {
                setError('Ocorreu um erro ao criar a conta: ' + error.message);
            } else {
                setError('Ocorreu um erro ao criar a conta.');
            }
        }
    };

    return (
        <Container maxW="container.sm" py={8}>
            <Box bg="#1c242c" p={8} borderRadius="md" boxShadow="md">
                <Heading as="h1" fontSize="xl" mb={4}>
                    Cadastro
                </Heading>

                <form>
                    <FormControl id="email" mb={4}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" value={email} onChange={handleEmailChange} />
                    </FormControl>

                    <FormControl id="password" mb={6}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" value={password} onChange={handlePasswordChange} />
                    </FormControl>

                    {error && (
                        <Text color="red.500" mb={4}>
                            {error}
                        </Text>
                    )}

                    <Button colorScheme="teal" onClick={handleSignUp}>
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
