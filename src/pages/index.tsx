import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Container, Flex, Grid, HStack, Heading, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Card } from '@/components/Card/card';
import { CampoPesquisa } from '@/components/CampoPesquisa/campoPesquisa';
import { SelectGenre } from '@/components/CampoSelect/SelectGenre';

type Game = {
  title: string;
  thumbnail: string;
  genre: string;
  short_description: string;
};

const API_URL = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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
      setCurrentPage(1); // Reset the current page when applying filters
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedGames = filteredGames.slice(startIndex, endIndex);
  const showPagination = filteredGames.length > itemsPerPage;
  const canGoPrevious = currentPage > 1;
  const canGoNext = endIndex < filteredGames.length;

  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const visiblePageNumbers = (() => {
    if (totalPages <= 7) {
      return pageNumbers;
    }

    if (currentPage <= 4) {
      return [...pageNumbers.slice(0, 5), '...', totalPages];
    }

    if (currentPage > totalPages - 4) {
      return [1, '...', ...pageNumbers.slice(totalPages - 5)];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  })();

  return (
    <Container maxW="container.lg" py={8}>
      <HStack as="section" w="100%" justifyContent="space-between">
        <Text as="h1" fontSize="4xl" fontWeight="700" mb={4}>
          Lista de Jogos
        </Text>

        <Box mb={4} display="flex" gap={4}>
          <CampoPesquisa value={search} onChange={handleSearch} />
          <SelectGenre value={selectedGenre} onChange={handleGenreChange} genres={uniqueGenres} />
        </Box>
      </HStack>

      {loading ? (
        <Flex mt={12} alignItems="center" justifyContent="center" flexDirection="column" gap={4}>
          <Spinner size="xl" />
          <Text as="p">Carregando</Text>
        </Flex>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : paginatedGames.length === 0 ? (
        <Text as="p" fontSize="20" fontWeight="bold" textAlign="center" p={8}>
          Nenhum resultado encontrado.
        </Text>
      ) : (
        <>
          <Grid templateColumns={['1fr', 'repeat(3, 1fr)']} gap={4}>
            {paginatedGames.map((game, index) => (
              <Card key={index} {...game} />
            ))}
          </Grid>

          {showPagination && (
            <Flex mt={4} justifyContent="center">
              <ButtonGroup>
                {canGoPrevious && (
                  <Button
                    colorScheme="teal"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Anterior
                  </Button>
                )}

                {visiblePageNumbers.map((page) => (
                  <Button
                    key={page}
                    colorScheme={currentPage === page ? 'teal' : undefined}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}

                {canGoNext && (
                  <Button
                    colorScheme="teal"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Próxima
                  </Button>
                )}
              </ButtonGroup>
            </Flex>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
