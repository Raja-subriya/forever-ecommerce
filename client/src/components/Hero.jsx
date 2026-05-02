import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col sm:flex-row border border-gray-200 rounded-sm overflow-hidden"
    >

      {/* ── Left: Text ── */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-0 px-10 sm:px-16 bg-gradient-to-br from-white to-pink-50">
        <div className="text-gray-800">

          {/* Label */}
          <div className="flex items-center gap-3 mb-4">
            <p className="w-8 md:w-11 h-[2px] bg-[#b0005d]" />
            <p className="font-bold text-xs md:text-sm tracking-[0.3em] text-[#b0005d] uppercase">
              Limited Edition
            </p>
          </div>

          {/* Heading */}
          <h1 className="prata-regular text-4xl sm:py-3 lg:text-6xl leading-tight font-extrabold text-gray-900 mb-4">
            The New <br /> Standard <span className="text-[#b0005d]">2026</span>
          </h1>

          <p className="text-gray-500 text-sm md:text-base mb-8 max-w-sm leading-relaxed">
            Discover a curated selection of premium apparel designed for those who value style and substance.
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/collection")}
            className="bg-black text-white px-10 py-4 text-xs md:text-sm font-bold tracking-[0.2em] hover:bg-[#b0005d] transition-all duration-500 shadow-xl hover:shadow-pink-200/50 uppercase rounded-full"
          >
            Explore Collection
          </button>

        </div>
      </div>

      {/* ── Right: Image ── */}
      <div className="w-full sm:w-1/2 min-h-[400px] sm:min-h-[600px] overflow-hidden group">
        <img
          src="/images/product17.jpg"
          alt="Hero"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
        />
      </div>

    </motion.div>
  );
};

export default Hero;