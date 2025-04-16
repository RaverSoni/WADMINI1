import "./ProductImage.css";
import Tilt from "react-parallax-tilt";
import React from "react";

export const ProductImage = ({ selectedProduct }) => {
  return (
    <div className="product-image-container">
      <Tilt
        tiltEnable={true}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        scale={1.03}
        transitionSpeed={1000}
        className="product-image-tilt"
      >
        <img 
          src={selectedProduct?.img} 
          alt={selectedProduct?.name} 
          className="product-image"
          loading="eager"
        />
      </Tilt>
    </div>
  );
};