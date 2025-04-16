import React from "react";
import "./BillingSummary.css";
import { useUserData } from "../../../../contexts/UserDataProvider";

export const BillingSummary = () => {
  const { userDataState } = useUserData();

  // Ensure all values are numbers before calculations
  const subtotal = Number(userDataState.orderDetails?.cartItemsTotal) || 0;
  const discount = subtotal - (Number(userDataState.orderDetails?.cartItemsDiscountTotal) || 0);
  const total = Number(userDataState.orderDetails?.cartItemsDiscountTotal) || 0;

  // Formatting function to safely handle numbers
  const formatCurrency = (value) => {
    const num = Number(value) || 0;
    return num.toFixed(2);
  };

  return (
    <div className="billing-summary">
      <h3 className="summary-title">Order Summary</h3>
      
      <div className="price-breakdown">
        <div className="price-row">
          <span>Subtotal</span>
          <span>₹{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="price-row discount">
          <span>Discount</span>
          <span>-₹{formatCurrency(discount)}</span>
        </div>
        
        <div className="price-row">
          <span>Shipping</span>
          <span className="free">FREE</span>
        </div>
        
        <div className="total-row">
          <span>Total</span>
          <span className="total-amount">₹{formatCurrency(total)}</span>
        </div>
      </div>
      
      <div className="savings-message">
        You save ₹{formatCurrency(discount)} on this order
      </div>
    </div>
  );
};