import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

// Displays subtotal, shipping fee, and grand total
// Used in both /cart and /place-order pages
const CartTotal = () => {
  const { currency, deliveryCharge, getCartAmount } = useContext(ShopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{getCartAmount()}.00</p>
        </div>
        <hr className="border-gray-200" />

        {/* Shipping fee */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency}{deliveryCharge}.00</p>
        </div>
        <hr className="border-gray-200" />

        {/* Total */}
        <div className="flex justify-between font-semibold text-base">
          <b>Total</b>
          <b>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + deliveryCharge}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;