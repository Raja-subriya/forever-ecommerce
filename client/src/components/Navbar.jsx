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
    <>
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
          <button onClick={() => window.open(import.meta.env.VITE_ADMIN_URL || "https://forever-admin-eight-bice.vercel.app", "_blank")} className="hidden md:inline-block border border-gray-200 rounded-full px-5 py-1.5 text-xs font-semibold hover:bg-gray-50 transition">Admin</button>
          <button aria-label="Search" onClick={() => location.pathname.includes("collection") ? setShowSearch(!showSearch) : (setShowSearch(true), navigate("/collection"))} className="p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg></button>
          <button aria-label="User Profile" onClick={() => (token ? logout() : navigate("/login"))} className="p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg></button>
          <Link to="/cart" className="relative p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg><span className="absolute top-0 -right-1 bg-[#b0005d] text-white rounded-full text-[8px] sm:text-[10px] w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center font-bold">{getCartCount()}</span></Link>
          <button onClick={() => setVisible(true)} className="sm:hidden p-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg></button>
        </div>
      </nav>

      {/* Sidebar menu for small screens */}
      <div className={`fixed top-0 left-0 w-full h-full bg-white z-[9999] transition-all duration-300 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col h-full bg-white">
          
          {/* Header Area */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-black rounded-full"></div>
               <p className="font-bold uppercase tracking-widest text-sm">Navigation</p>
             </div>
             <button onClick={() => setVisible(false)} className="p-2 bg-gray-100 rounded-full">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
             </button>
          </div>

          {/* Menu Items (Matching Screenshot Design) */}
          <div className="flex flex-col">
            <NavLink onClick={() => setVisible(false)} to="/" className="w-full bg-black text-white py-6 px-8 text-xl font-bold uppercase border-b border-black">
              HOME
            </NavLink>
            
            <NavLink onClick={() => setVisible(false)} to="/collection" className="w-full bg-white text-gray-900 py-6 px-8 text-xl font-bold uppercase border-b border-gray-200">
              COLLECTION
            </NavLink>
            
            <NavLink onClick={() => setVisible(false)} to="/about" className="w-full bg-white text-gray-900 py-6 px-8 text-xl font-bold uppercase border-b border-gray-200">
              ABOUT
            </NavLink>
            
            <NavLink onClick={() => setVisible(false)} to="/contact" className="w-full bg-white text-gray-900 py-6 px-8 text-xl font-bold uppercase border-b border-gray-200">
              CONTACT
            </NavLink>

            <button 
              onClick={() => { setVisible(false); window.open(import.meta.env.VITE_ADMIN_URL || "https://forever-admin-eight-bice.vercel.app", "_blank"); }} 
              className="w-full bg-white text-[#b0005d] py-6 px-8 text-xl font-bold uppercase border-b border-gray-200 text-left flex justify-between items-center"
            >
              ADMIN PANEL
              <span className="text-[10px] border border-[#b0005d] px-2 py-0.5 rounded text-[#b0005d]">DASHBOARD</span>
            </button>
          </div>

          {/* Footer Branding */}
          <div className="mt-auto p-12 text-center bg-gray-50 border-t">
             <p className="text-3xl font-black tracking-[0.4em] text-gray-200">FOREVER</p>
             <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-[0.2em]">Premium Fashion Store</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;
