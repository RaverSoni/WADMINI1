import "./AddressModal.css";
import React, { useState } from "react";
import { addAddressService } from "../../../../services/address-services/addAddressService";
import { useUserData } from "../../../../contexts/UserDataProvider";
import { updateAddressService } from "../../../../services/address-services/updateAddressService";
import { toast } from "react-hot-toast";
import { useAddress } from "../../../../contexts/AddressProvider";
import { useAuth } from "../../../../contexts/AuthProvider";

export const AddressModal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { auth } = useAuth();
  const { dispatch } = useUserData();

  const dummyAddress = {
    name: "Ribhav Soni",
    street: "PICT, Dhankawadi",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    pincode: "411047",
    phone: "0987654321",
  };

  const {
    setIsAddressModalOpen,
    addressForm,
    setAddressForm,
    isEdit,
    setIsEdit,
  } = useAddress();

  const updateAddress = async (address) => {
    try {
      setLoading(true);
      setError("");
      const response = await updateAddressService(address, auth.token);
      if (response.status === 200) {
        setLoading(false);
        toast.success(`Address updated successfully!`);
        dispatch({ type: "SET_ADDRESS", payload: response.data.addressList });
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Failed to update address");
      toast.error("Failed to update address");
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (address) => {
    try {
      setLoading(true);
      setError("");
      const response = await addAddressService(address, auth.token);
      if (response.status === 201) {
        setLoading(false);
        toast.success("Address added successfully!");
        dispatch({ type: "SET_ADDRESS", payload: response.data.addressList });
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || "Failed to add address");
      toast.error("Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateAddress(addressForm);
    } else {
      addAddress(addressForm);
    }
    setIsAddressModalOpen(false);
    setIsEdit(false);
  };

  return (
    <div className="address-modal-overlay">
      <div className="address-modal">
        <div className="modal-header">
          <h2>{isEdit ? "Edit Address" : "Add New Address"}</h2>
          <button 
            className="close-button"
            onClick={() => {
              setIsAddressModalOpen(false);
              setIsEdit(false);
            }}
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="address-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={addressForm.name}
              onChange={(e) =>
                setAddressForm({ ...addressForm, name: e.target.value })
              }
              required
              placeholder="John Doe"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="street">Street Address</label>
            <input
              id="street"
              type="text"
              value={addressForm.street}
              onChange={(e) =>
                setAddressForm({ ...addressForm, street: e.target.value })
              }
              required
              placeholder="123 Main St"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              value={addressForm.city}
              onChange={(e) =>
                setAddressForm({ ...addressForm, city: e.target.value })
              }
              required
              placeholder="Mumbai"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              id="state"
              type="text"
              value={addressForm.state}
              onChange={(e) =>
                setAddressForm({ ...addressForm, state: e.target.value })
              }
              required
              placeholder="Maharashtra"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              value={addressForm.country}
              onChange={(e) =>
                setAddressForm({ ...addressForm, country: e.target.value })
              }
              required
              placeholder="India"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input
              id="pincode"
              type="text"
              value={addressForm.pincode}
              onChange={(e) =>
                setAddressForm({ ...addressForm, pincode: e.target.value })
              }
              required
              placeholder="400001"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={addressForm.phone}
              onChange={(e) =>
                setAddressForm({ ...addressForm, phone: e.target.value })
              }
              required
              minLength="10"
              placeholder="9876543210"
            />
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setAddressForm({ ...dummyAddress });
              }}
            >
              Fill Dummy Data
            </button>
            <div className="action-buttons">
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setIsAddressModalOpen(false);
                  setIsEdit(false);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="primary-button" disabled={loading}>
                {loading ? "Saving..." : "Save Address"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};