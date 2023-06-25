import React from 'react';
import { Box, GridItem, Heading, Text } from '@chakra-ui/react';
// import Image from 'next/image';
import { Image } from '@chakra-ui/react'

type CardProps = {
    title: string;
    thumbnail: string;
    genre: string;
    short_description: string;
};

export function Card({ title, thumbnail, genre, short_description }: CardProps) {
    console.log(thumbnail)

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
                cursor={'pointer'}
                w={'100%'}
                minW={'300px'}
                minH={'350px'}
            >
                <Box as="div" borderBottom="1px" borderRadius="8" 
                    width={{ base: "500", md: "500" }} 
                    // height={{ base: "100px", md: "100px", lg: "400" }}
                >
                    <Image
                        className="jogo"
                        src={thumbnail}
                        alt={title}
                        // boxSize='300px'
                        objectFit='cover'
                    />

                </Box>
                <Box as="div" p={4}>
                    <Text as="h2" fontSize={'2xl'} fontWeight={'600'} mb={4}>
                        {title}
                    </Text>
                    <Text fontSize={'16'} color={'#a5a5a5'}>{genre}</Text>
                    {short_description && <Text noOfLines={3} maxW="50ch" >Descrição: {short_description}</Text>}
                </Box>
            </Box>
        </GridItem>
    );
}
