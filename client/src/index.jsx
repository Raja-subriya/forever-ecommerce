// ── Title ─────────────────────────────────────────────────────
// Usage: <Title text1="LATEST" text2="COLLECTIONS" />
// Renders: LATEST COLLECTIONS ——
export const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500 tracking-wider">{text1} </p>
      <p className="text-gray-700 font-semibold tracking-wider">{text2}</p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700" />
    </div>
  );
};
export default Title;

// ── OurPolicy ─────────────────────────────────────────────────
export const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      {[
        {
          icon: (
            <svg className="w-12 m-auto mb-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="18" />
              <path strokeLinecap="round" d="M16 24 Q20 16 24 20 Q28 24 32 16" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 30 L18 26 L14 22" />
            </svg>
          ),
          title: "Easy Exchange Policy",
          desc: "We offer hassle free exchange policy",
        },
        {
          icon: (
            <svg className="w-12 m-auto mb-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="18" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 24 L21 30 L32 17" />
            </svg>
          ),
          title: "7 Days Return Policy",
          desc: "We provide 7 days free return policy",
        },
        {
          icon: (
            <svg className="w-12 m-auto mb-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48">
              <path strokeLinecap="round" d="M14 18 Q14 12 24 12 Q34 12 34 18 L34 24 Q34 32 24 36 Q14 32 14 24Z" />
              <circle cx="20" cy="21" r="2" fill="currentColor" />
              <circle cx="28" cy="21" r="2" fill="currentColor" />
              <path strokeLinecap="round" d="M18 26 Q20 24 24 26 Q28 28 30 26" />
            </svg>
          ),
          title: "Best Customer Support",
          desc: "We provide 24/7 customer support",
        },
      ].map((item, i) => (
        <div key={i}>
          {item.icon}
          <p className="font-semibold">{item.title}</p>
          <p className="text-gray-400">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

// ── NewsletterBox ─────────────────────────────────────────────
export const NewsletterBox = () => {
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
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none text-sm"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4 tracking-widest hover:bg-gray-800 transition"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

// ── CartTotal ─────────────────────────────────────────────────
// Shown on Cart page and PlaceOrder page
export const CartTotal = () => {
  const { currency, deliveryCharge, getCartAmount } = require("../context/ShopContext");
  // Note: use useContext in actual component — this is exported as a standalone
  return null; // See Cart.jsx for actual implementation
};