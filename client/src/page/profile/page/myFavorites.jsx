import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useAuth } from "@clerk/clerk-react";
import MyFavoritesCard from "./components/MyFavoritesCard";


const MyFavorites = () => {
  const { userId } = useAuth();
  const { data, isFetched } = useCurrentUser(userId)

  return (
    <>
      {isFetched &&
        data.favorites.map(favorites => (
          <MyFavoritesCard
            key={favorites.eventId}
            favEventId={favorites.eventId}
            event={favorites.event}
            userId={data.id} />
        ))}
    </>
  );
};

export default MyFavorites;
