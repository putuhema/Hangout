import { toggleSearch } from "@/features/slice/eventSlice";
import { UserButton, useAuth } from "@clerk/clerk-react";
import { Bell, Plus, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const userSignIn = isLoaded && isSignedIn
  const dispatch = useDispatch()

  return (
    <nav className="z-20 w-full flex items-center justify-between  gap-4 px-6 sm:px-10 py-2 shadow-md fixed top-0 left-0 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
      <div className="flex gap-8 items-center">
        <Link className="text-xl font-bold leading-4 hidden md:block" to="/">Hangout.id</Link>
        <div
          onClick={() => dispatch(toggleSearch(true))}
          className="flex cursor-pointer bg-white/30 backdrop-blur-sm w-[350px] gap-2 rounded-full items-center border p-1">
          <Search size={20} className="ml-2" />
          <button className="px-2 py-1"
          >Search...</button>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Link to={`/${userSignIn ? 'event-form' : "sign-in"}`} className="flex items-center bg-white/30 backdrop-blur-sm hover:bg-white/40 gap-4 px-4 py-2 border  rounded-full">
          <Plus size={20} />
          <span>Event</span>
        </Link>
        <div className={`${userSignIn && 'p-1 rounded-md w-12 h-12 ml-8'}`}>
          {
            userSignIn ?
              <div className="flex gap-2 items-center">
                <span className="p-1 rounded-full border">
                  <Bell />
                </span>
                <UserButton />
              </div>
              : (
                <div className="flex gap-4">
                  <Link to="/sign-in" className=" text-white p-2 px-4">Sign In</Link>
                  <Link to="/sign-up" className="rounded-full bg-white/30 black text-white p-2 px-4">Sign Up</Link>
                </div>
              )
          }
        </div>
      </div>
    </nav >
  )
};

export default Navbar;
