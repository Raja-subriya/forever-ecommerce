import React, { useEffect, useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, Legend 
} from 'recharts';
import axios from 'axios';
import { backendUrl, currency } from '../App';

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    chartData: []
  });

  const fetchDashboardData = async () => {
    try {
      // Fetch orders to calculate revenue and order count
      const ordersRes = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
      const productsRes = await axios.get(`${backendUrl}/api/product/list`);

      if (ordersRes.data.success && productsRes.data.success) {
        const orders = ordersRes.data.orders;
        const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
        
        // Mock data for the chart based on actual orders
        // In a real app, you'd group orders by date on the backend
        const last7Days = [...Array(7)].map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (6 - i));
          const dateStr = d.toLocaleDateString('en-US', { weekday: 'short' });
          return { name: dateStr, revenue: Math.floor(Math.random() * 500) + 100, orders: Math.floor(Math.random() * 10) + 1 };
        });

        setStats({
          totalRevenue,
          totalOrders: orders.length,
          totalProducts: productsRes.data.products.length,
          chartData: last7Days
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard stats", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-4 rounded-full ${color} bg-opacity-10 text-xl`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h2>
        <p className="text-gray-500 text-sm">Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`${currency}${stats.totalRevenue}`} 
          icon="💰" 
          color="bg-green-500 text-green-600" 
        />
        <StatCard 
          title="Total Orders" 
          value={stats.totalOrders} 
          icon="📦" 
          color="bg-blue-500 text-blue-600" 
        />
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon="👕" 
          color="bg-pink-500 text-pink-600" 
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-800">Revenue Overview</h3>
          <select className="text-sm border border-gray-200 rounded-md px-2 py-1 outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.chartData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category (Mock) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">Sales by Category</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Men', value: 400 },
                { name: 'Women', value: 300 },
                { name: 'Kids', value: 200 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity (Mock) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">Recent Activity</h3>
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs">👤</div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">New order placed</p>
                    <p className="text-xs text-gray-400">2 minutes ago</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-700">$120.00</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
