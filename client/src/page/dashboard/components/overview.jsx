import { Calendar, DollarSign, Star } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import MyResponsiveLine from "./charts/LineCharts";
import { FormatToIDR } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import services from "@/services";
import { getDate } from "date-fns";
import MyResponsiveBar from "./charts/BarCharts";

const Overview = () => {

  const { userId } = useAuth();
  const { data, isFetched, isLoading } = useCurrentUser(userId, 1000)
  const id = isFetched ? data.id : 0
  const { data: rev, isFetched: revFetched } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const res = await services.get(`/events/reviews/${id}`)
      return res.data
    },
    enabled: !!id
  })

  const transaction = isFetched ? data.event.map(event => event.transaction) : []
  const attendees = isFetched ? data.event.map(event => ({ name: event.name, attendees: event.attendees.length })) : []

  const revenue = transaction.flat().reduce((prev, curr) => prev + Number(curr.price), 0)

  console.log(attendees)

  const uniqueDates = {}
  for (const t of transaction.flat()) {
    const key = getDate(new Date(t.timestamp))
    uniqueDates[key] = (uniqueDates[key] || 0) + 1
  }

  const dateCountArray = Object.keys(uniqueDates).map(date => ({
    date: date, transaction: uniqueDates[date]
  }))


  // calculate how many transaction that happen on a unique date

  const overalRating = revFetched ? rev.reviews.reduce((acc, curr) => acc + curr.rating, 0) / rev.reviews.length : 0
  let ratingEvaluate = "";
  if (overalRating > 0 && overalRating <= 1.0) {
    ratingEvaluate = "A Very Poor";
  } else if (overalRating > 1 && overalRating <= 1.5) {
    ratingEvaluate = "A Poor";
  } else if (overalRating > 1.5 && overalRating <= 2.0) {
    ratingEvaluate = "A Below Average";
  } else if (overalRating > 2.0 && overalRating <= 2.5) {
    ratingEvaluate = "An Average";
  } else if (overalRating > 2.5 && overalRating <= 3.0) {
    ratingEvaluate = "A Good";
  } else if (overalRating > 3.0 && overalRating <= 3.5) {
    ratingEvaluate = "An Above Average";
  } else if (overalRating > 3.5 && overalRating <= 4.0) {
    ratingEvaluate = "An Exellent";
  } else if (overalRating > 4.0 && overalRating <= 4.5) {
    ratingEvaluate = "An Outstanding";
  } else if (overalRating > 4.5 && overalRating <= 5.0) {
    ratingEvaluate = "A Perfect";
  } else {
    ratingEvaluate = "No Rating";
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="border rounded-md p-4 bg-background">
          <span className="flex justify-between">
            <p>Total Revenue</p>
            <DollarSign className="w-4 h-4" />
          </span>
          <p className="font-bold text-xl">{FormatToIDR(revenue)}</p>
          {
            isLoading ? (
              <Skeleton className="w-full h-4" />
            ) : (
              <p className="font-bold text-xs text-muted-foreground">
                Your Revenue for {data.event.length} events
              </p>
            )
          }
        </div>

        <div className="border rounded-md p-4 bg-background">
          <span className="flex justify-between">
            <p>Total Events</p>
            <Calendar className="w-4 h-4" />
          </span>
          {
            isLoading ? (
              <Skeleton />
            ) : (
              <>
                <p className="font-bold text-xl">{data.event.length}</p>
                <p className="font-bold text-xs text-muted-foreground">
                  Your make {data.event.length} events so far
                </p>
              </>
            )
          }
        </div>
        <div className="border rounded-md p-4 bg-background">
          <span className="flex justify-between">
            <p>Your Overal Ratings</p>
            <Star className="w-4 h-4" />
          </span>
          <span className="font-bold text-xl flex gap-2">
            <Star className="text-primary" /> {overalRating}
          </span>
          <p className="font-bold text-xs text-muted-foreground">
            Your are {ratingEvaluate} Event Planner
          </p>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-6">
        <div className="col-span-3 h-[400px] border border-border rounded-md p-2 ">
          {
            isLoading ? <Skeleton /> :
              <MyResponsiveLine data={dateCountArray} />
          }
        </div>
        <div className="border col-span-2 h-[400px] rounded-md p-2 space-y-2 overflow-y-auto">
          {
            isLoading ? <Skeleton /> :
              <MyResponsiveBar data={attendees} />
          }
        </div>
      </div>
    </div>
  );
};

export default Overview;
