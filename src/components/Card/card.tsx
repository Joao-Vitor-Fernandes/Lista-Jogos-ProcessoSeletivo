import React, { useState } from 'react';
import { Box, Button, GridItem, Heading, Text } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { auth } from 'config/firebase';

type CardProps = {
    title: string;
    thumbnail: string;
    genre: string;
    short_description: string;
    game_url: string;
    isFavorite: boolean;
    rating: number;
    onFavoriteClick: () => void;
    onRatingClick: (rating: number) => void;
};

export function Card({
    title,
    thumbnail,
    genre,
    short_description,
    game_url,
    isFavorite,
    rating,
    onFavoriteClick,
    onRatingClick,
}: CardProps) {
    const router = useRouter();
    const [userRating, setUserRating] = useState<number | null>(null);

    const handleButtonClick = () => {
        window.open(game_url, '_blank');
    };

    const handleFavoriteButtonClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onFavoriteClick();
    };

    const handleRatingButtonClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        ratingValue: number
    ) => {
        event.stopPropagation();
        setUserRating(ratingValue);
        onRatingClick(ratingValue);
    };

    const renderFavoriteButton = () => {
        if (isFavorite) {
            return (
                <Button
                    borderRadius="0"
                    color="#316be2"
                    variant="link"
                    transition="color .3s ease-in-out, box-shadow .3s ease-in-out"
                    _hover={{
                        color: 'white',
                    }}
                    onClick={handleFavoriteButtonClick}
                >
                    <AiFillHeart color="red" />
                </Button>
            );
        } else {
            return (
                <Button
                    borderRadius="0"
                    color="#316be2"
                    variant="link"
                    transition="color .3s ease-in-out, box-shadow .3s ease-in-out"
                    _hover={{
                        color: 'white',
                    }}
                    onClick={handleFavoriteButtonClick}
                >
                    <AiOutlineHeart />
                </Button>
            );
        }
    };

    const renderRatingButtons = () => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        const ratingButtons = [];

        // Ajuste para exibir 4 estrelas
        for (let i = 0; i < 4; i++) {
            ratingButtons.push(
                <Button
                    key={i}
                    borderRadius="0"
                    color={userRating !== null && i < userRating ? '#d1b238' : '#316be2'}
                    variant="link"
                    transition="color .3s ease-in-out, box-shadow .3s ease-in-out"
                    _hover={{
                        color: 'white',
                    }}
                    onClick={(event) => handleRatingButtonClick(event, i + 1)}
                >
                    {i + 1 <= (userRating !== null ? userRating : fullStars) ? (
                        <BsStarFill />
                    ) : i + 1 === fullStars + 1 && hasHalfStar ? (
                        <BsStarHalf />
                    ) : (
                        <BsStar />
                    )}
                </Button>
            );
        }

        return ratingButtons;
    };

    const user = auth.currentUser; // Obtém o usuário atualmente autenticado

    const handleLoginRedirect = () => {
        router.push('/login');
    };

    return (
        <GridItem
            as="section"
            mx={{ base: '0', sm: '8', xs: '0', md: '0', lg: '0' }}
        >
            <Box
                bg="#1c242c"
                borderRadius="8"
                overflow="hidden"
                transition="border-color 0.3s"
                _hover={{ borderColor: 'white' }}
                borderWidth="1px"
                borderColor="transparent"
                cursor="pointer"
                w={'100%'}
                minW={'250px'}
                minH={'350px'}
            >
                <Box
                    as="div"
                    borderBottom="1px"
                    borderRadius="8"
                    width={{ base: '500', md: '500' }}
                >
                    <Image
                        className="jogo"
                        src={thumbnail}
                        alt={title}
                        objectFit="cover"
                        width="100%"
                        minW={'250px'}
                    />
                </Box>
                <Box as="div" pt={4} px={4}>
                    <Text as="h2" fontSize={'2xl'} fontWeight={'600'} mb={4}>
                        {title}
                    </Text>
                    <Text fontSize={'16'} color={'#a5a5a5'}>
                        {genre}
                    </Text>
                    {short_description && (
                        <Text noOfLines={2} maxW="50ch">
                            {short_description}
                        </Text>
                    )}
                </Box>
                <Box as="div" p={4} display="flex" justifyContent="end" gap={'2'}>
                    <a href={game_url} target="_blank" rel="noopener noreferrer">
                        <Button
                            borderRadius="0"
                            color="#316be2"
                            variant="link"
                            transition="color .3s ease-in-out, box-shadow .3s ease-in-out"
                            _hover={{
                                color: 'white',
                                boxShadow: 'inset 0 -2px 0 white',
                            }}
                            onClick={handleButtonClick}
                        >
                            Leia Mais
                        </Button>
                    </a>
                    {user ? (
                        <>
                            {renderFavoriteButton()}
                            <Box ml={2}>{renderRatingButtons()}</Box>
                        </>
                    ) : (
                        <>
                            <Button
                                borderRadius="0"
                                color="#316be2"
                                variant="link"
                                transition="color .3s ease-in-out, box-shadow .3s ease-in-out"
                                _hover={{
                                    color: 'white',
                                    boxShadow: 'inset 0 -2px 0 white',
                                }}
                                onClick={handleLoginRedirect}
                            >
                                L avaliar
                            </Button>
                            <Button
                                borderRadius="0"
                                color="#316be2"
                                variant="link"
                                transition="color .3s ease-in-out, box-shadow .3s ease-in-out"
                                _hover={{
                                    color: 'white',
                                    boxShadow: 'inset 0 -2px 0 white',
                                }}
                                onClick={handleLoginRedirect}
                            >
                                L favoritar
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
        </GridItem>
    );
}
