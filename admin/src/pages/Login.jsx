import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ setToken, backendUrl }) => {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/user/admin`, {
        email, password,
      });
      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        setToken(res.data.token);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg px-8 py-8 max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center items-center gap-0.5 mb-6">
          <h1 className="text-2xl font-bold tracking-widest text-gray-900">FOREVER</h1>
          <span className="w-2 h-2 rounded-full bg-pink-400 mb-0.5" />
        </div>
        <p className="text-center text-gray-500 text-sm mb-6">Admin Panel</p>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none text-sm"
              type="email"
              placeholder="admin@forever.com"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none text-sm"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black text-sm tracking-widest hover:bg-gray-800 transition-colors"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;