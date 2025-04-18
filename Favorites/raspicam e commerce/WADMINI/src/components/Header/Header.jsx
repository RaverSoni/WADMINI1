// import "./Header.css";
// import { CgHeart } from "react-icons/cg";
// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { RxCross2 } from "react-icons/rx";
// import { GrSearch } from "react-icons/gr";
// import { useData } from "../../contexts/DataProvider";
// import { useAuth } from "../../contexts/AuthProvider";
// import { CgShoppingCart } from "react-icons/cg";
// import { useUserData } from "../../contexts/UserDataProvider";
// import { SiTaichilang } from "react-icons/si";

// export const Header = () => {
//   const { auth } = useAuth();
//   const { dispatch } = useData();
//   const navigate = useNavigate();
//   const { userDataState } = useUserData();
//   const [showHamburger, setShowHamburger] = useState(true);
//   const getActiveStyle = ({ isActive }) => {
//     return { color: isActive ? "white" : "" };
//   };

//   const totalProductsInCart = userDataState.cartProducts?.reduce(
//     (acc, curr) => {
//       return acc + curr.qty;
//     },
//     0
//   );

//   const isProductInCart = () => (Number(totalProductsInCart) ? true : false);

//   const totalProductsInWishlist = userDataState.wishlistProducts.length;

//   const isProductInWishlist = () =>
//     Number(totalProductsInWishlist) ? true : false;

//   return (
//     <nav>
//       <div className="nav-logo-home-button">
//         <NavLink style={getActiveStyle} to="/">
//           <SiTaichilang />
//           <div className="marginspace">
//           <span className="brand-name">Robotics Hub</span>
//           </div>
//         </NavLink>
//       </div>

//       <div className="nav-input-search">
//         <input
//           onChange={(e) =>
//             dispatch({ type: "SEARCH", payload: e.target.value })
//           }
//           onKeyDown={(e) => {
//             e.key === "Enter" && navigate("/product-listing");
//           }}
//           placeholder="Search"
//         />
//         <button>
//           <GrSearch />
//         </button>
//       </div>

//       <div
//         className={
//           !showHamburger
//             ? "nav-link-container-mobile nav-link-container"
//             : "nav-link-container"
//         }
//       >
//         <NavLink
//           onClick={() => setShowHamburger(true)}
//           style={getActiveStyle}
//           to="/product-listing"
//         >
//           Explore
//         </NavLink>
//         <NavLink
//           onClick={() => setShowHamburger(true)}
//           style={getActiveStyle}
//           to={auth.isAuth ? "/profile" : "/login"}
//         >
//           {!auth.isAuth ? "Login" : "Profile"}
//         </NavLink>
//         <NavLink
//           onClick={() => setShowHamburger(true)}
//           style={getActiveStyle}
//           to="wishlist"
//         >
//           <span>{!showHamburger ? "Wishlist" : ""}</span>
//           <CgHeart size={25} className="wishlist" />{" "}
//           {isProductInWishlist() && (
//             <span className="cart-count cart-count-mobile">
//               {totalProductsInWishlist}
//             </span>
//           )}
//         </NavLink>
//         <NavLink
//           onClick={() => setShowHamburger(true)}
//           style={getActiveStyle}
//           to="/cart"
//         >
//           <span>{!showHamburger ? "Cart" : ""}</span>
//           <CgShoppingCart size={25} className="cart" />{" "}
//           {isProductInCart() && (
//             <span className="cart-count cart-count-mobile">
//               {" "}
//               {totalProductsInCart}{" "}
//             </span>
//           )}
//         </NavLink>
//       </div>
//       {showHamburger && (
//         <div className="hamburger-icon" onClick={() => setShowHamburger(false)}>
//           <RxHamburgerMenu size={20} />
//         </div>
//       )}
//       {!showHamburger && (
//         <div
//           className="cross-tab-icon cross-tab-icon-mobile"
//           onClick={() => setShowHamburger(true)}
//         >
//           <RxCross2 color={"rgb(106, 106, 65)"} size={25} />
//         </div>
//       )}
//     </nav>
//   );
// };

import "./Header.css";
import { CgHeart } from "react-icons/cg";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { GrSearch } from "react-icons/gr";
import { useData } from "../../contexts/DataProvider";
import { useAuth } from "../../contexts/AuthProvider";
import { CgShoppingCart } from "react-icons/cg";
import { useUserData } from "../../contexts/UserDataProvider";
import { SiTaichilang } from "react-icons/si";

export const Header = () => {
  const { auth } = useAuth();
  const { dispatch } = useData();
  const navigate = useNavigate();
  const { userDataState } = useUserData();
  const [showHamburger, setShowHamburger] = useState(true);
  
  const getActiveStyle = ({ isActive }) => ({
    color: isActive ? "#4fc3f7" : "#e0e0e0",
    background: isActive ? "rgba(79, 195, 247, 0.1)" : "transparent"
  });

  const totalProductsInCart = userDataState.cartProducts?.reduce(
    (acc, curr) => acc + curr.qty, 0
  );

  const isProductInCart = () => (Number(totalProductsInCart) ? true : false);

  const totalProductsInWishlist = userDataState.wishlistProducts.length;

  const isProductInWishlist = () => Number(totalProductsInWishlist) ? true : false;

  return (
    <nav className="nav-container">
      <div className="nav-logo-home-button">
        <NavLink style={getActiveStyle} to="/" className="brand-link">
          <SiTaichilang className="brand-icon" />
          <span className="brand-name">Robotics Hub</span>
        </NavLink>
      </div>

      <div className="nav-input-search">
        <input
          onChange={(e) => dispatch({ type: "SEARCH", payload: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && navigate("/product-listing")}
          placeholder="Search robots, parts..."
          className="search-input"
        />
        <button className="search-button">
          <GrSearch className="search-icon" />
        </button>
      </div>

      <div className={`nav-link-container ${!showHamburger ? "mobile-open" : ""}`}>
        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to="/product-listing"
          className="nav-link"
        >
          Explore
        </NavLink>
        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to={auth.isAuth ? "/profile" : "/login"}
          className="nav-link"
        >
          {!auth.isAuth ? "Login" : "Profile"}
        </NavLink>
        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to="wishlist"
          className="nav-link icon-link"
        >
          <span className="link-text">{!showHamburger ? "Wishlist" : ""}</span>
          <div className="icon-container">
            <CgHeart className="nav-icon wishlist" />
            {isProductInWishlist() && (
              <span className="badge">{totalProductsInWishlist}</span>
            )}
          </div>
        </NavLink>
        <NavLink
          onClick={() => setShowHamburger(true)}
          style={getActiveStyle}
          to="/cart"
          className="nav-link icon-link"
        >
          <span className="link-text">{!showHamburger ? "Cart" : ""}</span>
          <div className="icon-container">
            <CgShoppingCart className="nav-icon cart" />
            {isProductInCart() && (
              <span className="badge">{totalProductsInCart}</span>
            )}
          </div>
        </NavLink>
      </div>
      
      <div className="mobile-menu-toggle">
        {showHamburger ? (
          <RxHamburgerMenu 
            className="hamburger-icon" 
            onClick={() => setShowHamburger(false)} 
          />
        ) : (
          <RxCross2 
            className="cross-icon" 
            onClick={() => setShowHamburger(true)} 
          />
        )}
      </div>
    </nav>
  );
};