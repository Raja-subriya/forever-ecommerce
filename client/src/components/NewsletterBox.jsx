import React from "react";
const NewsletterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex flex-col sm:flex-row items-center gap-3 mx-auto my-6"
      >
        <input
          className="w-full flex-1 outline-none px-4 text-sm py-4 border border-gray-300"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-black text-white text-xs px-10 py-4 tracking-widest hover:bg-gray-800 transition-colors uppercase font-bold"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;