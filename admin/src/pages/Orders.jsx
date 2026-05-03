import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";
import { fallbackOrders } from "../assets/fallbackData";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSample, setIsSample] = useState(false);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token }, timeout: 60000 }
      );
      if (res.data.success && res.data.orders?.length > 0) {
        setOrders(res.data.orders.reverse());
        setIsSample(false);
      }
    } catch (error) {
      // silent — already showing sample data
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (res.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Show sample data immediately, fetch real data in background
    setOrders(fallbackOrders);
    setIsSample(true);
    setLoading(false);
    fetchAllOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold text-gray-700">Order Page</p>
        {isSample && (
          <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            SHOWING SAMPLE DATA
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            {/* Parcel icon */}
            <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center w-16 h-16 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>

            {/* Order items + address */}
            <div>
              <div>
                {order.items.map((item, i) => (
                  <p key={i} className="py-0.5">
                    {item.name} x {item.quantity}{" "}
                    <span>
                      {item.size}
                      {item.color ? `, ${item.color}` : ""}
                    </span>
                    {i < order.items.length - 1 && ","}
                  </p>
                ))}
              </div>
              <p className="mt-3 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>

            {/* Order meta */}
            <div>
              <p className="text-sm sm:text-[15px]">
                Items : {order.items.length}
              </p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Total */}
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>

            {/* Status dropdown */}
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="p-2 font-semibold border border-gray-300 rounded text-xs outline-none cursor-pointer"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;