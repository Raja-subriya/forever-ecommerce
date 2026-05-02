import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import Title    from "../components/Title";
import CartTotal from "../components/CartTotal";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    backendUrl, token, cartItems, setCartItems,
    getCartAmount, deliveryCharge, products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod"); // "cod" | "stripe" | "razorpay"
  const razorpayEnabled = Boolean(import.meta.env.VITE_RAZORPAY_KEY_ID);

  const [formData, setFormData] = useState({
    firstName: "", lastName:  "",
    email: "",     street:    "",
    city:  "",     state:     "",
    zipcode: "",   country:   "",
    phone: "",
  });
  const parseVariant = (variantKey) => {
    if (variantKey.includes("__")) {
      const [color, size] = variantKey.split("__");
      return { color, size };
    }
    return { color: "", size: variantKey };
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Build order payload from cart
  const initOrderData = () => {
    const orderItems = [];
    for (const productId in cartItems) {
      for (const variantKey in cartItems[productId]) {
        if (cartItems[productId][variantKey] > 0) {
          const itemInfo = structuredClone(
            products.find((p) => p._id === productId)
          );
          if (itemInfo) {
            const { size, color } = parseVariant(variantKey);
            itemInfo.size = size;
            itemInfo.color = color;
            itemInfo.quantity = cartItems[productId][variantKey];
            orderItems.push(itemInfo);
          }
        }
      }
    }
    return {
      address: formData,
      items:   orderItems,
      amount:  getCartAmount() + deliveryCharge,
    };
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        toast.error("Please login to place your order.");
        navigate("/login");
        return;
      }

      const orderPayload = initOrderData();

      switch (method) {
        // ── Cash on Delivery ────────────────────────────────
        case "cod": {
          const res = await axios.post(
            `${backendUrl}/api/order/place`,
            orderPayload,
            { headers: { token } }
          );
          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(res.data.message);
          }
          break;
        }

        // ── Stripe ──────────────────────────────────────────
        case "stripe": {
          const res = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderPayload,
            { headers: { token } }
          );
          if (res.data.success) {
            // Redirect to Stripe hosted checkout page
            window.location.replace(res.data.session_url);
          } else {
            toast.error(res.data.message);
          }
          break;
        }

        // ── Razorpay ────────────────────────────────────────
        case "razorpay": {
          if (!razorpayEnabled) {
            toast.error("Razorpay is not configured. Please use Cash on Delivery.");
            setMethod("cod");
            return;
          }

          const res = await axios.post(
            `${backendUrl}/api/order/razorpay`,
            orderPayload,
            { headers: { token } }
          );
          if (res.data.success) {
            const { order } = res.data;
            const options = {
              key:      import.meta.env.VITE_RAZORPAY_KEY_ID,
              amount:   order.amount,
              currency: order.currency,
              name:     "FOREVER.",
              description: "Order Payment",
              order_id: order.id,
              handler: async (response) => {
                // Verify payment on backend
                const verifyRes = await axios.post(
                  `${backendUrl}/api/order/verifyRazorpay`,
                  { razorpay_order_id: response.razorpay_order_id },
                  { headers: { token } }
                );
                if (verifyRes.data.success) {
                  setCartItems({});
                  navigate("/orders");
                } else {
                  toast.error("Payment verification failed");
                }
              },
            };
            // Open Razorpay checkout modal
            const rzp = new window.Razorpay(options);
            rzp.open();
          } else {
            toast.error(res.data.message);
          }
          break;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ── Left: Delivery Info ── */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
            type="text" placeholder="First name" />
          <input required onChange={onChangeHandler} name="lastName"  value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
            type="text" placeholder="Last name" />
        </div>

        {[
          { name: "email",   type: "email",  placeholder: "Email address" },
          { name: "street",  type: "text",   placeholder: "Street" },
        ].map((f) => (
          <input key={f.name} required onChange={onChangeHandler} name={f.name}
            value={formData[f.name]} type={f.type} placeholder={f.placeholder}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
          />
        ))}

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="city"    value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
            type="text" placeholder="City" />
          <input required onChange={onChangeHandler} name="state"   value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
            type="text" placeholder="State" />
        </div>

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
            type="number" placeholder="Zipcode" />
          <input required onChange={onChangeHandler} name="country" value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
            type="text" placeholder="Country" />
        </div>

        <input required onChange={onChangeHandler} name="phone" value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
          type="number" placeholder="Phone" />
      </div>

      {/* ── Right: Summary + Payment ── */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        {/* Payment method selector */}
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />

          <div className="flex gap-3 flex-col lg:flex-row mt-4">
            {/* Razorpay */}
            <div
              onClick={() => razorpayEnabled && setMethod("razorpay")}
              className={`flex items-center gap-3 border p-2 px-3 text-sm min-w-[130px] transition-all ${
                method === "razorpay" ? "border-green-400 bg-green-50" : "border-gray-300"
              } ${razorpayEnabled ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
            >
              <div className={`w-3.5 h-3.5 border rounded-full flex items-center justify-center ${
                method === "razorpay" ? "border-green-400" : "border-gray-400"
              }`}>
                {method === "razorpay" && <div className="w-2 h-2 bg-green-400 rounded-full" />}
              </div>
              <p className="text-gray-500 text-xs font-medium">
                RAZORPAY {razorpayEnabled ? "" : "(Not configured)"}
              </p>
            </div>

            {/* Stripe */}
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer text-sm min-w-[130px] transition-all ${
                method === "stripe" ? "border-orange-400 bg-orange-50" : "border-gray-300"
              }`}
            >
              <div className={`w-3.5 h-3.5 border rounded-full flex items-center justify-center ${
                method === "stripe" ? "border-orange-400" : "border-gray-400"
              }`}>
                {method === "stripe" && <div className="w-2 h-2 bg-orange-400 rounded-full" />}
              </div>
              <p className="text-gray-500 text-xs font-medium">STRIPE</p>
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer text-sm min-w-[130px] transition-all ${
                method === "cod" ? "border-green-400 bg-green-50" : "border-gray-300"
              }`}
            >
              <div className={`w-3.5 h-3.5 border rounded-full flex items-center justify-center ${
                method === "cod" ? "border-green-400" : "border-gray-400"
              }`}>
                {method === "cod" && <div className="w-2 h-2 bg-green-400 rounded-full" />}
              </div>
              <p className="text-gray-500 text-xs font-medium">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm tracking-widest hover:bg-gray-800 transition-colors"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;