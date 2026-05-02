import React, { useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { getCartCount, token, setToken, setCartItems, showSearch, setShowSearch } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between py-5 max-w-7xl mx-auto px-4 font-medium">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-widest">
        FOREVER<span className="text-pink-400">.</span>
      </Link>

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-10 text-sm">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-black pb-1 font-semibold" : "pb-1"
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/collection"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-black pb-1 font-semibold" : "pb-1"
          }
        >
          COLLECTION
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-black pb-1 font-semibold" : "pb-1"
          }
        >
          ABOUT
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "border-b-2 border-black pb-1 font-semibold" : "pb-1"
          }
        >
          CONTACT
        </NavLink>
      </ul>

      {/* Admin Panel Button */}
      <button
        onClick={() => window.open(import.meta.env.VITE_ADMIN_URL || "http://localhost:5176", "_blank")}
        className="hidden sm:inline-block border border-gray-300 rounded-full px-4 py-1 text-sm hover:bg-gray-100 transition"
      >
        Admin Panel
      </button>

      {/* Icons */}
      <div className="flex items-center gap-6 text-xl">
        {/* Search Icon */}
        <button
          aria-label="Search"
          onClick={() => {
            if (location.pathname.includes("collection")) {
              setShowSearch(!showSearch);
            } else {
              setShowSearch(true);
              navigate("/collection");
            }
          }}
        >
          🔍
        </button>

        {/* User Icon */}
        <button
          aria-label="User Profile"
          onClick={() => (token ? logout() : navigate("/login"))}
        >
          👤
        </button>

        {/* Cart Icon with count */}
        <Link to="/cart" aria-label="Shopping Cart" className="relative">
          🛒
          <span className="absolute -top-2 -right-3 bg-black text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {getCartCount()}
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
