import React, { useState } from "react";
import "./App.css";

import { FiSearch } from "react-icons/fi";

import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  // const handleInputChange = (event) => {
  //   setInput(event.target.value);
  // } => sem utilizar desestruturação

  // => utilizando desestruturação
  const handleInputChange = ({ target }) => {
    setInput(target.value);
  };

  async function handleSearch() {
    if (input === "") {
      alert("Favor, preencher o campo com algum CEP");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Opsss!! Erro ao buscar o cep...");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite um cep..."
          value={input} // o value sempre será o estado
          onChange={handleInputChange}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="mainContainer">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          {cep.complemento === "" || (<span>Complemento: {cep.complemento}</span>)}
          <span>Bairro: {cep.bairro}</span>
          <span>Localidade: {cep.localidade} - {cep.uf}</span>

        </main>
      )}
    </div>
  );
}

export default App;
