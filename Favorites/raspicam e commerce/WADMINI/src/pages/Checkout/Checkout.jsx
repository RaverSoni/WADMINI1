import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataProvider";
import { useUserData } from "../../contexts/UserDataProvider";
import "./Checkout.css";
import { AddressSection } from "./components/AddressSection/AddressSection";
import { OrderSummary } from "./components/OrderSummary/OrderSummary";

export const Checkout = () => {
  const { userDataState } = useUserData();
  const navigate = useNavigate();
  const { loading } = useData();

  return (
    !loading &&
    (userDataState.cartProducts.length ? (
      <div className="checkout-page">
        <h1 className="checkout-heading">Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-section">
            <AddressSection />
          </div>
          <div className="checkout-section">
            <OrderSummary />
          </div>
        </div>
      </div>
    ) : (
      <div className="empty-checkout">
        <div className="empty-checkout-content">
          <h2 className="empty-checkout-title">Your Cart is Empty</h2>
          <p className="empty-checkout-message">
            There are no items in your cart to checkout
          </p>
          <button
            className="explore-button"
            onClick={() => navigate("/product-listing")}
          >
            Browse Products
          </button>
        </div>
      </div>
    ))
  );
};