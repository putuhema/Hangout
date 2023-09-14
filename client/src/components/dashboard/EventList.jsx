import { getAllEvent } from "@/redux/event";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Events from "./Event";

const EventList = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);

  console.log(events);
  useEffect(() => {
    dispatch(getAllEvent());
  }, []);
  return (
    <div>
      <h1 className="mb-10 text-6xl font-semibold flex-wrap">Event Available</h1>
      <div className="flex flex-wrap">
        {events.map((event) => (
          <Events key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
