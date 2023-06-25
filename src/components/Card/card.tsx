import React from 'react';
import { Box, GridItem, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';

type CardProps = {
    title: string;
    image: string;
    genre: string;
    description: string;
};

export function Card({ title, image, genre, description }: CardProps) {
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
            >
                <Box as="div" borderBottom="1px" borderRadius="8">
                    <Image
                        className="jogo"
                        src={image}
                        alt={title}
                        width={200}
                        height={300}
                    />
                </Box>
                <Box as="div" p={4}>
                    <Text as="h2" fontSize={'2xl'} fontWeight={'600'} mb={4}>
                        {title}
                    </Text>
                    <Text fontSize={'16'} color={'#a5a5a5'}>{genre}</Text>
                    {description && <Text>Descrição: {description}</Text>}
                </Box>
            </Box>
        </GridItem>
    );
}
