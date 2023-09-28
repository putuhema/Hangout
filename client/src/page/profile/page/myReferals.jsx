import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import services from "@/services";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import CopyToClipboard from "./components/CopyToClipboard";

const MyReferals = () => {
  const { userId } = useAuth();

  const { data: ref, isFetched } = useQuery({
    queryKey: ["referals", userId],
    queryFn: async () => {
      const res = await services.get("/users/referrals", {
        params: { externalId: userId },
      });
      return res.data;
    },
    enabled: !!userId,
  });

  return (
    <>
      <h2 className="font-bold">My Referals Codes</h2>
      {isFetched &&
        ref.referral.map((referal) => {
          return (
            <div
              key={referal.id}
              className="w-full flex flex-col md:flex-row justify-between items-start bg-secondary border border-border rounded-md p-2"
            >
              <span>
                <span className="flex gap-2 items-center w-max">
                  <Link to={`/event/${referal.event.id}`}>
                    <p className="hover:underline cursor-pointer">
                      {referal.event.name}
                    </p>
                  </Link>
                </span>
                <p className="text-muted-foreground text-xs">{`${format(
                  new Date(referal.event.date),
                  "PPP",
                )} ${referal.event.time}`}</p>
              </span>
              <span className="flex items-center justify-between md:justify-end w-full  gap-4 text-muted-foreground">
                <p
                  className={`text-xs md:text-[1rem] whitespace-nowrap overflow-hidden text-ellipsis w-[200px] md:w-max select-none`}
                >
                  {referal.code}
                </p>
                <CopyToClipboard referalCode={referal.code} />
              </span>
            </div>
          );
        })}
    </>
  );
};

export default MyReferals;
