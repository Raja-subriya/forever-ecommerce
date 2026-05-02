import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      to: "/add",
      label: "Add Items",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8"  y1="12" x2="16" y2="12" />
        </svg>
      ),
    },
    {
      to: "/list",
      label: "List Items",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="8"  y1="6"  x2="21" y2="6"  strokeLinecap="round" />
          <line x1="8"  y1="12" x2="21" y2="12" strokeLinecap="round" />
          <line x1="8"  y1="18" x2="21" y2="18" strokeLinecap="round" />
          <circle cx="3" cy="6"  r="1" fill="currentColor" />
          <circle cx="3" cy="12" r="1" fill="currentColor" />
          <circle cx="3" cy="18" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      to: "/orders",
      label: "Orders",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-[18%] min-h-screen border-r bg-white pt-6">
      {links.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 my-1 rounded-l transition-all text-sm ${
              isActive
                ? "bg-pink-50 border-pink-300 text-pink-700 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          {icon}
          <p className="hidden md:block">{label}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;