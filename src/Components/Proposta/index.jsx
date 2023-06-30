import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Proposta.css";

import Gallery from '../Galeria';

const Proposta = () => {
  const [proposta, setProposta] = useState(null);

  useEffect(() => {
    fetchProposta();
  }, []);

  const fetchProposta = async () => {
    try {
      const response = await axios.get('http://localhost:5000/dados-proposta');
      setProposta(response.data);
    } catch (error) {
      console.error('Erro ao buscar os dados da proposta:', error);
    }
  };

  if (!proposta) {
    return <div>Loading...</div>;
  }

  const { objetivo, situacaoAtual, detalhesServico, images } = proposta;

  return (
    <div className="proposal">
      <div className="cover-image">
        <img src="https://compos.net.br/emailMarketing/1.png" alt="Capa da Proposta" />
      </div>
      <div className="proposal-content">
        <h1>Proposta Comercial</h1>
        <section>
          <h2>Objetivo</h2>
          <p>{objetivo}</p>
        </section>
        <section>
          <h2>Situação Atual</h2>
          <ul>
            {situacaoAtual}
          </ul>
        </section>
        <section>
          <h2>Detalhes do Serviço</h2>
          <p>{detalhesServico}</p>
        </section>
        <Gallery images={images} />
      </div>
    </div>
  );
};

export default Proposta;
