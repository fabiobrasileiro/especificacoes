  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import './Proposta.css';
  import Gallery from '../Galeria'

  const Proposta = () => {
    const [proposta, setProposta] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProposta, setFilteredProposta] = useState([]);
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);

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

    useEffect(() => {
      const filtered = proposta.filter((item) => item.empresa && item.empresa.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredProposta(filtered);
      setSelectedEmpresa(null);
    }, [searchTerm, proposta]);
    

    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleEmpresaClick = (empresa) => {
      setSelectedEmpresa(empresa);
    };

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Pesquisar propostas por nome" />
          {filteredProposta.length === 0 ? (
            <div>Nenhum resultado encontrado.</div>
          ) : (
            <ul>
              {filteredProposta.map((item) => (
                <li key={item.id} onClick={() => handleEmpresaClick(item.empresa)}>
                  {item.empresa}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="proposal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 400px' }}>

          {selectedEmpresa && (
            <div>
              <div className="cover-image">
                <img src="https://compos.net.br/especificacoes_tecnicas/1.png" alt="Capa da Proposta" />
                <img style={{ marginTop: '-150px', zIndex: 9}} src="https://compos.net.br/especificacoes_tecnicas/4.png" alt="Quem somos" />
                <img  style={{ marginTop: '-400px', zIndex: 9,}}src="https://compos.net.br/especificacoes_tecnicas/5.png" alt="Serviços" />
              </div>
              {proposta
                .filter((item) => item.empresa === selectedEmpresa)
                .map((item) => (
                  <div key={item.id}>
                    <div style={{ padding: '0 200px' }}>
                      <h2 style={{ marginBottom: '10px', borderBottom: '1px solid black', fontSize: '24px' }}>Cliente</h2>
                      <div dangerouslySetInnerHTML={{ __html: item.empresa}}></div>

                      <h2 style={{ marginBottom: '10px', borderBottom: '1px solid black', fontSize: '24px' }}>Objetivo</h2>
                      <div dangerouslySetInnerHTML={{ __html: item.objetivo }}></div>

                      <h2 style={{ marginBottom: '10px', borderBottom: '1px solid black', fontSize: '24px' }}>Situação Atual</h2>
                      <div dangerouslySetInnerHTML={{ __html: item.situacaoAtual }}></div>


                      <h2 style={{ marginBottom: '10px', borderBottom: '1px solid black', fontSize: '24px' }}>Escopo da Proposta</h2>
                      <div dangerouslySetInnerHTML={{ __html: item.escopoProposta }}></div>

                      <h2 style={{ marginBottom: '10px', borderBottom: '1px solid black', fontSize: '24px' }}>Materiais</h2>
                      <div dangerouslySetInnerHTML={{ __html: item.materiais }}></div>

                      <h2 style={{ marginBottom: '10px', borderBottom: '1px solid black', fontSize: '24px' }}>Equipamentos</h2>
                      <div dangerouslySetInnerHTML={{ __html: item.equipamentos }}></div>

                      <h2 style={{ marginBottom: '10px', borderBottom: '1px solid black', fontSize: '24px' }}>Serviços</h2>
                      <div dangerouslySetInnerHTML={{ __html: item.servicos }}></div>

                      <h2 style={{ marginBottom: '10px', borderBottom: '1px solid black', fontSize: '24px' }}>Suporte Mensal</h2>
                      <div dangerouslySetInnerHTML={{ __html: item.suporteMensal }}></div>

                      <h2 style={{ marginBottom: '10px', borderBottom: '1px solid black', fontSize: '24px' }}>Demais Condições</h2>
                      <div dangerouslySetInnerHTML={{ __html: item.demaisCondicoes }}></div>

                      
                    </div>
                  </div>
                ))}
            </div>
          )}
          
        </div>
      </>
    );
  };

  export default Proposta;
