import React from "react";
import { useUserData } from "../../contexts/UserDataProvider";
import { BsFillStarFill } from "react-icons/bs";
import "./Wishlist.css";
import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataProvider";

export const Wishlist = () => {
  const navigate = useNavigate();

  const {
    userDataState,
    isProductInCart,
    addToCartHandler,
    removeFromWishlistHandler,
    cartCountHandler,
  } = useUserData();

  const { loading } = useData();

  return (
    !loading &&
    (userDataState.wishlistProducts.length ? (
      <div className="wishlist-page-container">
        <h1 className="page-heading">Your Wishlist</h1>
        <div className="wishlist-products-container">
          {userDataState.wishlistProducts?.map((product) => (
            <div className="wishlist-card" key={product.name}>
              <div className="product-image-container">
                <img
                  className="product-image"
                  alt={product.name}
                  src={product.img}
                />
                {product.trending && <span className="trending-badge">Trending</span>}
                {!product.is_stock && <span className="out-of-stock-badge">Out of Stock</span>}
              </div>

              <div className="product-card-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="ratings">
                  {product.rating}
                  <BsFillStarFill color="#FFD700" /> 
                  <span className="reviews">({product.reviews} reviews)</span>
                </p>
                <div className="price-container">
                  <p className="original-price">₹{product.original_price}</p>
                  <p className="discount-price">₹{product.discounted_price}</p>
                </div>
                <p className="category">Gender: {product.category_name}</p>
              </div>

              <div className="wishlist-btn-container">
                <button
                  className={`cart-wishlist-btn ${isProductInCart(product) ? 'added-to-cart' : ''}`}
                  onClick={() =>
                    !isProductInCart(product)
                      ? addToCartHandler(product)
                      : cartCountHandler(product, "increment")
                  }
                >
                  {!isProductInCart(product) ? "Add to Cart" : "Added to Cart"}
                </button>
                <button
                  className="remove-from-wishlist-btn"
                  onClick={() => removeFromWishlistHandler(product)}
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="wishlist-empty-container">
        <h2 className="empty-wishlist-heading">Your Wishlist is Empty</h2>
        <p className="empty-wishlist-text">Explore our collection to find items you love</p>
        <button 
          className="explore-btn"
          onClick={() => navigate("/product-listing")}
        >
          Explore Products
        </button>
      </div>
    ))
  );
};