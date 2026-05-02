import React, { useState, useEffect } from 'react';

const LiveSales = () => {
  const [show, setShow] = useState(false);
  const [currentSale, setCurrentSale] = useState(null);

  const locations = ["London, UK", "New York, USA", "Paris, France", "Mumbai, India", "Berlin, Germany", "Tokyo, Japan", "Sydney, Australia"];
  const products = ["Men Round Neck T-shirt", "Women Zip-Front Jacket", "Kid Tapered Trouser", "Slim Fit Puffer Jacket", "Cotton Top"];

  useEffect(() => {
    const showNotification = () => {
      const randomLoc = locations[Math.floor(Math.random() * locations.length)];
      const randomProd = products[Math.floor(Math.random() * products.length)];
      const randomTime = Math.floor(Math.random() * 50) + 5;

      setCurrentSale({ location: randomLoc, product: randomProd, time: randomTime });
      setShow(true);

      setTimeout(() => setShow(false), 5000); // Hide after 5 seconds
    };

    // Initial delay
    const timeout = setTimeout(showNotification, 8000);

    // Repeat every 20-30 seconds
    const interval = setInterval(showNotification, 25000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  if (!show || !currentSale) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-bounce-subtle">
      <div className="bg-white shadow-2xl rounded-lg p-4 border border-gray-100 flex items-center gap-4 max-w-[300px] transition-all duration-500">
        <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-xl">
          🛍️
        </div>
        <div>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Recent Purchase</p>
          <p className="text-xs text-gray-700 leading-tight">
            Someone in <span className="font-bold">{currentSale.location}</span> just bought a <span className="font-bold text-pink-500">{currentSale.product}</span>
          </p>
          <p className="text-[10px] text-gray-400 mt-1">{currentSale.time} minutes ago</p>
        </div>
        <button onClick={() => setShow(false)} className="absolute top-2 right-2 text-gray-300 hover:text-gray-500">✕</button>
      </div>
    </div>
  );
};

export default LiveSales;
