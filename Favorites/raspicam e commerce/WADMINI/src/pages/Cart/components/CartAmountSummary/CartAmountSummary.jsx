import React from "react";
import { useUserData } from "../../../../contexts/UserDataProvider";
import { Link } from "react-router-dom";
import "./CartAmountSummary.css";

export const CartAmountSummary = ({ couponSelected }) => {
  const { userDataState, dispatch } = useUserData();

  const totalDiscountedPriceBeforeCoupon = userDataState.cartProducts?.reduce(
    (acc, curr) => acc + curr.discounted_price * curr.qty,
    0
  );

  const totalCouponDiscount = couponSelected?.reduce(
    (acc, curr) =>
      curr.amount
        ? acc + curr.amount
        : acc + (curr.discount * totalDiscountedPriceBeforeCoupon) / 100,
    0
  );

  const totalDiscountedPriceAfterCoupon = (
    totalDiscountedPriceBeforeCoupon - totalCouponDiscount
  ).toFixed(2);

  const totalOriginalPrice = userDataState.cartProducts?.reduce(
    (acc, curr) => acc + curr.original_price * curr.qty,
    0
  );

  const isCouponApplied = couponSelected.length > 0;
  const totalSavings = (totalOriginalPrice - totalDiscountedPriceAfterCoupon).toFixed(2);

  const placeOrderHandler = () => {
    dispatch({
      type: "SET_ORDER",
      payload: {
        cartItemsTotal: totalOriginalPrice,
        cartItemsDiscountTotal: totalDiscountedPriceAfterCoupon,
        couponDiscountTotal: totalCouponDiscount,
        orderAddress: userDataState.addressList[0],
      },
    });
  };

  return (
    <div className="summary-container">
      <h2 className="summary-title">Order Summary</h2>
      
      <div className="summary-row">
        <span>Subtotal:</span>
        <span>₹{totalOriginalPrice.toFixed(2)}</span>
      </div>
      
      <div className="summary-row">
        <span>Discount:</span>
        <span className="discount">-₹{(totalOriginalPrice - totalDiscountedPriceBeforeCoupon).toFixed(2)}</span>
      </div>
      
      {isCouponApplied && (
        <div className="summary-row">
          <span>Coupon Discount:</span>
          <span className="discount">-₹{totalCouponDiscount.toFixed(2)}</span>
        </div>
      )}
      
      <div className="summary-row">
        <span>Delivery:</span>
        <span className="free">FREE</span>
      </div>
      
      <div className="summary-total">
        <span>Total:</span>
        <span className="total-amount">₹{totalDiscountedPriceAfterCoupon}</span>
      </div>
      
      <div className="savings-banner">
        You saved ₹{totalSavings} on this order!
      </div>
      
      <Link 
        to="/checkout" 
        className="checkout-button"
        onClick={placeOrderHandler}
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};