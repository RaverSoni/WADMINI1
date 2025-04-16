import "./AddressSection.css";
import React from "react";
import { useAddress } from "../../../../contexts/AddressProvider";
import { useUserData } from "../../../../contexts/UserDataProvider";
import { AddressModal } from "../AddressModal/AddressModal";
import { FiPlus } from "react-icons/fi";

export const AddressSection = () => {
  const { userDataState, dispatch } = useUserData();
  const { isAddressModalOpen, setIsAddressModalOpen } = useAddress();

  return (
    <div className="address-section">
      <h3 className="section-title">Select Delivery Address</h3>
      
      <div className="address-list">
        {userDataState.addressList?.map((address) => {
          const { name, street, city, state, country, pincode, phone, _id } = address;

          return (
            <div 
              key={_id} 
              className={`address-card ${_id === userDataState.orderDetails?.orderAddress?._id ? 'selected' : ''}`}
            >
              <input
                type="radio"
                id={_id}
                name="address"
                checked={_id === userDataState.orderDetails?.orderAddress?._id}
                onChange={() => {
                  dispatch({
                    type: "SET_ORDER",
                    payload: { orderAddress: address },
                  });
                }}
                className="address-radio"
              />
              <label htmlFor={_id} className="address-content">
                <h4 className="address-name">{name}</h4>
                <p className="address-details">
                  {street}, {city}, {state}, {country} - {pincode}
                </p>
                <p className="address-phone">Phone: {phone}</p>
              </label>
            </div>
          );
        })}
      </div>

      <button 
        className="add-address-button"
        onClick={() => setIsAddressModalOpen(true)}
      >
        <FiPlus className="plus-icon" />
        Add New Address
      </button>

      {isAddressModalOpen && <AddressModal />}
    </div>
  );
};