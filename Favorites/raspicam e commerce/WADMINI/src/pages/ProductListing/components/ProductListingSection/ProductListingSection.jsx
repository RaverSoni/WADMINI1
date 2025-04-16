import "./ProductListingSection.css";
import Tilt from "react-parallax-tilt";
import React from "react";
import { useData } from "../../../../contexts/DataProvider";
import { Link } from "react-router-dom";
import { getCategoryWiseProducts } from "../../../../helpers/filter-functions/category";
import { getRatedProducts } from "../../../../helpers/filter-functions/ratings";
import { getPricedProducts } from "../../../../helpers/filter-functions/price";
import { getSortedProducts } from "../../../../helpers/filter-functions/sort";
import { getSearchedProducts } from "../../../../helpers/searchedProducts";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useUserData } from "../../../../contexts/UserDataProvider";
import { BsFillStarFill } from "react-icons/bs";

export const ProductListingSection = () => {
  const { state } = useData();
  const {
    isProductInCart,
    isProductInWishlist,
    wishlistHandler,
    addToCartHandler,
    cartLoading,
  } = useUserData();

  const {
    allProductsFromApi,
    inputSearch,
    filters: { rating, categories, price, sort },
  } = state;

  const searchedProducts = getSearchedProducts(allProductsFromApi, inputSearch);
  const ratedProducts = getRatedProducts(searchedProducts, rating);
  const categoryProducts = getCategoryWiseProducts(ratedProducts, categories);
  const pricedProducts = getPricedProducts(categoryProducts, price);
  const sortedProducts = getSortedProducts(pricedProducts, sort);

  return (
    <div className="products-grid">
      {!sortedProducts.length ? (
        <div className="no-products-message">
          <h3>No Products Found</h3>
          <p>We couldn't find any products matching your criteria.</p>
        </div>
      ) : (
        sortedProducts.map((product) => {
          const {
            _id,
            id,
            name,
            original_price,
            discounted_price,
            category_name,
            is_stock,
            rating,
            reviews,
            trending,
            img,
          } = product;

          const isDiscounted = original_price > discounted_price;
          const discountPercentage = isDiscounted 
            ? Math.round(((original_price - discounted_price) / original_price) * 100)
            : 0;

          return (
            <Tilt
              key={_id}
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              glareEnable={false}
              transitionSpeed={2000}
              scale={1.02}
            >
              <div className="product-card">
                <Link to={`/product-details/${id}`} className="product-link">
                  <div className="product-image-container">
                    <div className="image-wrapper">
                      <img 
                        src={img} 
                        alt={name} 
                        className="product-image"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
                        }}
                      />
                    </div>
                    {isDiscounted && (
                      <span className="discount-badge">
                        {discountPercentage}% OFF
                      </span>
                    )}
                    {trending && (
                      <span className="trending-badge">Trending</span>
                    )}
                    {!is_stock && (
                      <span className="stock-badge">Out of Stock</span>
                    )}
                  </div>
                </Link>

                {/* Rest of the product card content remains the same */}
                <div className="product-details">
                  <h3 className="product-name">{name}</h3>
                  
                  <div className="product-rating">
                    <BsFillStarFill className="star-icon" />
                    <span>{rating}</span>
                    <span className="review-count">({reviews})</span>
                  </div>

                  <div className="price-container">
                    <span className="current-price">₹{discounted_price}</span>
                    {isDiscounted && (
                      <span className="original-price">₹{original_price}</span>
                    )}
                  </div>

                  <p className="product-category">{category_name}</p>
                </div>

                <div className="product-actions">
                  <button
                    disabled={cartLoading || !is_stock}
                    onClick={() => addToCartHandler(product)}
                    className={`action-btn ${isProductInCart(product) ? 'in-cart' : ''}`}
                  >
                    {isProductInCart(product) ? "Go to Cart" : "Add to Cart"}
                  </button>
                  <button
                    onClick={() => wishlistHandler(product)}
                    className="wishlist-btn"
                    disabled={cartLoading}
                  >
                    {isProductInWishlist(product) ? (
                      <AiFillHeart className="wishlist-icon filled" />
                    ) : (
                      <AiOutlineHeart className="wishlist-icon" />
                    )}
                  </button>
                </div>
              </div>
            </Tilt>
          );
        })
      )}
    </div>
  );
};