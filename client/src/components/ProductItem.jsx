import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

// Single product card used in Collection, LatestCollection, BestSeller
const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="text-gray-700 cursor-pointer group"
      to={`/product/${id}`}
    >
      {/* Image with hover zoom + "Add to Cart" overlay */}
      <div className="overflow-hidden rounded-sm relative">
        <img
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
          src={image[0]}
          alt={name}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs text-center py-2 tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          QUICK VIEW
        </div>
      </div>
      <p className="pt-3 pb-1 text-sm leading-snug">{name}</p>
      <p className="text-sm font-semibold text-gray-900">
        {currency}{price}
      </p>
    </Link>
  );
};

export default ProductItem;