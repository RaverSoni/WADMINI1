import "./OrderSummary.css";
import React from "react";
import { CartProductsSummary } from "../CartProductsSummary/CartProductsSummary";
import { BillingSummary } from "../BillingSummary/BillingSummary";
import { DeliveryAddress } from "../DeliveryAddress/DeliveryAddress";
import { useUserData } from "../../../../contexts/UserDataProvider";
import { FaExclamationCircle } from "react-icons/fa";

export const OrderSummary = () => {
  const { userDataState } = useUserData();
  
  return (
    <div className="order-summary">
      <CartProductsSummary />
      <BillingSummary />
      {userDataState.orderDetails.orderAddress ? (
        <DeliveryAddress />
      ) : (
        <div className="address-alert">
          <FaExclamationCircle className="alert-icon" />
          <p>Please select or add a delivery address to proceed</p>
        </div>
      )}
    </div>
  );
};