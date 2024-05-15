import { ChangeEvent, useState } from 'react';
import './App.css';

import { FiSearch } from 'react-icons/fi';

import api from './services/api';

interface Cep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [cep, setCep] = useState<Cep | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = ({
    target
  }: ChangeEvent<EventTarget & HTMLInputElement>) => {
    setInput(target.value);
  };

  const handleSearch = async () => {
    if (input === '') {
      alert('Favor, preencher o campo com algum CEP');
      return;
    }

    try {
      setLoading(true);
      const response = await api.get<Cep>(`${input}/json`);
      setCep(response.data);
      setLoading(false);
      // setInput('');
    } catch (error) {
      setError(true);
      setLoading(false);
      alert('Opsss!! Erro ao buscar o cep...');
      // setInput('');
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>Buscador CEP</h1>

      <div className='containerInput'>
        <input
          type='text'
          placeholder='Digite um cep...'
          value={input} // o value sempre será o estado
          onChange={handleInputChange}
        />
        <button className='buttonSearch' onClick={handleSearch}>
          <FiSearch size={25} color='#fff' />
        </button>
      </div>
      {loading && <p>Carregando</p>}
      {error && <p>Error ao buscar o cep...</p>}
      {cep && (
        <main className='mainContainer'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          {cep.complemento === '' || (
            <span>Complemento: {cep.complemento}</span>
          )}
          <span>Bairro: {cep.bairro}</span>
          <span>
            Localidade: {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
};

export default App;
