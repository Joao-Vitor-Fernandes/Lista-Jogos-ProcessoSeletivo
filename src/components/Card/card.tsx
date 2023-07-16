import React, { useState } from 'react';
import { Box, Button, GridItem, HStack, Heading, Text } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsStarFill, BsStarHalf, BsStar, BsBorderBottom } from 'react-icons/bs';
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
    const [isHovered, setIsHovered] = useState(false);
    const [userRating, setUserRating] = useState<number | null>(null);

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
        if (auth.currentUser) {
            setUserRating(ratingValue);
            onRatingClick(ratingValue);
        } else {
            router.push('/login');
        }
    };

    const handleCardHover = () => {
        setIsHovered(true);
    };

    const handleCardLeave = () => {
        setIsHovered(false);
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
                    onClick={auth.currentUser ? handleFavoriteButtonClick : handleLoginRedirect}
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
                    onClick={auth.currentUser ? handleFavoriteButtonClick : handleLoginRedirect}
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

        // Renderizar as 4 estrelas
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
                    onClick={(event) => {
                        if (auth.currentUser) {
                            handleRatingButtonClick(event, i + 1);
                        } else {
                            handleLoginRedirect();
                        }
                    }}
                    marginRight="-16px"
                    pl={'-8px'}
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
        <GridItem as="article" mx={{ base: '0', sm: '8', xs: '0', md: '0', lg: '0' }}>
            <Box
                bg="#1c242c"
                borderRadius="8"
                overflow="hidden"
                cursor="pointer"
                transition="transform .3s ease-in-out, box-shadow .3s ease-in-out"
                transform={isHovered ? 'scale(1.05)' : 'scale(1)'}
                boxShadow={isHovered ? 'md' : 'none'}
                onMouseEnter={handleCardHover}
                onMouseLeave={handleCardLeave}
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
                <Box as="div" pr={6} py={4} pl={1} display="flex" justifyContent="space-between" gap={'2'}>
                    {user ? (
                        <>
                            {renderFavoriteButton()}
                            <Box ml={'-6rem'}>{renderRatingButtons()}</Box>
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
                                }}
                                onClick={handleLoginRedirect}
                            >
                                <AiOutlineHeart />
                            </Button>
                            <Button
                                borderRadius="0"
                                color="#316be2"
                                variant="link"
                                transition="color .3s ease-in-out, box-shadow .3s ease-in-out"
                                _hover={{
                                    color: 'white',
                                }}
                                onClick={handleLoginRedirect}
                                ml={'-10rem'}
                            >
                                <BsStar />
                            </Button>
                        </>
                    )}
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
                        >
                            Leia Mais
                        </Button>
                    </a>
                </Box>
            </Box>
        </GridItem>
    );
}
