import React from 'react';
import { Box, Button, GridItem, Heading, Text } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type CardProps = {
    title: string;
    thumbnail: string;
    genre: string;
    short_description: string;
    game_url: string;
};

export function Card({ title, thumbnail, genre, short_description, game_url, }: CardProps) {
    const router = useRouter();

    const handleButtonClick = () => {
        window.open(game_url, '_blank');
    };

    return (
        <GridItem as="section">
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
                minW={'300px'}
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
                <Box as="div" p={4} display="flex" justifyContent="end">
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
                </Box>
            </Box>
        </GridItem>
    );
}
