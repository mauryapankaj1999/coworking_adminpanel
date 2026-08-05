import { NavLink } from "react-router-dom";
import { IoBookOutline, IoClose } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { RiBloggerLine } from "react-icons/ri";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const adminSidebar = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <MdOutlineDashboard size={20} />,
    },
    {
      name: "Category",
      path: "/category",
      icon: <IoBookOutline size={20} />,
    },
    // {
    //   name: "Add subcategory",
    //   path: "/addsubcategory",
    //   icon: <IoBookOutline size={20} />,
    // },
    {
      name: "SubCategory",
      path: "/subCategory",
      icon: <IoBookOutline size={20} />,
    },
    {
      name:"Workspace",
      path:"/workspace",
      icon: <IoBookOutline size={20} />,
    },
    {
      name:"Blog",
      path:"/blog",
      icon: <IoBookOutline size={20} />,
    }
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
        />
      )}

      <div
        className={`
          fixed top-0 left-0
          z-50
          h-screen
          w-[12rem]
          bg-white
          text-black
          transform
          transition-transform
          duration-300
          ease-in-out
          border-r
          border-gray-200
          shadow-lg
          lg:shadow-none
          flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {/* <img src="/stokzy_logo.png" alt="logo" className="w-8" /> */}
            <h4 className="font-bold text-lg text-[#184981] tracking-tight">
              CoWorking
            </h4>
          </div>
          <button
            className="lg:hidden text-gray-500 hover:text-black transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3">
          <ul className="flex flex-col gap-1 px-2">
            {adminSidebar.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-[#184981]/10 text-[#184981]"
                        : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    }`
                  }
                >
                  <span
                    className={`text-lg transition-colors`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer (optional) */}
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          © {new Date().getFullYear()} CoWorking
        </div>
      </div>
    </>
  );
};

export default Sidebar;