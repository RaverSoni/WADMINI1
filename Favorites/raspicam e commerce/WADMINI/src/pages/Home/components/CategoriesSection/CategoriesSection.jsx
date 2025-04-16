import React from "react";
import { useData } from "../../../../contexts/DataProvider";
import { Link } from "react-router-dom";
import "./CategoriesSection.css";

export const CategoriesSection = () => {
  const { state, dispatch } = useData();
  
  return (
    <section className="categories-section">
      <h2 className="section-title">Explore Categories</h2>
      <div className="categories-grid">
        {state.allCategories.map(({ _id, categoryName, img }) => (
          <Link
            key={_id}
            to="/product-listing"
            className="category-card"
            onClick={() =>
              dispatch({
                type: "ADD_CATEGORIES_FROM_HOME",
                payload: categoryName,
              })
            }
          >
            <div className="category-image-container">
              <img 
                src={img} 
                alt={categoryName} 
                className="category-image"
                loading="lazy"
              />
              <div className="category-overlay"></div>
            </div>
            <h3 className="category-title">{categoryName}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};