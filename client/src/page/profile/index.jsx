import Container from "@/components/layout/Container";
import { Calendar, Heart, Home, Ticket } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <Container>
      <div className="flex flex-col md:flex-row border rounded-md h-[calc(100vh_-_100px)]">
        <div className="w-full hidden md:block md:w-[300px] bg-secondary rounded-l-md p-4 md:pl-2 py-2">
          <ul className="md:mt-6 text-foreground ">
            <NavLink
              className={`${({ isActive }) =>
                isActive
                  ? "active"
                  : "flex"} flex items-center justify-start gap-2 py-2 pl-2 pr-0 hover:bg-primary hover:text-primary-foreground rounded-sm md:rounded-l-md cursor-pointer`}
              to="/profile/my-referals"
            >
              <Ticket className="w-4 h-4" />
              <p className="">My Referal Codes</p>
            </NavLink>
            <NavLink
              className={`${({ isActive }) =>
                isActive
                  ? "active"
                  : "flex"} flex items-center justify-center md:justify-start gap-2 py-2 md:pl-2 pr-0 hover:bg-primary hover:text-primary-foreground rounded-sm md:rounded-l-md cursor-pointer`}
              to="/profile/my-events"
            >
              <Calendar className="w-4 h-4" />
              <p>My Events</p>
            </NavLink>
            <NavLink
              className={`${({ isActive }) =>
                isActive
                  ? "active"
                  : "flex"} flex items-center justify-center md:justify-start gap-2 py-2 md:pl-2 pr-0 hover:bg-primary hover:text-primary-foreground rounded-sm md:rounded-l-md cursor-pointer`}
              to="/profile/my-favorites"
            >
              <Heart className="w-4 h-4" />
              <p>Favorite Events</p>
            </NavLink>
          </ul>
        </div>
        <div className="flex-1 bg-background rounded-md md:rounded-r-md">
          <div className="w-full flex flex-col gap-2 p-6 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
      <nav className="fixed md:hidden bottom-0 left-0 mx-auto flex justify-center gap-4 p-2 w-full bg-background border rounded-t-xl">
        <div className="flex gap-2 items-center justify-center">
          <NavLink
            className={`${({ isActive }) =>
              isActive
                ? "active"
                : "flex"} flex flex-col items-center justify-start p-2 hover:bg-primary hover:text-primary-foreground rounded-sm md:rounded-l-md cursor-pointer`}
            to="/"
          >
            <Home className="w-8 h-8" strokeWidth={1} />
          </NavLink>
          <NavLink
            className={`${({ isActive }) =>
              isActive
                ? "active"
                : "flex"} flex flex-col items-center justify-start p-2 hover:bg-primary hover:text-primary-foreground rounded-sm md:rounded-l-md cursor-pointer`}
            to="/profile/my-referals"
          >
            <Ticket className="w-8 h-8" strokeWidth={1} />
          </NavLink>
          <NavLink
            className={`${({ isActive }) =>
              isActive
                ? "active"
                : "flex"} flex flex-col items-center justify-center md:justify-start p-2 hover:bg-primary hover:text-primary-foreground rounded-sm md:rounded-l-md cursor-pointer`}
            to="/profile/my-events"
          >
            <Calendar className="w-8 h-8" strokeWidth={1} />
          </NavLink>
          <NavLink
            className={`${({ isActive }) =>
              isActive
                ? "active"
                : "flex"} flex items-center justify-center md:justify-start p-2  hover:bg-primary hover:text-primary-foreground rounded-sm md:rounded-l-md cursor-pointer`}
            to="/profile/my-favorites"
          >
            <Heart className="w-8 h-8" strokeWidth={1} />
          </NavLink>
        </div>
      </nav>
    </Container>
  );
};

export default Profile;
