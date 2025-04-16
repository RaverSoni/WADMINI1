import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import React from "react";
import "./Filter.css";
import { useData } from "../../../../contexts/DataProvider";

export const Filter = () => {
  const { dispatch, state } = useData();
  const [isFilterMenuOn, setIsFilterMenuOn] = useState(false);

  return (
    <aside className="filter-sidebar">
      <div className={`filter-toggle ${isFilterMenuOn ? 'active' : ''}`}
        onClick={() => setIsFilterMenuOn(!isFilterMenuOn)}>
        {isFilterMenuOn ? (
          <RxCross2 className="filter-icon" />
        ) : (
          <TbAdjustmentsHorizontal className="filter-icon" />
        )}
        <span>Filters</span>
      </div>

      <div className={`filter-content ${isFilterMenuOn ? 'open' : ''}`}>
        <div className="filter-header">
          <h2>Filters</h2>
          <button
            className="reset-btn"
            onClick={() =>
              dispatch({
                type: "RESET",
                payload: {
                  rating: "",
                  categories: [],
                  price: [],
                  sort: "",
                },
              })
            }
          >
            Reset All
          </button>
        </div>

        <div className="filter-sections">
          {/* Price Filter */}
          <div className="filter-section">
            <h3 className="section-title">Price Range</h3>
            <div className="price-options">
              {[
                { id: "below-2000", label: "Below ₹2000", min: 0, max: 2000 },
                { id: "2000-5000", label: "₹2000 - ₹5000", min: 2000, max: 5000 },
                { id: "5000-10000", label: "₹5000 - ₹10000", min: 5000, max: 10000 },
                { id: "above-10000", label: "Over ₹10000", min: 10000, max: 50000 }
              ].map(({ id, label, min, max }) => (
                <div className="filter-option" key={id}>
                  <input
                    type="checkbox"
                    id={id}
                    checked={state.filters.price.some(p => p.min === min)}
                    onChange={() => dispatch({
                      type: "ADD_PRICE",
                      payload: { min, max }
                    })}
                  />
                  <label htmlFor={id}>{label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-section">
            <h3 className="section-title">Minimum Rating</h3>
            <div className="rating-slider">
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={state.filters.rating || 0}
                onChange={(e) => dispatch({
                  type: "ADD_RATINGS",
                  payload: Number(e.target.value)
                })}
              />
              <div className="rating-value">
                {state.filters.rating || 0} ★
              </div>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="filter-section">
            <h3 className="section-title">Categories</h3>
            <div className="category-options">
              {state.allCategories?.map(({ categoryName }) => (
                <div className="filter-option" key={categoryName}>
                  <input
                    type="checkbox"
                    id={`category-${categoryName}`}
                    checked={state.filters.categories.includes(categoryName)}
                    onChange={() => dispatch({
                      type: "ADD_CATEGORIES",
                      payload: categoryName
                    })}
                  />
                  <label htmlFor={`category-${categoryName}`}>
                    {categoryName}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="filter-section">
            <h3 className="section-title">Sort By</h3>
            <div className="sort-options">
              <div className="filter-option">
                <input
                  type="radio"
                  id="high-to-low"
                  name="sort"
                  checked={state.filters.sort === "highToLow"}
                  onChange={() => dispatch({
                    type: "ADD_SORT",
                    payload: "highToLow"
                  })}
                />
                <label htmlFor="high-to-low">Price: High to Low</label>
              </div>
              <div className="filter-option">
                <input
                  type="radio"
                  id="low-to-high"
                  name="sort"
                  checked={state.filters.sort === "lowToHigh"}
                  onChange={() => dispatch({
                    type: "ADD_SORT",
                    payload: "lowToHigh"
                  })}
                />
                <label htmlFor="low-to-high">Price: Low to High</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};