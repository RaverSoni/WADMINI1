import React from "react";
import { useUserData } from "../../../contexts/UserDataProvider";
import "./Orders.css";

export const Orders = () => {
  const { userDataState } = useUserData();

  return !userDataState.orders?.length ? (
    <div className="orders-container">
      <p className="no-orders">No Orders Found</p>
    </div>
  ) : (
    <div className="orders-container">
      {userDataState.orders?.map(
        ({
          amountPaid,
          deliveryAddress,
          orderId,
          orderedProducts,
          paymentId,
        }) => (
          <div key={orderId} className="ordered-items-card">
            <div className="order-id-container">
              <span>Order ID: </span>
              <span>{orderId}</span>
            </div>
            <div className="payment-id-container">
              <span>Payment ID: </span>
              <span>{paymentId}</span>
            </div>
            <div className="price-container">
              <span>Amount: </span>
              <span>₹{amountPaid}</span>
            </div>
            <div className="delivery-address">
              <span>Delivery Address:</span>
              <span>
                {deliveryAddress?.street}, {deliveryAddress?.city}, {deliveryAddress?.state}, {deliveryAddress?.country} - {deliveryAddress?.pincode}
              </span>
            </div>
            <div className="products-container">
              <h4>Products:</h4>
              {orderedProducts?.map(
                ({ id, img, name, discounted_price, qty }) => (
                  <div className="products-card" key={id}>
                    <img src={img} alt={name} />
                    <div className="description">
                      <span className="name">{name}</span>
                      <span className="qty">Quantity: {qty}</span>
                      <span className="price">Price: ₹{discounted_price}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};