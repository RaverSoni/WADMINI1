import React, { useState } from "react";
import { MdDiscount } from "react-icons/md";
import { toast } from "react-hot-toast";
import "./Coupons.css";
import { useUserData } from "../../../../contexts/UserDataProvider";

export const Coupons = ({ couponSelected, setCouponSelected }) => {
  const [isCouponClicked, setIsCouponClicked] = useState(false);
  const { userDataState } = useUserData();

  const couponsData = [
    {
      id: 1,
      name: "BLACK FRIDAY OFFER",
      description: "Get ₹200 off on a purchase of ₹2500",
      minimumPurchase: 250,
      amount: 20,
    },
    {
      id: 2,
      name: "NEW YEAR OFFER",
      description: "Get 20% off on a purchase of ₹5000",
      minimumPurchase: 500,
      discount: 20,
    },
  ];

  const totalDiscountedPriceBeforeCoupon = userDataState.cartProducts?.reduce(
    (acc, curr) => acc + curr.discounted_price * curr.qty,
    0
  );

  const couponHandler = (e, coupon) => {
    if (e.target.checked) {
      toast.success(`🎉 ${coupon.name} applied!`);
      setCouponSelected([...couponSelected, coupon]);
    } else {
      toast.success(`❌ ${coupon.name} removed`);
      setCouponSelected(couponSelected.filter(({ id }) => id !== coupon.id));
    }
  };

  return (
    <div className="coupons-container">
      <button 
        className="coupon-toggle"
        onClick={() => setIsCouponClicked(!isCouponClicked)}
      >
        <MdDiscount size={20} />
        <span>Apply Coupons</span>
      </button>

      {isCouponClicked && (
        <div className="coupons-list">
          {couponsData.map((coupon) => {
            const isDisabled = totalDiscountedPriceBeforeCoupon <= coupon.minimumPurchase;
            return (
              <div 
                key={coupon.id} 
                className={`coupon-card ${isDisabled ? 'disabled' : ''}`}
              >
                <input
                  type="checkbox"
                  id={`coupon-${coupon.id}`}
                  checked={couponSelected.some(c => c.id === coupon.id)}
                  onChange={(e) => couponHandler(e, coupon)}
                  disabled={isDisabled}
                />
                <label htmlFor={`coupon-${coupon.id}`}>
                  <h4>{coupon.name}</h4>
                  <p>{coupon.description}</p>
                  {isDisabled && (
                    <span className="minimum-warning">
                      Minimum purchase of ₹{coupon.minimumPurchase} required
                    </span>
                  )}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};