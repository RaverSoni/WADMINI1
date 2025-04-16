import React from "react";
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useData } from "../../contexts/DataProvider";
import "./UserProfile.css";
import { useAuth } from "../../contexts/AuthProvider";

export const UserProfile = () => {
  const { loading } = useData();
  const { currentPage, setCurrentPage } = useAuth();
  const location = useLocation();

  const profileLinks = [
    { path: "/profile", name: "Profile", key: "profile" },
    { path: "/profile/orders", name: "Orders", key: "orders" },
    { path: "/profile/addresses", name: "Addresses", key: "addresses" }
  ];

  return (
    !loading && (
      <div className="user-profile">
        <div className="profile-nav">
          {profileLinks.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              className={`nav-link ${currentPage === link.key ? 'active' : ''}`}
              onClick={() => setCurrentPage(link.key)}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="profile-content">
          <Outlet />
        </div>
      </div>
    )
  );
};