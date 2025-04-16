import React from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { Logout } from "../../../pages/auth/Logout/Logout";
import "./Profile.css";

export const Profile = () => {
  const { auth } = useAuth();

  return (
    <div className="profile-container">
      <h3 className="profile-title">Your Profile</h3>
      <div className="profile-details">
        <div className="detail-item">
          <span className="detail-label">Full Name:</span>
          <span className="detail-value">
            {auth.firstName} {auth.lastName}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{auth.email}</span>
        </div>
      </div>
      <Logout />
    </div>
  );
};