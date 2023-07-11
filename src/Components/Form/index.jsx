import React, { useState } from 'react';
import axios from 'axios';
import './form.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Formulario = () => {
  const [formulario, setFormulario] = useState({
    objetivo: '',
    situacaoAtual: '',
    fotoSituacao: null, // Adicione o campo fotoSituacao ao estado do formulário
    escopoProposta: '',
    fotoEscopo: null, // Adicione o campo fotoEscopo ao estado do formulário
    materiais: '',
    equipamentos: '',
    servicos: '',
    suporteMensal: '',
    demaisCondicoes: '',
    empresa: ''
  });

  const handleChange = (name, value) => {
    setFormulario({ ...formulario, [name]: value });
  };

  const handleFileChange = (name, file) => {
    setFormulario({ ...formulario, [name]: file });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    formData.append('objetivo', formulario.objetivo);
    formData.append('situacaoAtual', formulario.situacaoAtual);
    formData.append('escopoProposta', formulario.escopoProposta);
    formData.append('materiais', formulario.materiais);
    formData.append('equipamentos', formulario.equipamentos);
    formData.append('servicos', formulario.servicos);
    formData.append('suporteMensal', formulario.suporteMensal);
    formData.append('demaisCondicoes', formulario.demaisCondicoes);
    formData.append('empresa', formulario.empresa);
    formData.append('fotoSituacao', formulario.fotoSituacao); // Certifique-se de que o campo está sendo adicionado corretamente
    formData.append('fotoEscopo', formulario.fotoEscopo); // Certifique-se de que o campo está sendo adicionado corretamente
  
    console.log('Conteúdo do formulário:', formData);
  
    try {
      const response = await axios.post('http://localhost:5000/enviar-dados', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Limpar o formulário após o envio bem-sucedido
      setFormulario({
        objetivo: '',
        situacaoAtual: '',
        fotoSituacao: null,
        escopoProposta: '',
        fotoEscopo: null,
        materiais: '',
        equipamentos: '',
        servicos: '',
        suporteMensal: '',
        demaisCondicoes: '',
        empresa: '',
        caminhoImagensSituacaoAtual: [], // Campo de imagens da Situação Atual
        caminhoImagensEscopoProposta: [], 
      });
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit} className="formulario-container">
        <label>
          Empresa:
          <ReactQuill value={formulario.empresa} onChange={(value) => handleChange('empresa', value)} />

        </label>
        <br />

        <label>
          Objetivo:
          <ReactQuill value={formulario.objetivo} onChange={(value) => handleChange('objetivo', value)} />
        </label>
        <br />

        <label>
          Situação Atual:
          <ReactQuill value={formulario.situacaoAtual} onChange={(value) => handleChange('situacaoAtual', value)} />
        </label>
        <br />

        <label>
          Foto Situação:
          <input type="file" onChange={(e) => handleFileChange('fotoSituacao', e.target.files[0])} />
        </label>
        <br />

        <label>
          Escopo da Proposta:
          <ReactQuill value={formulario.escopoProposta} onChange={(value) => handleChange('escopoProposta', value)} />
        </label>
        <br />

        <label>
          Foto Escopo:
          <input type="file" onChange={(e) => handleFileChange('fotoEscopo', e.target.files[0])} />
        </label>
        <br />

        <label>
          Materiais:
          <ReactQuill value={formulario.materiais} onChange={(value) => handleChange('materiais', value)} />
        </label>
        <br />

        <label>
          Equipamentos:
          <ReactQuill value={formulario.equipamentos} onChange={(value) => handleChange('equipamentos', value)} />
        </label>
        <br />

        <label>
          Serviços:
          <ReactQuill value={formulario.servicos} onChange={(value) => handleChange('servicos', value)} />
        </label>
        <br />

        <label>
          Suporte Mensal:
          <ReactQuill value={formulario.suporteMensal} onChange={(value) => handleChange('suporteMensal', value)} />
        </label>
        <br />

        <label>
          Demais Condições:
          <ReactQuill value={formulario.demaisCondicoes} onChange={(value) => handleChange('demaisCondicoes', value)} />
        </label>
        <br />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;
