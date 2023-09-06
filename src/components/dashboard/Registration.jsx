import { getAllEvent } from "@/redux/event";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegistrationList from "./RegistrationList";

const Registration = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);

  console.log(events);

  useEffect(() => {
    dispatch(getAllEvent());
  }, []);

  return (
    <div>
      {events.map((event) => (
        <RegistrationList key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Registration;
