import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-10 px-4 md:px-10 py-10">

      {/* TEXT SECTION */}
      <div className="md:w-1/2 flex flex-col gap-5">

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome to Forever Store
        </h1>

        <p className="text-gray-600">
          Discover fashion, beauty, and lifestyle products at the best prices.
          Shop easily from home with amazing offers.
        </p>

        <button className="bg-black text-white px-6 py-3 w-fit rounded hover:bg-gray-800 transition">
          Shop Now
        </button>

      </div>

      {/* IMAGE SECTION (IMPORTANT FIX) */}
      <div className="md:w-1/2">
        <img
          src="/home.jpg"
          alt="Hero"
          className="w-full h-[300px] md:h-[450px] object-cover rounded-lg shadow-lg hover:scale-105 transition duration-500"
        />
      </div>

    </div>
  );
};

export default Hero;