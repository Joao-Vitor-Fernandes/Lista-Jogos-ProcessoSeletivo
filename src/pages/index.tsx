import React, { useEffect, useState } from 'react';
import { Box, Container, Flex, Grid, HStack, Heading, Spinner, Text } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { Card } from '@/components/Card/card';
import { CampoPesquisa } from '@/components/CampoPesquisa/campoPesquisa';
import { SelectGenre } from '@/components/CampoSelect/SelectGenre';
// import SelectGenre from './SelectGenre';

type Game = {
  title: string;
  image: string;
  genre: string;
  description: string;
};

const API_URL = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchDataGames = async () => {
      setLoading(true);

      try {
        const response = await axios.get(API_URL, {
          headers: {
            'dev-email-address': 'joviramos16@gmail.com'
          }
        });

        setGames(response.data);
        setLoading(false);
      } catch (error: any) {
        if (error.response) {
          const status = error.response.status;

          if ([500, 502, 503, 504, 507, 508, 509].includes(status)) {
            setError('O servidor falhou em responder, tente recarregar a página');
          } else {
            setError('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde');
          }
        } else if (error.request) {
          setError('O servidor demorou para responder, tente mais tarde');
        } else {
          setError('Ocorreu um erro ao obter os dados');
        }

        setLoading(false);
      }
    };

    fetchDataGames();
  }, []);

  useEffect(() => {
    const filterGames = () => {
      let filtered = games;

      if (search) {
        const lowerCaseSearch = search.toLowerCase();

        filtered = filtered.filter((game) =>
          game.title.toLowerCase().includes(lowerCaseSearch)
        );
      }
      if (selectedGenre) {
        filtered = filtered.filter((game) => game.genre === selectedGenre);
      }

      setFilteredGames(filtered);
    };

    filterGames();
  }, [games, search, selectedGenre]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  const uniqueGenres = [...new Set(games.map((game) => game.genre))];

  return (
    <Container maxW="container.lg" py={8}>
      <HStack as='section' w={'100%'} justifyContent={'space-between'}>
        <Text as="h1" fontSize={'4xl'} fontWeight={'700'} mb={4}>
          Lista de Jogos
        </Text>

        <Box mb={4} display={'flex'} gap={'4'}>
          <CampoPesquisa value={search} onChange={handleSearch} />
          <SelectGenre value={selectedGenre} onChange={handleGenreChange} genres={uniqueGenres} />
        </Box>
      </HStack>

      {loading ? (
        <Flex
          mt={'12'}
          alignItems="center"
          justifyContent="center"
          flexDirection={'column'}
          gap={'4'}
        >
          <Spinner size="xl" />
          <Text as="p">
            Carregando
          </Text>
        </Flex>
      ) : error ? (<Text color="red.500">{error}</Text>) : filteredGames.length === 0 ? (
        <Text as="p" fontSize="20" fontWeight="bold" textAlign="center" p={8}>
          Nenhum resultado encontrado.
        </Text>
      ) : (
        <Grid templateColumns={['1fr', 'repeat(3, 1fr)']} gap={4}>
          {filteredGames.map((game, index) => (
            <Card key={index} {...game} />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
