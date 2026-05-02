const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between bg-white border-b">
      {/* Logo */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-0.5">
          <p className="text-xl font-bold tracking-widest text-gray-900">FOREVER</p>
          <span className="w-2 h-2 rounded-full bg-pink-400 mb-0.5" />
        </div>
        <p className="text-[10px] text-gray-400 font-medium tracking-[0.2em] mt-0.5 uppercase">Admin Panel</p>
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          setToken("");
        }}
        className="bg-gray-800 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-black transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;