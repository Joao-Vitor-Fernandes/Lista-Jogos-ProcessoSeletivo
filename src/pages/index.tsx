import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, GridItem, Heading, Input, Spinner, Text } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';

type Game = {
  title: string;
  image: string;
  genre: string;
};

const API_URL = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/';

const GameCard: React.FC<Game> = ({ title, image, genre }) => (
  <GridItem>
    <Box borderWidth="1px" borderRadius="md" overflow="hidden">
      <img src={image} alt={title} style={{ width: '100%' }} />
      <Box p={4}>
        <Heading as="h2" size="md" mb={2}>
          {title}
        </Heading>
        <Text>{genre}</Text>
      </Box>
    </Box>
  </GridItem>
);

const Home: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      setLoader(true);
      try {
        const response = await axios.get(API_URL, {
          headers: {
            'dev-email-address': 'seu-email@example.com' // Substitua com seu endereço de e-mail
          }
        });
        setGames(response.data);
        setLoader(false);
      } catch (error: any) {
        if (error.response) {
          const statusCode = error.response.status;
          if ([500, 502, 503, 504, 507, 508, 509].includes(statusCode)) {
            setError('O servidor falhou em responder, tente recarregar a página');
          } else {
            setError('O servidor não conseguiu responder por agora, tente voltar novamente mais tarde');
          }
        } else if (error.request) {
          setError('O servidor demorou para responder, tente mais tarde');
        } else {
          setError('Ocorreu um erro ao obter os dados');
        }
        setLoader(false);
      }
    };

    fetchGames();
  }, []);

  useEffect(() => {
    const filterGames = () => {
      let filtered = games;
      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filtered = filtered.filter((game) =>
          game.title.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }
      if (selectedGenre) {
        filtered = filtered.filter((game) => game.genre === selectedGenre);
      }
      setFilteredGames(filtered);
    };

    filterGames();
  }, [games, searchTerm, selectedGenre]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" mb={4}>
        Lista de Jogos
      </Heading>
      {loader ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <Grid templateColumns={['1fr', 'repeat(3, 1fr)']} gap={4}>
          {filteredGames.map((game, index) => (
            <GameCard key={index} {...game} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;