import EventCard from "@/components/event/EventCard";
import NoResources from "@/components/shared/NoResources";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";

const TabContentEvent = ({ value, loading, data }) => {
  return (
    <TabsContent value={value}>
      <div className="p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 items-stretch">
        {loading ? (
          <Skeleton className="bg-secondary w-[260px] h-[100px]" />
        ) : data.length > 0 ? (
          data.map((event) => (
            <div key={event.id}>
              <EventCard event={event} />
            </div>
          ))
        ) : (
          <NoResources text="no online events" />
        )}
      </div>
    </TabsContent>
  );
};

export default TabContentEvent;
