import React from 'react';
import { Select } from '@chakra-ui/react';

type SelectGenreProps = {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    genres: string[];
};

export function SelectGenre({ value, onChange, genres }: SelectGenreProps) {
    return (
        <Select 
            value={value} 
            onChange={onChange} 
            border="0"
            borderTop="2px"
            borderBottom="2px"
            borderColor="#242424"
            borderRadius="0"
            w="100%"
            color="#617582"
            _hover={{ color: 'white', borderColor: 'white' }}
            _focus={{ color: '#617582', border: "1px", borderColor: 'white' }}
        >
            <option value="">Todos os gêneros</option>
            {genres.map((genre) => (
                <option key={genre} value={genre}>
                    {genre}
                </option>
            ))}
        </Select>
    );
}
