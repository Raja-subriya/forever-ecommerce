import React from "react";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title       from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter,   setShowFilter]   = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category,     setCategory]     = useState([]);    // men | women | kids
  const [subCategory,  setSubCategory]  = useState([]);    // Topwear | Bottomwear | Winterwear
  const [sortType,     setSortType]     = useState("relevant");

  // ── Toggle category / subCategory checkboxes ─────────────────
  const toggleFilter = (value, setter, state) => {
    setter(
      state.includes(value)
        ? state.filter((item) => item !== value)
        : [...state, value]
    );
  };

  // ── Apply filters ─────────────────────────────────────────────
  const applyFilter = () => {
    let productsCopy = products.slice();

    // Search filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Sub-category filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  // ── Sort filtered products ────────────────────────────────────
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
    }
  };

  useEffect(() => { applyFilter(); }, [category, subCategory, search, showSearch, products]);
  useEffect(() => { sortProduct();  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* ── Sidebar Filter ── */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 font-medium"
        >
          FILTERS
          <svg
            className={`w-3 sm:hidden transition-transform ${showFilter ? "rotate-90" : ""}`}
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" d="M9 18l6-6-6-6" />
          </svg>
        </p>

        {/* Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3"
                  value={cat}
                  onChange={(e) => toggleFilter(e.target.value, setCategory, category)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Sub-category filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
              <label key={sub} className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3"
                  value={sub}
                  onChange={(e) => toggleFilter(e.target.value, setSubCategory, subCategory)}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="flex-1">
        {/* Top bar: title + sort */}
        <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 text-sm px-2 py-1"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;