import { useAuth } from "@clerk/clerk-react";
import MyEventCard from "./components/MyEventCard";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const MyEvent = () => {
  const { userId } = useAuth();
  const { data, isFetched } = useCurrentUser(userId)

  return (
    <>
      {isFetched &&
        data.event.map((event) => <MyEventCard key={event.id} event={event} />)}
    </>
  );
};

export default MyEvent;
