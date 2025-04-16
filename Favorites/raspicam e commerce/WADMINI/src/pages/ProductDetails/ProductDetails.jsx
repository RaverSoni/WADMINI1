import "./ProductDetails.css";
import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../contexts/DataProvider";
import { ProductImage } from "./components/ProductImage/ProductImage";
import { ProductDescription } from "./components/ProductDescription/ProductDescription";

export const ProductDetails = () => {
  const { state, loading } = useData();
  const { productId } = useParams();

  const selectedProduct = state.allProductsFromApi?.find(
    ({ id }) => Number(id) === Number(productId)
  );

  return (
    !loading && selectedProduct && (
      <div className="product-details-container">
        <div className="product-details-content">
          <ProductImage selectedProduct={selectedProduct} />
          <ProductDescription selectedProduct={selectedProduct} />
        </div>
      </div>
    )
  );
};