import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Container, Flex, Grid, HStack, Heading, Spinner, Text, } from '@chakra-ui/react';
import axios from 'axios';
import { Card } from '@/components/Card/card';
import { CampoPesquisa } from '@/components/CampoPesquisa/campoPesquisa';
import { SelectGenre } from '@/components/CampoSelect/SelectGenre';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { auth, db } from 'config/firebase';
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

type Game = {
  game_url: string;
  isFavorite: boolean;
  rating: number;
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
            'dev-email-address': 'joviramos16@gmail.com',
          },
        });

        setGames(response.data);
        setLoading(false);
      } catch (error: any) {
        if (error.response) {
          const status = error.response.status;

          if ([500, 502, 503, 504, 507, 508, 509].includes(status)) {
            setError('O servidor falhou em responder, tente recarregar a página');
          } else {
            setError(
              'O servidor não conseguirá responder por agora, tente voltar novamente mais tarde'
            );
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
      setCurrentPage(1);
    };

    filterGames();
  }, [games, search, selectedGenre]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleGenreChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedGenre(event.target.value);
  };

  const uniqueGenres = [...new Set(games.map((game) => game.genre))];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEllipsisClick = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
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

  const handleFavoriteClick = (game: Game): void => {
    // Atualiza o estado do jogo para favorito
    const updatedGames = games.map((g) => {
      if (g.game_url === game.game_url) {
        return { ...g, isFavorite: !g.isFavorite };
      }
      return g;
    });

    setGames(updatedGames);
  };

  const handleRatingClick = (game: Game, ratingValue: number): void => {
    // Implemente a lógica para lidar com a ação de clique na avaliação do jogo
    // Aqui você pode atualizar o rating do jogo e persistir os dados no Firestore
    console.log('Jogo:', game.title);
    console.log('Rating:', ratingValue);
  };

  const saveGameData = async (game: Game) => {
    try {
      const { rating, ...gameData } = game; // Remover a propriedade 'rating' temporariamente
      if (typeof rating !== 'undefined') {
        // Verificar se o campo 'rating' está definido
        await addDoc(collection(db, 'jogos'), {
          ...gameData, // Usar os dados do jogo sem o campo 'rating'
          rating: rating || 0, // Definir um valor padrão para o campo 'rating'
        });
      } else {
        console.error('Error adding document: rating field is undefined');
      }
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  

  useEffect(() => {
    // Salva os dados dos jogos no Firestore ao carregar a página
    games.forEach((game) => {
      saveGameData(game);
    });
  }, [games]);

  return (
    <Container maxW="container.lg" py={8}>
      <HStack
        as="section"
        w="100%"
        justifyContent="space-between"
        flexDirection={['column', 'row', 'row', 'row', 'row']}
      >
        <Text as="h1" fontSize="4xl" fontWeight="700" mb={4}>
          Lista de Jogos
        </Text>

        <Box
          as="section"
          mb={4}
          display="flex"
          gap={4}
          flexDirection={['column', 'column', 'row', 'row', 'row']}
        >
          <CampoPesquisa value={search} onChange={handleSearch} />
          <SelectGenre
            value={selectedGenre}
            onChange={handleGenreChange}
            genres={uniqueGenres}
          />
        </Box>
      </HStack>

      {loading ? (
        <Flex
          as="div"
          mt={12}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap={4}
        >
          <Spinner size="xl" />
          <Text as="p" mb={'60%'}>
            Carregando
          </Text>
        </Flex>
      ) : error ? (
        <Text as="p" color="red.500" mb={'60%'} mt={'5%'} textAlign={'center'}>
          {error}
        </Text>
      ) : paginatedGames.length === 0 ? (
        <Text as="p" fontSize="20" fontWeight="bold" textAlign="center" p={8} mb={'60%'}>
          Nenhum resultado encontrado.
        </Text>
      ) : (
        <>
          <Grid
            templateColumns={{
              base: '1fr',
              sm: '1fr',
              xs: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={[4, 4, 4, 6, 8]}
          >
            {paginatedGames.map((game, index) => (
              <Card
                key={game.game_url}
                title={game.title}
                thumbnail={game.thumbnail}
                genre={game.genre}
                short_description={game.short_description}
                game_url={game.game_url}
                isFavorite={game.isFavorite}
                rating={game.rating}
                onFavoriteClick={() => handleFavoriteClick(game)}
                onRatingClick={(ratingValue) => handleRatingClick(game, ratingValue)}
              />
            ))}
          </Grid>

          {showPagination && (
            <Flex as="div" mt={'12'} justifyContent="center">
              <ButtonGroup>
                {canGoPrevious && (
                  <Button
                    color={'white'}
                    bg={'transparent'}
                    size={'sm'}
                    p={'0'}
                    m={'0'}
                    colorScheme="teal"
                    variant="link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <ChevronLeftIcon />
                  </Button>
                )}

                {visiblePageNumbers.map((page, index) => (
                  <React.Fragment key={index}>
                    {page === '...' ? (
                      <Button
                        color={'white'}
                        bg={'transparent'}
                        size={'sm'}
                        p={'0'}
                        m={'0'}
                        colorScheme="teal"
                        variant="link"
                        onClick={handleEllipsisClick}
                        display={['none', 'none', 'block', 'block', 'block']}
                      >
                        {page}
                      </Button>
                    ) : (
                      <Button
                        color={'white'}
                        bg={'transparent'}
                        size={'sm'}
                        p={'0'}
                        m={'0'}
                        variant="link"
                        colorScheme={currentPage === page ? 'teal' : undefined}
                        onClick={() => handlePageChange(Number(page))}
                      >
                        {String(page)}
                      </Button>
                    )}
                  </React.Fragment>
                ))}

                {canGoNext && (
                  <Button
                    color={'white'}
                    bg={'transparent'}
                    size={'sm'}
                    p={'0'}
                    m={'0'}
                    colorScheme="teal"
                    variant="link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <ChevronRightIcon />
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
