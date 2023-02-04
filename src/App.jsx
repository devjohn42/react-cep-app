import React from "react";
import "./App.css";

import { FiSearch } from "react-icons/fi";

function App() {
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite um cep..." />
        <button className="buttonSearch">
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      <main className="mainContainer">
        <h2>CEP: 24456-435</h2>

        <span>Rua Justo Brito Snaches</span>
        <span>Complemento: Algum Complemento</span>
        <span>Trindade</span>
        <span>São Gonçalo - RJ</span>
      </main>
    </div>
  );
}

export default App;
