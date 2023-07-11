import React, { useEffect, useState } from 'react';
import './SearchBox.css';
import axios from 'axios';

const SearchBox = ({ onSearch }) => {
  const [searchbox, setSearchBox] = useState([]);

  useEffect(() => {
    fetchProposta();
  }, []);

  const fetchProposta = async () => {
    try {
      const response = await axios.get('http://localhost:5000/dados-proposta');
      setSearchBox(response.data);
    } catch (error) {
      console.error('Erro ao buscar os dados da proposta:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search proposals..."
        value={searchbox.empresa}
        className="search-input"
        onChange={(e) => setSearchBox({ ...searchbox, empresa: e.target.value })}
      />
      <ul>
        {searchbox.map((item) => (
          <li key={item.id}>{item.empresa}</li>
        ))}
      </ul>
      <button type="submit" className="search-button">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBox;
