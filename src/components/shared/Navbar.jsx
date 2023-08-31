import { Bell, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between  gap-4 px-6 sm:px-10 py-2 shadow-md fixed top-0 left-0 bg-white">
      <Link className="text-xl font-bold leading-4 hidden sm:block" to="/">Hangout</Link>
      <div className="flex gap-2 rounded-full items-center w-[800px] border p-2">
        <Search size={20} className="ml-2" />
        <input className="w-full outline-none px-2 py-1" type="text" placeholder="Search..." />
      </div>
      <div className="flex gap-2 items-center">
        <button className="flex items-center hover:bg-gray-100 gap-4 px-4 py-2 border-2  rounded-full">
          <Plus size={20} />
          <span>Event</span>
        </button>
        <span className="p-2 rounded-full border">
          <Bell />
        </span>
        <div className="p-1 rounded-md w-12 h-12 ml-8">
          <img className="object-cover rounded-md" src="/placeholder.jpeg" alt="profile_pict" />
        </div>
      </div>
    </nav>
  )
};

export default Navbar;
