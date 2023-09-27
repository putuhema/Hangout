import { format } from "date-fns";
import { Heart } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatToUnits } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import services from "@/services";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const EventCard = ({ event }) => {

  const { data: favorites, isFetched: favoritesFetched } = useQuery({
    queryKey: ["favorites", event.id],
    queryFn: async () => {
      const res = await services.get(`/events/favorites/${event.id}`,)
      return res.data
    },
    refetchInterval: 1000
  })
  const isUserFavorite = !!favorites && favoritesFetched ? favorites.eventId === event.id : false
  const { userId } = useAuth();
  const { data: currentUser, isFetched } = useCurrentUser(userId)
  const eventMutation = useMutation({
    mutationFn: async (event) => {
      return services.post(`/events/favorites`, event);
    },
  });

  const handleOnSubmit = (e) => {
    e.preventDefault()
    eventMutation.mutate({
      userId: isFetched ? currentUser.id : 0,
      eventId: event.id,
    })
  };


  return (
    <div className="relative flex flex-col justify-between rounded-lg bg-black group shadow-sm border overflow-hidden border-border h-[250px]  w-full z-[1]">
      <img
        className="absolute rounded-lg h-full w-full object-cover inset-0 opacity-80 transform group-hover:scale-110 group-hover:opacity-100 transition-all duration-200"
        src={`http://localhost:3000/${event.imagePath}`}
      />
      <div className="flex items-start justify-between p-2">
        <span className=" top-2 left-2 bg-white/30 border-border border backdrop-blur-md w-max px-2 py-1 rounded-md flex flex-col items-center justify-center">
          <p className="font-bold text-xl leading-none text-primary-foreground">
            {new Date(event.date).getDate()}
          </p>
          <p className="text-sm text-primary-foreground">
            {format(new Date(event.date), "LLLL").slice(0, 3)}
          </p>
        </span>
        <form onSubmit={handleOnSubmit}>
          <button type="submit">
            <Heart
              className=" top-2 right-2 text-primary-foreground transform hover:scale-110  cursor-pointer transition-all duration-75"
              size={20}
              fill={`${isUserFavorite ? "#2563eb" : "transparent"
                }`}
            />
          </button>
        </form>
      </div>

      <div className="m-2 p-2 flex flex-col border border-border text-primary-foreground shadow-sm bg-white/30 backdrop-blur-lg rounded-md">
        <Link to={`/event/${event.id}`} className="font-bold  hover:underline">
          {event.name}
        </Link>
        <span className="flex justify-between items-center gap-2">
          <p className="text-xs">{format(new Date(event.date), "PPP")}</p>
          <Badge
            className={`text-xs bg-primary hover:bg-primary/80 ${event.type === "free" &&
              "bg-transparent text-primary-foreground border-white hover:bg-transparent"
              }`}
          >
            {event.type === "paid"
              ? formatToUnits(parseInt(event.price))
              : event.type}
          </Badge>
        </span>
      </div>
    </div>
  );
};

export default EventCard;
