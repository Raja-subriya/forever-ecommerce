import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

// Single product card used in Collection, LatestCollection, BestSeller
const ProductItem = ({ id, image, name, price, category, subCategory }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="text-gray-700 cursor-pointer group flex flex-col"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden relative aspect-[3/4] bg-gray-50 border border-gray-100">
        <img
          className={`w-full h-full object-cover transition-all duration-700 ${image[1] ? 'group-hover:opacity-0' : 'group-hover:scale-110'}`}
          src={image[0]}
          alt={name}
        />
        {image[1] && (
          <img
            className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
            src={image[1]}
            alt={name}
          />
        )}
        {/* Hover Detail Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <div className="bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] tracking-widest uppercase font-bold text-black transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
             View Details
           </div>
        </div>
      </div>
      
      <div className="pt-4 flex flex-col gap-1">
        <div className="flex justify-between items-center">
           <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">{category || "Collection"}</p>
           <p className="text-[10px] text-orange-500 font-bold uppercase tracking-tighter">New</p>
        </div>
        <p className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-black transition-colors">{name}</p>
        <p className="text-sm font-bold text-gray-900">
          {currency}{price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;