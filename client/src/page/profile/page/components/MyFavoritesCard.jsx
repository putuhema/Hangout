import services from "@/services";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import format from "date-fns/format";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const MyFavoritesCard = ({ favEventId, event, userId }) => {
  const queryClient = useQueryClient()
  const { userId: externalId } = useAuth()
  const isUserFavorite = favEventId === event.id
  const eventMutation = useMutation({
    mutationFn: async (event) => {
      return services.post(`/events/favorites`, event);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", externalId] })
    }
  });

  const handleOnSubmit = (e) => {
    e.preventDefault()
    eventMutation.mutate({
      userId: userId,
      eventId: event.id,
    })
  };
  return (
    <div className="flex justify-between items-center border p-2 rounded-md">
      <Link to={`/event/${event.id}`}>
        <p className="font-bold">{event.name}</p>
        <p className="text-muted-foreground">{format(new Date(event.date), "PPP")}</p>
      </Link>
      <form onSubmit={handleOnSubmit}>
        <button type="submit">
          <Heart
            className="text-primary-foreground transform hover:scale-110  cursor-pointer transition-all duration-75"
            size={20}
            fill={`${isUserFavorite ? "#2563eb" : "transparent"
              }`}
          />
        </button>
      </form>
    </div>
  )
}

export default MyFavoritesCard
