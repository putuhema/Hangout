import { formatToUnits } from "@/lib/utils";
import { Link } from "react-router-dom";

const userCard = ({ event }) => {
  return (
    <div className="flex items-center justify-between border border-border p-2 rounded-md">
      <div className="flex gap-2 items-center">
        <div className="h-[50px] w-[50px] bg-secondary text-primary">
          <img
            className="h-full w-full object-cover rounded-md"
            src={`http://localhost:3000/${event.imagePath}`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Link to={`/event/${event.id}`}>
            <p className="font-bold hover:underline">{event.name}</p>
          </Link>
          <p className="font-bold rounded-full text-sm px-2 w-max bg-primary text-primary-foreground">
            {event.type === "paid"
              ? formatToUnits(parseInt(event.price))
              : event.type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default userCard;
