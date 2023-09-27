import EventCard from "@/components/event/EventCard";
import NoResources from "@/components/shared/NoResources";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryCache } from "@/hooks/useQueryCache";

const Today = ({ tab }) => {
  const { data: today, isLoading: todayLoading } = useQueryCache(
    "filter/today",
    "/f",
    { date: 0 },
    tab === "Today",
  );

  return (
    <>
      {todayLoading ? (
        <Skeleton className="bg-secondary w-[260px] h-[100px]" />
      ) : today.length > 0 ? (
        today.map((event) => (
          <div key={event.id}>
            <EventCard event={event} />
          </div>
        ))
      ) : (
        <NoResources text="no today's events" />
      )}
    </>
  );
};
export default Today;
