import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { ShopContext } from "../context/ShopContext";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter((product) => product.bestseller);
    setBestSellerProducts(filtered.slice(0, 5)); // Show top 5 bestsellers
  }, [products]);

  return (
    <div className="my-16 max-w-7xl mx-auto px-4">
      <div className="text-center py-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-full max-w-3xl mx-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellerProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            category={item.category}
            subCategory={item.subCategory}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
