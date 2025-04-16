import "./DeliveryAddress.css";
import { useUserData } from "../../../../contexts/UserDataProvider";
import { v4 as uuid } from "uuid";
import { addOrderService } from "../../../../services/order-services/addOrderService";
import { clearCartService } from "../../../../services/cart-services/clearCartService";
import React from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

export const DeliveryAddress = () => {
  const { userDataState, dispatch, clearCartHandler } = useUserData();
  const { auth, setCurrentPage } = useAuth();
  const navigate = useNavigate();

  const {
    cartProducts,
    addressList,
    orderDetails: { cartItemsDiscountTotal, orderAddress },
  } = userDataState;

  const KEY_ID = "rzp_test_VAxHG0Dkcr9qc6";
  const totalAmount = Number(cartItemsDiscountTotal) || 0;
  const userContact = addressList?.find(({ _id }) => _id === orderAddress?._id)?.phone;

  const successHandler = (response) => {
    const paymentId = response.razorpay_payment_id;
    const orderId = uuid();
    const order = {
      paymentId,
      orderId,
      amountPaid: totalAmount,
      orderedProducts: [...cartProducts],
      deliveryAddress: { ...orderAddress },
    };

    dispatch({ type: "SET_ORDERS", payload: order });
    clearCartHandler(auth.token);
    setCurrentPage("orders");
    navigate("/profile/orders");
  };

  const razorpayOptions = {
    key: KEY_ID,
    currency: "INR",
    amount: totalAmount * 100,
    name: "Robotics Hub",
    description: "Order for robotics products",
    prefill: {
      name: auth.firstName,
      email: auth.email,
      contact: userContact,
    },
    notes: { address: orderAddress },
    theme: { color: "#4fc3f7" },
    handler: (response) => successHandler(response),
  };

  const placeOrderHandler = () => {
    if (orderAddress) {
      const razorpayInstance = new window.Razorpay(razorpayOptions);
      razorpayInstance.open();
    } else {
      toast.error("Please select a delivery address!");
    }
  };

  // Formatting function
  const formatCurrency = (value) => {
    const num = Number(value) || 0;
    return num.toFixed(2);
  };

  return (
    <div className="delivery-section">
      <div className="section-header">
        <FaMapMarkerAlt className="location-icon" />
        <h3>Delivery Address</h3>
      </div>
      
      {orderAddress ? (
        <div className="address-details">
          <div className="address-field">
            <span className="field-label">Name:</span>
            <span className="field-value">{orderAddress.name}</span>
          </div>
          
          <div className="address-field">
            <span className="field-label">Address:</span>
            <span className="field-value">
              {orderAddress.street}, {orderAddress.city}, {orderAddress.state}, {orderAddress.country} - {orderAddress.pincode}
            </span>
          </div>
          
          <div className="address-field">
            <span className="field-label">Contact:</span>
            <span className="field-value">{orderAddress.phone}</span>
          </div>
          
          <button 
            className="place-order-button"
            onClick={placeOrderHandler}
          >
            Confirm & Pay ₹{formatCurrency(totalAmount)}
          </button>
        </div>
      ) : (
        <div className="no-address">
          <p>No delivery address selected</p>
        </div>
      )}
    </div>
  );
};