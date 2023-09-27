import { toggleSearch } from "@/features/slice/eventSlice";
import { Switch } from "@/components/ui/switch";
import { SignOutButton, useAuth } from "@clerk/clerk-react";
import {
  CalendarDays,
  Heart,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Ticket,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useState } from "react";

const Navbar = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { userId } = useAuth();
  const { data: currentUser, isFetched } = useCurrentUser(userId);

  const userSignIn = isLoaded && isSignedIn;
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   document.documentElement.classList.add(mode)
  //
  //   return () => {
  //     document.documentElement.classList.remove(mode)
  //   }
  // }, [darkMode])

  // const { data: user, isFetched } = useQuery({
  //   queryKey: ["user", userId],
  //   queryFn: async () => {
  //     const res = await services.get(`/users/${userId}`)
  //     return res.data
  //   },
  //   enabled: !!userId
  // })

  return (
    <nav className="z-20 w-full flex items-center dark:bg-background dark:border-b dark:border-border justify-between  gap-4 px-6 sm:px-10 py-2 shadow-sm fixed top-0 left-0 bg-white">
      <div className="flex gap-8 items-center">
        <Link
          className="text-xl font-bold leading-4 hidden md:block text-primary dark:text-foreground"
          to="/"
        >
          Hangout.id
        </Link>
        <div
          onClick={() => dispatch(toggleSearch(true))}
          className="flex cursor-pointer bg-background border-primary dark:border-border backdrop-blur-sm w-full md:w-[350px] gap-2 rounded-full items-center border p-2 md:p-1"
        >
          <Search
            size={20}
            className="md:ml-2 text-primary dark:text-foreground"
          />
          <button className="px-2 py-1 hidden md:block text-primary/50 dark:text-foreground">
            Search...
          </button>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Link
          to={`/${userSignIn ? "event-form" : "sign-in"}`}
          className={`${!userSignIn && "hidden"
            } flex items-center bg-primary text-primary-foreground hover:bg-primary/80 gap-4 px-4 py-2 border rounded-full`}
        >
          <Plus size={20} />
          <span>Event</span>
        </Link>
        <div className={`${userSignIn && "p-1 rounded-md w-12 h-12 sm:ml-8"}`}>
          {userSignIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="ring-2 ring-primary">
                  <AvatarImage
                    className="object-cover"
                    src={isFetched && currentUser.imageUrl}
                  />
                  <AvatarFallback>
                    {isFetched &&
                      `${currentUser.firstname[0]}${currentUser.lastname[0]}`}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="">
                  <div className="flex gap-2 items-center">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        className="object-cover"
                        src={isFetched && currentUser.imageUrl}
                      />
                      <AvatarFallback>PM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>
                        {isFetched &&
                          `${currentUser.firstname} ${currentUser.lastname}`}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {isFetched && currentUser.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <span className="flex gap-2 items-center">
                    <p>My Points</p>
                    <Badge className="bg-primary hover:bg-primary/80 cursor-pointer">
                      {isFetched && currentUser.pointsTransaction?.points || 0}
                    </Badge>
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex gap-2 items-center">
                  <Link
                    to={`/profile/my-referals`}
                    className="flex items-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>My Referal Code</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2 items-center">
                  <Link
                    to={`/profile/my-events`}
                    className="flex items-center gap-2"
                  >
                    <CalendarDays className="w-4 h-4" />
                    <span>My Events</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2 items-center">
                  <Link
                    to={`/profile/my-favorites`}
                    className="flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    <span>My Favorites</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2 items-center">
                  <Link
                    to={`/dashboard?tab=overview`}
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex gap-2 items-center mt-6">
                  <LogOut className="w-4 h-4" />
                  <SignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/sign-in"
                className=" text-primary p-2 px-4 border-primary border rounded-full hover:bg-secondary"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="rounded-full border hover:bg-primary/90 bg-primary text-primary-foreground black text-black p-2 px-4"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <Switch
            id="theme-mode"
            checked={darkMode}
            onCheckedChange={() => setDarkMode(!darkMode)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
