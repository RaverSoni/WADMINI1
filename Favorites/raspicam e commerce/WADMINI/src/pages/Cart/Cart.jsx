import { useState } from "react";
import "./Cart.css";
import { CartListing } from "./components/CartListing/CartListing";
import { Coupons } from "./components/Coupons/Coupons";
import { CartAmountSummary } from "./components/CartAmountSummary/CartAmountSummary";
import { useUserData } from "../../contexts/UserDataProvider";
import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataProvider";

export const Cart = () => {
  const [couponSelected, setCouponSelected] = useState([]);
  const { userDataState } = useUserData();
  const navigate = useNavigate();
  const { loading } = useData();

  return (
    !loading &&
    (userDataState.cartProducts.length ? (
      <div className="cart-page">
        <h1 className="cart-title">Your Shopping Cart</h1>
        <div className="cart-content">
          <div className="cart-items-section">
            <CartListing />
          </div>
          <div className="cart-summary-section">
            <Coupons
              couponSelected={couponSelected}
              setCouponSelected={setCouponSelected}
            />
            <CartAmountSummary couponSelected={couponSelected} />
          </div>
        </div>
      </div>
    ) : (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <h2 className="empty-cart-title">Your Cart is Empty</h2>
          <p className="empty-cart-message">
            Looks like you haven't added anything to your cart yet
          </p>
          <button
            className="explore-button"
            onClick={() => navigate("/product-listing")}
          >
            Explore Products
          </button>
        </div>
      </div>
    ))
  );
};