import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

// Image placeholder SVG shown before a file is selected
const ImgPlaceholder = () => (
  <div className="w-20 h-20 border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 transition-colors">
    <svg className="w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
    <span className="text-[10px] mt-1 font-medium">Upload</span>
  </div>
);

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name,        setName]        = useState("");
  const [description, setDescription] = useState("");
  const [price,       setPrice]       = useState("");
  const [category,    setCategory]    = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller,  setBestseller]  = useState(false);
  const [sizes,       setSizes]       = useState([]);
  const [colors,      setColors]      = useState([]);

  // Toggle a size on/off
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Use FormData to send files + fields in one request
      const formData = new FormData();
      formData.append("name",        name);
      formData.append("description", description);
      formData.append("price",       price);
      formData.append("category",    category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller",  bestseller);
      formData.append("sizes",       JSON.stringify(sizes));  // sent as JSON string
      formData.append("colors",      JSON.stringify(colors));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const res = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // Reset form
        setName(""); setDescription(""); setPrice("");
        setImage1(null); setImage2(null); setImage3(null); setImage4(null);
        setSizes([]); setColors([]); setBestseller(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Render a single image upload slot
  const ImageUpload = ({ img, setter, label }) => (
    <label className="cursor-pointer">
      {img ? (
        <img
          className="w-20 h-20 object-cover border"
          src={URL.createObjectURL(img)}
          alt={label}
        />
      ) : (
        <ImgPlaceholder />
      )}
      <input
        onChange={(e) => setter(e.target.files[0])}
        type="file"
        accept="image/*"
        className="hidden"
      />
    </label>
  );

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-6">
      {/* ── Image Upload ── */}
      <div>
        <p className="mb-2 text-sm text-gray-800">Upload Image</p>
        <div className="flex gap-3">
          <ImageUpload img={image1} setter={setImage1} label="Image 1" />
          <ImageUpload img={image2} setter={setImage2} label="Image 2" />
          <ImageUpload img={image3} setter={setImage3} label="Image 3" />
          <ImageUpload img={image4} setter={setImage4} label="Image 4" />
        </div>
      </div>

      {/* ── Product Name ── */}
      <div className="w-full">
        <p className="mb-2 text-sm text-gray-800">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-sm text-sm outline-none focus:border-gray-500"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* ── Description ── */}
      <div className="w-full">
        <p className="mb-2 text-sm text-gray-800">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-sm text-sm outline-none resize-none focus:border-gray-500"
          rows={4}
          placeholder="Write content here"
          required
        />
      </div>

      {/* ── Category / Sub-category / Price ── */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:gap-8">
        <div>
          <p className="mb-2 text-sm text-gray-800">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm outline-none"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-800">Sub category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm outline-none"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm text-gray-800">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full max-w-[120px] px-3 py-2 border border-gray-300 rounded-sm text-sm outline-none"
            type="number"
            placeholder="25"
            min="0"
            required
          />
        </div>
      </div>

      {/* ── Sizes ── */}
      <div>
        <p className="mb-3 text-sm text-gray-800">Product Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSize(s)}
              className={`px-3 py-1 border text-sm font-medium rounded-sm transition-all ${
                sizes.includes(s)
                  ? "bg-pink-100 text-black border-pink-300"
                  : "bg-gray-100 text-gray-600 border-gray-300 hover:border-gray-500"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ── Bestseller toggle ── */}
      <div className="flex gap-2 items-center">
        <input
          onChange={(e) => setBestseller(e.target.checked)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="w-4 h-4 cursor-pointer accent-pink-500"
        />
        <label htmlFor="bestseller" className="cursor-pointer text-sm text-gray-600">
          Add to bestseller
        </label>
      </div>

      {/* ── Submit ── */}
      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white text-sm tracking-widest hover:bg-gray-800 transition-colors rounded"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;