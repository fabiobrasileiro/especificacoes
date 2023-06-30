import React, { useState } from 'react';
import axios from 'axios';
import './form.css';

const Formulario = () => {
  const [formulario, setFormulario] = useState({
    objetivo: '',
    situacaoAtual: '',
    escopoProposta: '',
    especificacoesEquipamentos: '',
    materiais: '',
    equipamentos: '',
    servicos: '',
    suporteMensal: '',
    demaisCondicoes: '',
    imagens: [],
    descricoesImagens: [],
  });

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/enviar-dados', formulario);
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="formulario-container">
        <label>
          Objetivo:
          <input type="text" name="objetivo" value={formulario.objetivo} onChange={handleChange} />
        </label>
        <br />

        <label>
          Situação Atual:
          <input type="text" name="situacaoAtual" value={formulario.situacaoAtual} onChange={handleChange} />
        </label>
        <br />

        <label>
          Escopo da Proposta:
          <input type="text" name="escopoProposta" value={formulario.escopoProposta} onChange={handleChange} />
        </label>
        <br />

        <label>
          Especificações dos Equipamentos:
          <textarea name="especificacoesEquipamentos" value={formulario.especificacoesEquipamentos} onChange={handleChange} />
        </label>
        <br />

        <label>
          Materiais:
          <textarea name="materiais" value={formulario.materiais} onChange={handleChange} />
        </label>
        <br />

        <label>
          Equipamentos:
          <textarea name="equipamentos" value={formulario.equipamentos} onChange={handleChange} />
        </label>
        <br />

        <label>
          Serviços:
          <textarea name="servicos" value={formulario.servicos} onChange={handleChange} />
        </label>
        <br />

        <label>
          Suporte Mensal:
          <textarea name="suporteMensal" value={formulario.suporteMensal} onChange={handleChange} />
        </label>
        <br />

        <label>
          Demais Condições:
          <textarea name="demaisCondicoes" value={formulario.demaisCondicoes} onChange={handleChange} />
        </label>
        <br />

        <label>
          Imagens:
          <input type="file" name="imagens" onChange={handleChange} multiple />
        </label>
        <br />

        <label>
          Descrições das imagens:
          <textarea name="descricoesImagens" value={formulario.descricoesImagens} onChange={handleChange} />
        </label>
        <br />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;
