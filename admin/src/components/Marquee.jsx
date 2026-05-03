import React from 'react';

const Marquee = () => {
  const items = [
    "ADMIN DASHBOARD ACTIVE", 
    "FOREVER PREMIUM E-COMMERCE", 
    "MANAGE PRODUCTS & ORDERS", 
    "SYSTEM STATUS: ONLINE", 
    "LIVE SALES MONITORING"
  ];

  return (
    <div className="bg-pink-600 text-white py-2 overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-marquee">
        {items.concat(items).map((text, i) => (
          <span key={i} className="mx-8 text-[9px] font-bold tracking-[0.2em] uppercase">
            {text}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Marquee;
