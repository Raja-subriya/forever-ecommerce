import React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId }                   = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image,       setImage]       = useState("");   // currently selected main image
  const [size,        setSize]        = useState("");   // currently selected size
  const [color,       setColor]       = useState("");   // currently selected color
  const handleColorSelect = (selectedColor) => {
    setColor(selectedColor);

    // If backend sends explicit map, use that.
    if (productData?.colorImages?.[selectedColor]) {
      setImage(productData.colorImages[selectedColor]);
      return;
    }

    // Fallback: map color index to image index.
    const colorIndex = productData?.colors?.findIndex((c) => c === selectedColor);
    if (colorIndex >= 0 && productData?.image?.[colorIndex]) {
      setImage(productData.image[colorIndex]);
    }
  };

  // Find product from context by URL param
  const fetchProductData = () => {
    let found = products.find(
      (item) =>
        String(item._id) === String(productId) ||
        String(item.id) === String(productId)
    );

    // Backward-compat: allow numeric route like /product/1 to map by list index
    if (!found && /^\d+$/.test(String(productId))) {
      const index = Number(productId) - 1;
      if (index >= 0 && index < products.length) {
        found = products[index];
      }
    }

    if (found) {
      setProductData(found);
      setImage(found.image[0]);   // default to first image
      setSize("");
      setColor(found.colors?.[0] || "");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="border-t pt-10">
        <p className="text-gray-500 text-sm">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* ── Product Info: Images + Details ── */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* Thumbnail strip + main image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-2">
            {productData.image.map((item, i) => (
              <img
                key={i}
                onClick={() => setImage(item)}
                src={item}
                className={`w-[24%] sm:w-full cursor-pointer object-cover border-2 transition-all ${
                  image === item ? "border-gray-400" : "border-transparent"
                }`}
                alt=""
              />
            ))}
          </div>

          {/* Main image */}
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto object-cover"
              src={image}
              alt={productData.name}
            />
          </div>
        </div>

        {/* Product details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          {/* Star rating (static) */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <svg key={i} className="w-3.5 fill-orange-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <svg className="w-3.5 fill-gray-300" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p className="pl-2 text-sm text-gray-500">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5 text-sm leading-6">{productData.description}</p>

          {/* Real-time Social Proof */}
          <div className="flex items-center gap-2 mt-4 text-sm text-green-600 bg-green-50 w-fit px-3 py-1.5 rounded-full border border-green-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="font-medium">{Math.floor(Math.random() * 20) + 5} people are viewing this right now</p>
          </div>

          {/* Color selector */}
          {productData.colors?.length > 0 && (
            <div className="flex flex-col gap-4 mt-8">
              <p className="text-sm font-medium">SELECT COLOR</p>
              <div className="flex gap-2 flex-wrap">
                {productData.colors.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleColorSelect(item)}
                    className={`border py-2 px-4 text-sm transition-all ${
                      item === color
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          <div className="flex flex-col gap-4 my-8">
            <p className="text-sm font-medium">SELECT SIZE</p>
            <div className="flex gap-2">
              {productData.sizes.map((item) => (
                <button
                  key={item}
                  onClick={() => setSize(item === size ? "" : item)}
                  className={`border py-2 px-4 text-sm transition-all ${
                    item === size
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, size, color)}
            className="bg-black text-white px-8 py-3 text-sm tracking-widest hover:bg-gray-800 transition-colors active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5 border-gray-200" />

          {/* Product meta */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ── Description & Reviews Tabs ── */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm text-gray-500">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals
            can showcase their products, interact with customers, and conduct
            transactions without the need for a physical storefront.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations such as sizes, colors, or quantities.
          </p>
        </div>
      </div>

      {/* ── Related Products ── */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;