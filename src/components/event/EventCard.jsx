import { format } from "date-fns";
import { Heart } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatToUnits } from "@/lib/utils";

const EventCard = ({ event }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="rounded-lg bg-gradient-to-r from-blue-100 to-red-100 relative w-full h-[250px] z-[1]">
      <span className="absolute top-2 left-2 bg-white/30 border-white border backdrop-blur-md w-max px-2 py-1 rounded-md flex flex-col items-center justify-center">
        <p className="font-bold text-xl leading-none">{new Date(event.date).getDate()}</p>
        <p className="text-sm text-gray-500">{format(new Date(event.date), "LLLL").slice(0, 3)}</p>
      </span>
      <Heart
        className="absolute top-2 right-2 text-white cursor-pointer transition-all ease-in-out duration-100"
        size={20}
        fill={`${isFavorite ? "#fff" : "transparent"}`}
        onClick={() => setIsFavorite(!isFavorite)}
      />
      {/* <img className="object-cover rounded-lg w-[250px] h-[250px] select-none" src="/public/placeholder.jpeg" /> */}
      <div className="absolute w-[calc(100%_-_16px)] p-2 bottom-2 left-2 bg-white/30 border border-white backdrop-blur-lg rounded-md">
        <Link to={`/event/${event.id}`} className="font-bold">
          {event.name}
        </Link>
        <span className="flex justify-between items-center mt-2 gap-2">
          <p className="text-xs text-gray-500">{format(new Date(event.date), "PPP")}</p>
          <Badge
            className={`text-xs ${
              event.type === "free" && "bg-transparent text-black border-black hover:bg-black hover:text-white"
            }`}
          >
            {event.type === "paid" ? formatToUnits(parseInt(event.price)) : event.type}
          </Badge>
        </span>
      </div>
    </div>
  );
};

export default EventCard;
