import React from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./CartListing.css";
import { useUserData } from "../../../../contexts/UserDataProvider";

export const CartListing = () => {
  const {
    userDataState,
    isProductInWishlist,
    removeFromCartHandler,
    wishlistHandler,
    cartCountHandler,
    cartLoading,
  } = useUserData();

  return (
    <div className="cart-items-container">
      {userDataState.cartProducts.map((product) => (
        <div className="cart-item" key={product.id}>
          <div className="product-image">
            <img src={product.img} alt={product.name} />
          </div>
          
          <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.discounted_price.toFixed(2)}</p>
            <p className="product-size">Size: {product.size}</p>
            
            <div className="quantity-control">
              <button
                disabled={cartLoading || product.qty <= 1}
                className="quantity-btn"
                onClick={() => cartCountHandler(product, "decrement")}
              >
                −
              </button>
              <span className="quantity">{product.qty}</span>
              <button
                disabled={cartLoading}
                className="quantity-btn"
                onClick={() => cartCountHandler(product, "increment")}
              >
                +
              </button>
            </div>
          </div>
          
          <div className="product-actions">
            <button 
              className="action-btn delete-btn"
              onClick={() => removeFromCartHandler(product)}
              disabled={cartLoading}
            >
              <MdDelete size={20} />
            </button>
            
            <button 
              className="action-btn wishlist-btn"
              onClick={() => wishlistHandler(product)}
              disabled={cartLoading}
            >
              {isProductInWishlist(product) ? (
                <AiFillHeart size={20} color="#f44336" />
              ) : (
                <AiOutlineHeart size={20} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};