import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
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
    <nav className="flex items-center justify-between py-5 font-medium sticky top-0 bg-white/80 backdrop-blur-md z-40 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] border-b border-gray-100">
      {/* Logo */}
      <Link to="/" className="text-xl sm:text-2xl font-bold tracking-widest flex-shrink-0">
        FOREVER<span className="text-[#b0005d]">.</span>
      </Link>

      {/* Navigation Links (Desktop) */}
      <ul className="hidden sm:flex gap-8 lg:gap-12 text-sm">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-[#b0005d] font-bold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#b0005d]" : "hover:text-[#b0005d] transition-colors"}>HOME</NavLink>
        <NavLink to="/collection" className={({ isActive }) => isActive ? "text-[#b0005d] font-bold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#b0005d]" : "hover:text-[#b0005d] transition-colors"}>COLLECTION</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "text-[#b0005d] font-bold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#b0005d]" : "hover:text-[#b0005d] transition-colors"}>ABOUT</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "text-[#b0005d] font-bold relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#b0005d]" : "hover:text-[#b0005d] transition-colors"}>CONTACT</NavLink>
      </ul>

      {/* Icons Section */}
      <div className="flex items-center gap-4 sm:gap-6">
        
        {/* Admin Panel (Desktop) */}
        <button
          onClick={() => window.open(import.meta.env.VITE_ADMIN_URL || "https://forever-admin-eight-bice.vercel.app", "_blank")}
          className="hidden md:inline-block border border-gray-200 rounded-full px-5 py-1.5 text-xs font-semibold hover:bg-gray-50 transition shadow-sm"
        >
          Admin Panel
        </button>

        {/* Search */}
        <button 
          aria-label="Search" 
          onClick={() => location.pathname.includes("collection") ? setShowSearch(!showSearch) : (setShowSearch(true), navigate("/collection"))}
          className="p-1 hover:text-[#b0005d] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>

        {/* User */}
        <button 
          aria-label="User Profile" 
          onClick={() => (token ? logout() : navigate("/login"))}
          className="p-1 hover:text-[#b0005d] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </button>

        {/* Cart */}
        <Link to="/cart" aria-label="Shopping Cart" className="relative p-1 hover:text-[#b0005d] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <span className="absolute top-0 -right-1 bg-[#b0005d] text-white rounded-full text-[8px] sm:text-[10px] w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center font-bold">
            {getCartCount()}
          </span>
        </Link>

        {/* Hamburger Icon (Mobile Only) */}
        <button onClick={() => setVisible(true)} className="sm:hidden p-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Sidebar menu for small screens */}
      <div className={`fixed top-0 right-0 bottom-0 bg-white transition-all duration-500 z-50 shadow-2xl overflow-hidden ${visible ? 'w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600 h-full">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-6 cursor-pointer border-b border-gray-100 group">
             <div className="p-2 group-hover:rotate-90 transition-transform duration-300">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
               </svg>
             </div>
             <p className="font-bold uppercase tracking-widest text-sm">Close Menu</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-5 pl-10 border-b border-gray-50 hover:bg-gray-50 text-lg font-medium tracking-wide" to="/">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-5 pl-10 border-b border-gray-50 hover:bg-gray-50 text-lg font-medium tracking-wide" to="/collection">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-5 pl-10 border-b border-gray-50 hover:bg-gray-50 text-lg font-medium tracking-wide" to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-5 pl-10 border-b border-gray-50 hover:bg-gray-50 text-lg font-medium tracking-wide" to="/contact">CONTACT</NavLink>
          
          <div className="mt-auto p-10 flex flex-col gap-6 bg-gray-50">
             <div className="flex items-center gap-4 text-sm text-gray-500">
               <span>Follow us:</span>
               <div className="flex gap-4">
                 {/* Social placeholders */}
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200">f</div>
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200">ig</div>
               </div>
             </div>
             <button
               onClick={() => { setVisible(false); window.open(import.meta.env.VITE_ADMIN_URL || "https://forever-admin-eight-bice.vercel.app", "_blank"); }}
               className="w-full bg-[#b0005d] text-white py-4 rounded-xl font-bold tracking-widest shadow-lg shadow-pink-200"
             >
               ADMIN PANEL
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
