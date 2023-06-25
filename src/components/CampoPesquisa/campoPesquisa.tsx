import React from 'react';
import { Input } from '@chakra-ui/react';

type CampoPesquisaProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CampoPesquisa({ value, onChange }: CampoPesquisaProps) {
  return (
    <Input
      type="text"
      bg={'#242424'}
      borderRadius={'20'}
      placeholder="Buscar por título"
      value={value}
      onChange={onChange}
      w={'100%'}
      pr={'20'}
    />
  );
}