import "./ProductDescription.css";
import React from "react";
import { BsFillStarFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { useUserData } from "../../../../contexts/UserDataProvider";

export const ProductDescription = ({ selectedProduct }) => {
  const {
    addToCartHandler,
    wishlistHandler,
    isProductInCart,
    isProductInWishlist,
    cartLoading
  } = useUserData();

  return (
    <div className="product-description">
      <div className="product-header">
        <h1 className="product-title">{selectedProduct?.name}</h1>
        
        <div className="product-rating">
          <span className="rating-value">{selectedProduct?.rating}</span>
          <BsFillStarFill className="rating-icon" />
          <span className="review-count">({selectedProduct?.reviews} reviews)</span>
        </div>
      </div>

      <div className="price-container">
        <span className="discounted-price">₹{selectedProduct?.discounted_price}</span>
        {selectedProduct?.discounted_price < selectedProduct?.original_price && (
          <span className="original-price">₹{selectedProduct?.original_price}</span>
        )}
      </div>

      <div className="product-meta">
        <div className="meta-item">
          <span className="meta-label">Category:</span>
          <span className="meta-value">{selectedProduct?.category_name}</span>
        </div>
        
        <div className="meta-item">
          <span className="meta-label">Size:</span>
          <span className="meta-value">{selectedProduct?.size}</span>
        </div>
      </div>

      <div className="product-tags">
        {!selectedProduct?.is_stock && (
          <span className="tag out-of-stock">Out of Stock</span>
        )}
        {selectedProduct?.trending && (
          <span className="tag trending">Trending</span>
        )}
      </div>

      <div className="product-description-text">
        <h3 className="description-title">Description</h3>
        <p>{selectedProduct?.description}</p>
      </div>

      <div className="product-actions">
        <button
          disabled={cartLoading || !selectedProduct?.is_stock}
          onClick={() => addToCartHandler(selectedProduct)}
          className={`action-btn cart-btn ${isProductInCart(selectedProduct) ? 'in-cart' : ''}`}
        >
          <FiShoppingCart className="action-icon" />
          {isProductInCart(selectedProduct) ? "Go to Cart" : "Add to Cart"}
        </button>
        
        <button
          disabled={cartLoading}
          onClick={() => wishlistHandler(selectedProduct)}
          className={`action-btn wishlist-btn ${isProductInWishlist(selectedProduct) ? 'in-wishlist' : ''}`}
        >
          {isProductInWishlist(selectedProduct) ? (
            <BsHeartFill className="action-icon" />
          ) : (
            <BsHeart className="action-icon" />
          )}
          {isProductInWishlist(selectedProduct) ? "In Wishlist" : "Wishlist"}
        </button>
      </div>
    </div>
  );
};