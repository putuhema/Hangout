import { getAllEvent } from "@/redux/event";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionList from "./TransactionList";

const Transaction = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.events);

  useEffect(() => {
    dispatch(getAllEvent());
  }, []);

  return (
    <div>
      {events.map((event) => (
        <TransactionList key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Transaction;
