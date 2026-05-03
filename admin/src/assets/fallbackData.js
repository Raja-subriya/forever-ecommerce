export const fallbackProducts = [
  {
    _id: "1",
    name: "Men Tapered Fit Flat-Front Trousers",
    description: "Comfort fit trousers for daily wear.",
    price: 63,
    image: ["https://p1.pichost.me/i/40/1638206.jpg"], // Placeholder
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    bestseller: true,
  },
  {
    _id: "2",
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "Soft cotton t-shirt for all-day comfort.",
    price: 80,
    image: ["https://p1.pichost.me/i/40/1638206.jpg"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
  },
  {
    _id: "3",
    name: "Boy Round Neck Pure Cotton T-shirt",
    description: "Breathable cotton t-shirt for kids.",
    price: 60,
    image: ["https://p1.pichost.me/i/40/1638206.jpg"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    bestseller: false,
  },
  {
    _id: "4",
    name: "Women Round Neck Cotton Top",
    description: "Lightweight and casual everyday top.",
    price: 42,
    image: ["https://p1.pichost.me/i/40/1638206.jpg"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
  }
];

export const fallbackOrders = [
  {
    _id: "o1",
    items: [{ name: "Women Zip-Front Relaxed Fit Jacket", quantity: 1, size: "M" }],
    amount: 78,
    address: { firstName: "John", lastName: "Doe", street: "123 Main St", city: "New York", state: "NY", country: "USA", zipcode: "10001", phone: "1234567890" },
    status: "Out for delivery",
    paymentMethod: "COD",
    payment: false,
    date: Date.now() - 86400000
  },
  {
    _id: "o2",
    items: [{ name: "Boy Round Neck Pure Cotton T-shirt", quantity: 1, size: "L" }],
    amount: 70,
    address: { firstName: "John", lastName: "Doe", street: "123 Main St", city: "New York", state: "NY", country: "USA", zipcode: "10001", phone: "1234567890" },
    status: "Order Placed",
    paymentMethod: "COD",
    payment: false,
    date: Date.now() - 172800000
  },
  {
    _id: "o3",
    items: [{ name: "Women Round Neck Cotton Top", quantity: 1, size: "XL" }],
    amount: 52,
    address: { firstName: "John", lastName: "Doe", street: "123 Main St", city: "New York", state: "NY", country: "USA", zipcode: "10001", phone: "1234567890" },
    status: "Order Placed",
    paymentMethod: "COD",
    payment: false,
    date: Date.now() - 259200000
  }
];
