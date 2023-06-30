import React from 'react';
import './Galeria.css';

const Gallery = ({ images }) => {
  return (
    <div className="gallery">
      {images.map((image, index) => (
        <div key={index} className="gallery-item">
          <img src={image} alt={image.alt} className="gallery-image" />
          <div className="gallery-description">{image.description}</div>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
