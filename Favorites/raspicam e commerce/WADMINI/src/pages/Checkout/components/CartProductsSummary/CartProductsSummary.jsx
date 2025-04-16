import "./CartProductsSummary.css";
import React from "react";
import { useUserData } from "../../../../contexts/UserDataProvider";

export const CartProductsSummary = () => {
  const { userDataState } = useUserData();

  return (
    <div className="cart-summary">
      <h2 className="summary-title">Your Order</h2>
      
      <div className="products-list">
        {userDataState.cartProducts?.map(({ id, img, name, qty, discounted_price }) => (
          <div key={id} className="product-item">
            <div className="product-image-container">
              <img 
                src={img} 
                alt={name} 
                className="product-image"
                loading="lazy"
              />
              <span className="product-quantity">{qty}</span>
            </div>
            
            <div className="product-info">
              <h3 className="product-name">{name}</h3>
              <p className="product-price">₹{discounted_price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};