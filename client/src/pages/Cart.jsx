import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title    from "../components/Title";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate: _ } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();
  const parseVariant = (variantKey) => {
    if (variantKey.includes("__")) {
      const [color, size] = variantKey.split("__");
      return { color, size };
    }
    return { color: "", size: variantKey };
  };

  // Flatten cartItems object → array for rendering
  // cartItems: { productId: { size: qty } }  →  [{ _id, size, quantity }]
  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const variantKey in cartItems[itemId]) {
        if (cartItems[itemId][variantKey] > 0) {
          const { color, size } = parseVariant(variantKey);
          tempData.push({
            _id: itemId,
            size,
            color,
            variantKey,
            quantity: cartItems[itemId][variantKey],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart items list */}
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((p) => p._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              {/* Product info */}
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20 object-cover"
                  src={productData.image[0]}
                  alt={productData.name}
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency}{productData.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border border-gray-300 bg-slate-50 text-xs">
                      {item.size}
                    </p>
                    {item.color && (
                      <p className="px-2 sm:px-3 sm:py-1 border border-gray-300 bg-slate-50 text-xs">
                        {item.color}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity input */}
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(item._id, item.variantKey, Number(e.target.value))
                }
                className="border border-gray-300 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              {/* Delete icon */}
              <svg
                onClick={() => updateQuantity(item._id, item.variantKey, 0)}
                className="w-4 sm:w-5 cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Cart total + checkout */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3 tracking-widest hover:bg-gray-800 transition-colors"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;