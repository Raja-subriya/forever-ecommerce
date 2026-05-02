import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  // ── Constants ───────────────────────────────────────────────
  const currency = "$";
  const deliveryCharge = 10;
  const backendUrl = "https://forever-ecommerce-2-9qcd.onrender.com";
  const fallbackProducts = [
    {
      _id: "1",
      name: "Men Tapered Fit Flat-Front Trousers",
      description: "Comfort fit trousers for daily wear.",
      price: 63,
      image: ["/images/product1.jpg", "/images/product8.jpg"],
      category: "Men",
      subCategory: "Bottomwear",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Grey"],
      colorImages: { Black: "/images/product1.jpg", Grey: "/images/product8.jpg" },
      bestseller: true,
    },
    {
      _id: "2",
      name: "Men Round Neck Pure Cotton T-shirt",
      description: "Soft cotton t-shirt for all-day comfort.",
      price: 80,
      image: ["/images/product2.jpg", "/images/product11.jpg", "/images/product15.jpg"],
      category: "Men",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Pink", "Olive", "Blue"],
      colorImages: {
        Pink: "/images/product2.jpg",
        Olive: "/images/product11.jpg",
        Blue: "/images/product15.jpg",
      },
      bestseller: false,
    },
    {
      _id: "3",
      name: "Boy Round Neck Pure Cotton T-shirt",
      description: "Breathable cotton t-shirt for kids.",
      price: 60,
      image: ["/images/product3.jpg", "/images/product6.jpg"],
      category: "Kids",
      subCategory: "Topwear",
      sizes: ["S", "M", "L"],
      colors: ["Blue", "White"],
      colorImages: { Blue: "/images/product3.jpg", White: "/images/product6.jpg" },
      bestseller: false,
    },
    {
      _id: "4",
      name: "Women Round Neck Cotton Top",
      description: "Lightweight and casual everyday top.",
      price: 42,
      image: ["/images/product4.jpg", "/images/product6.jpg"],
      category: "Women",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Sky Blue", "Grey"],
      colorImages: { "Sky Blue": "/images/product4.jpg", Grey: "/images/product6.jpg" },
      bestseller: false,
    },
    {
      _id: "5",
      name: "Kid Tapered Slim Fit Trouser",
      description: "Flexible and soft trousers for kids.",
      price: 56,
      image: ["/images/product5.jpg", "/images/product9.jpg"],
      category: "Kids",
      subCategory: "Bottomwear",
      sizes: ["S", "M", "L"],
      colors: ["Black", "Blue"],
      colorImages: { Black: "/images/product5.jpg", Blue: "/images/product9.jpg" },
      bestseller: false,
    },
    {
      _id: "6",
      name: "Women Zip-Front Relaxed Fit Jacket",
      description: "Stylish jacket with a relaxed fit silhouette.",
      price: 78,
      image: ["/images/product10.jpg", "/images/product14.jpg"],
      category: "Women",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Pink", "Black"],
      colorImages: { Pink: "/images/product14.jpg", Black: "/images/product10.jpg" },
      bestseller: true,
    },
    {
      _id: "7",
      name: "Men Slim Fit Relaxed Denim Jacket",
      description: "Denim jacket designed for a sharp casual look.",
      price: 84,
      image: ["/images/product15.jpg", "/images/product11.jpg"],
      category: "Men",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue", "Black"],
      colorImages: { Blue: "/images/product15.jpg", Black: "/images/product11.jpg" },
      bestseller: true,
    },
    {
      _id: "8",
      name: "Men Slim Fit Puffer Jacket",
      description: "Warm puffer jacket for winter comfort.",
      price: 86,
      image: ["/images/product12.jpg", "/images/product11.jpg"],
      category: "Men",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Olive", "Grey"],
      colorImages: { Olive: "/images/product12.jpg", Grey: "/images/product11.jpg" },
      bestseller: true,
    },
    {
      _id: "9",
      name: "Women Casual Winter Jacket",
      description: "Cozy zip-front jacket for daily styling.",
      price: 68,
      image: ["/images/product13.jpg", "/images/product14.jpg"],
      category: "Women",
      subCategory: "Winterwear",
      sizes: ["S", "M", "L"],
      colors: ["Beige", "Pink"],
      colorImages: { Beige: "/images/product13.jpg", Pink: "/images/product14.jpg" },
      bestseller: true,
    },
    {
      _id: "10",
      name: "Kid Cotton Bottomwear",
      description: "Lightweight cotton pants for kids.",
      price: 40,
      image: ["/images/product9.jpg", "/images/product5.jpg"],
      category: "Kids",
      subCategory: "Bottomwear",
      sizes: ["S", "M", "L"],
      colors: ["Blue", "Green"],
      colorImages: { Blue: "/images/product9.jpg", Green: "/images/product5.jpg" },
      bestseller: false,
    },
  ];

  // ── State ────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  // ── Add to Cart ──────────────────────────────────────────────
  const addToCart = async (itemId, size, color = "") => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    const variantKey = color ? `${color}__${size}` : size;

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][variantKey]) {
        cartData[itemId][variantKey] += 1;
      } else {
        cartData[itemId][variantKey] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][variantKey] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size: variantKey },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ── Get Cart Count ───────────────────────────────────────────
  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }

    return totalCount;
  };

  // ── Update Quantity ──────────────────────────────────────────
  const updateQuantity = async (itemId, variantKey, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][variantKey] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size: variantKey, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ── Get Cart Amount ──────────────────────────────────────────
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);

      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0 && itemInfo) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }

    return totalAmount;
  };

  // ── Fetch Products ────────────────────────────────────────────
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        if (response.data.products?.length > 0) {
          setProducts(response.data.products);
        } else {
          setProducts(fallbackProducts);
        }
      } else {
        setProducts(fallbackProducts);
      }
    } catch (error) {
      console.log(error);
      setProducts(fallbackProducts);
    }
  };

  // ── Load Cart from Backend ────────────────────────────────────
  const getUserCart = async (userToken) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token: userToken } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ── Initial Load ──────────────────────────────────────────────
  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getUserCart(savedToken);
    }
  }, []);

  // ── Context Value ─────────────────────────────────────────────
  const value = {
    products,
    currency,
    deliveryCharge,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
