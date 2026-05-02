import React from "react";
const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <svg className="w-12 m-auto mb-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="18" />
          <path strokeLinecap="round" d="M16 24 Q20 16 24 20 Q28 24 32 16" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 30 L18 26 L14 22" />
        </svg>
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>
      <div>
        <svg className="w-12 m-auto mb-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="18" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 24 L21 30 L32 17" />
        </svg>
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>
      <div>
        <svg className="w-12 m-auto mb-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48">
          <path strokeLinecap="round" d="M14 18 Q14 12 24 12 Q34 12 34 18 L34 24 Q34 32 24 36 Q14 32 14 24Z" />
          <circle cx="20" cy="21" r="2" fill="currentColor" />
          <circle cx="28" cy="21" r="2" fill="currentColor" />
          <path strokeLinecap="round" d="M18 26 Q20 24 24 26 Q28 28 30 26" />
        </svg>
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;