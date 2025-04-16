import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import { useUserData } from "../../../contexts/UserDataProvider";
import "./Logout.css";

export const Logout = () => {
  const { dispatch } = useUserData();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const logoutHandler = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("token");
    setAuth({ token: "", isAuth: false });
    toast.success("You've been logged out successfully!");
    dispatch({ type: "SET_CART", payload: [] });
    dispatch({ type: "SET_WISHLIST", payload: [] });
    navigate("/");
  };

  return (
    <div className="logout-container">
      <div className="logout-card">
        <h3>Ready to leave?</h3>
        <p>Are you sure you want to log out?</p>
        <button onClick={logoutHandler} className="logout-button">
          Confirm Logout
        </button>
      </div>
    </div>
  );
};