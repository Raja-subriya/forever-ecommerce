import React, { useState } from 'react';

const products = {
  1: {
    title: "Men Tapered Fit Flat-Front Trousers",
    price: "$63",
    description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    image: "https://via.placeholder.com/400x500?text=Black+Trousers"
  },
  2: {
    title: "Men Grey Cargo Pants",
    price: "$55",
    description: "Comfortable grey cargo pants with multiple pockets, perfect for casual wear.",
    image: "https://via.placeholder.com/400x500?text=Grey+Cargo+Pants"
  },
  3: {
    title: "Men Blue Joggers",
    price: "$50",
    description: "Stylish blue joggers made from breathable fabric, ideal for workouts or casual outings.",
    image: "https://via.placeholder.com/400x500?text=Blue+Joggers"
  }
};

const ProductGallery = () => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const closeModal = () => setSelectedProductId(null);

  const product = selectedProductId ? products[selectedProductId] : null;

  return (
    <div>
      <h2>Related Products</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {Object.entries(products).map(([id, product]) => (
          <div
            key={id}
            style={{ cursor: 'pointer', width: '150px', textAlign: 'center' }}
            onClick={() => setSelectedProductId(id)}
          >
            <img
              src={product.image.replace('400x500', '150x200')}
              alt={product.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <p>{product.title}</p>
          </div>
        ))}
      </div>

      {product && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            zIndex: 1000,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)'
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '500px',
              width: '90%',
              position: 'relative'
            }}
            onClick={e => e.stopPropagation()}
          >
            <span
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                fontSize: '24px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={closeModal}
            >
              &times;
            </span>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <div style={{ marginTop: '15px' }}>
              <h3>{product.title}</h3>
              <p>{product.price}</p>
              <p>{product.description}</p>
              <div>
                <strong>Select Size:</strong><br />
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button
                    key={size}
                    style={{
                      margin: '5px 5px 0 0',
                      padding: '8px 12px',
                      border: '1px solid #333',
                      background: 'none',
                      cursor: 'pointer',
                      borderRadius: '4px'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                style={{
                  marginTop: '15px',
                  padding: '10px 20px',
                  backgroundColor: 'black',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
