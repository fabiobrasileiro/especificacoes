import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    const obterFotos = async () => {
      try {
        // Fazer a chamada para o endpoint que retorna as fotos
        const response = await fetch('http://localhost:5000/uploads/');
        const data = await response.json();
        setFotos(data);
      } catch (error) {
        console.error('Erro ao obter fotos:', error);
      }
    };

    obterFotos();
  }, []);

  return (
    <div>
      {fotos.map((foto, index) => (
        <img key={index} src={foto} alt={`Foto ${index}`} />
      ))}
    </div>
  );
};

export default Gallery;
