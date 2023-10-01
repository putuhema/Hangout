import { formatToUnits } from "@/lib/utils";
import { baseUrl } from "@/services";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const userCard = ({ event }) => {
  return (
    <div className="flex items-center justify-between border border-border p-1 rounded-md bg-background">
      <div className="flex gap-2 items-center w-full">
        <div className="h-[50px] w-[100px] bg-secondary text-primary">
          <img
            className="h-full w-full object-cover rounded-md"
            src={`${baseUrl}/${event.imagePath}`}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Link to={`/event/${event.id}`}>
            <p className="font-bold hover:underline">{event.name}</p>
          </Link>
          <span className="flex items-center justify-between gap-4 w-full ">
            <p className="font-bold rounded-full text-sm px-2 w-max bg-primary text-primary-foreground">
              {event.type === "paid"
                ? formatToUnits(parseInt(event.price))
                : event.type}
            </p>
            <p>{format(new Date(event.date), "PP")}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default userCard;
