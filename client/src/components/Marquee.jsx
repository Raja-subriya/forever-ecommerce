import React from 'react';

const Marquee = () => {
  const items = ["FREE SHIPPING WORLDWIDE", "NEW ARRIVALS EVERY WEEK", "100% SECURE PAYMENTS", "EASY 7-DAY RETURNS", "EXCLUSIVE DESIGNER COLLECTIONS"];

  return (
    <div className="bg-[#b0005d] text-white py-3 overflow-hidden whitespace-nowrap border-y border-pink-700/30">
      <div className="inline-block animate-marquee">
        {items.concat(items).map((text, i) => (
          <span key={i} className="mx-8 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
            {text}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Marquee;
