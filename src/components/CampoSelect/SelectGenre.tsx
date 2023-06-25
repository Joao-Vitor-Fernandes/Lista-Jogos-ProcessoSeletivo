import React from 'react';
import { Select } from '@chakra-ui/react';

type SelectGenreProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  genres: string[];
};

export function SelectGenre({ value, onChange, genres }: SelectGenreProps) {
  return (
    <Select value={value} onChange={onChange} bg="#242424" borderRadius="20" w="100%">
      <option value="">Todos os gêneros</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </Select>
  );
}