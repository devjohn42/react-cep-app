import { ChangeEvent, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Cep } from '../types/types';
import { FiSearch } from 'react-icons/fi';

interface Props {
  onCepFound: (cep: Cep) => void;
}

const fetchCep = async (cep: string): Promise<Cep> => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json`);
  if (!response.ok) {
    throw new Error('Opsss!! Erro ao buscar o cep...');
  }
  return response.json();
};

const BuscaCep = ({ onCepFound }: Props) => {
  const [input, setInput] = useState<string>('');
  const [enabled, setEnabled] = useState<boolean>(false);

  const { data, error, isLoading } = useQuery<Cep>({
    queryKey: ['cep', input],
    queryFn: () => fetchCep(input),
    enabled
  });

  const handleInputChange = ({
    target
  }: ChangeEvent<EventTarget & HTMLInputElement>) => {
    setInput(target.value);
  };

  useEffect(() => {
    if (data) {
      onCepFound(data);
      setEnabled(false);
    }
  }, [data, onCepFound]);

  const handleSearch = async () => {
    if (input === '') {
      alert('Favor, preencher o campo com algum CEP');
      return;
    }
    setEnabled(true);
  };

  return (
    <>
      <div className='containerInput'>
        <input
          type='text'
          placeholder='Digite o cep...'
          value={input}
          onChange={handleInputChange}
        />
        <button className='buttonSearch' onClick={handleSearch}>
          <FiSearch className='buttonSearchIcon' />
        </button>
      </div>
      <div className='handlerSearching'>
        {isLoading && <p>Procurando...</p>}
        {error && <p>{(error as Error).message}</p>}
      </div>
    </>
  );
};

export default BuscaCep;
