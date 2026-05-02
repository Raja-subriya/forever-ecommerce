import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

const Footer = () => {
  return (
    <div className="bg-gray-100 mt-20 px-6 md:px-16 pt-12">

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LEFT DESCRIPTION */}
        <div>
          <h2 className="font-bold text-2xl mb-4 uppercase tracking-widest">
            FOREVER<span className="text-pink-500">.</span>
          </h2>
          <p className="text-gray-600 text-sm leading-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* COMPANY */}
        <div>
          <p className="font-semibold text-lg mb-4 uppercase tracking-wide">COMPANY</p>
          <ul className="text-gray-600 space-y-2">
            <li>
              <Link to="/" className="hover:text-black cursor-pointer">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black cursor-pointer">About us</Link>
            </li>
            <li>
              <Link to="/delivery" className="hover:text-black cursor-pointer">Delivery</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-black cursor-pointer">Privacy policy</Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <p className="font-semibold text-lg mb-4 uppercase tracking-wide">GET IN TOUCH</p>

          <p className="text-gray-600">+1-212-456-7890</p>
          <p className="text-gray-600">contact@foreveryou.com</p>
        </div>

      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="border-t mt-10 py-5 text-center text-gray-500 text-sm">
        Copyright 2026 @ forever.com - All Right Reserved.
      </div>

    </div>
  );
};

export default Footer;
