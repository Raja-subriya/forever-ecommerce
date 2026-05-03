import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";
import { fallbackProducts } from "../assets/fallbackData";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSample, setIsSample] = useState(false);

  const fetchList = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`, { timeout: 60000 });
      if (res.data.success && res.data.products?.length > 0) {
        setList(res.data.products);
        setIsSample(false);
      }
    } catch (error) {
      // silent — already showing sample data
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Show sample data immediately, fetch real data in background
    setList(fallbackProducts);
    setIsSample(true);
    setLoading(false);
    fetchList();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold text-gray-700">All Products List</p>
        {isSample && (
          <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            SHOWING SAMPLE DATA
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {/* ------- Table Title ------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------- Product List ------- */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img
              className="w-12 h-12 object-cover rounded border border-gray-100"
              src={item.image[0]}
              alt={item.name}
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop"; }}
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>
      {list.length === 0 && (
        <p className="text-center text-gray-400 py-10 text-sm">
          No products yet. Add your first product.
        </p>
      )}
    </>
  );
};

export default List;