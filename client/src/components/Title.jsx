import React from "react";

// Reusable section heading used throughout the site
// Usage: <Title text1="LATEST" text2="COLLECTIONS" />
// Renders: LATEST COLLECTIONS —— 
const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500 tracking-wider">{text1}</p>
      <p className="text-gray-700 font-semibold tracking-wider">{text2}</p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700" />
    </div>
  );
};

export default Title;