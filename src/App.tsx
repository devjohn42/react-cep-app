import { useState } from 'react';

import { Cep } from './types/types';

import './App.css';
import BuscaCep from './components/BuscaCep';

const App = () => {
  const [cep, setCep] = useState<Cep | null>(null);

  const handleCepFound = (cepData: Cep) => {
    setCep(cepData);
  };

  return (
    <div className='container'>
      <h1 className='title'>Buscador CEP</h1>
      <BuscaCep onCepFound={handleCepFound} />
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
