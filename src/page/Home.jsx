import Container from "../components/layout/Container";
import { ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import Category from "../components/event/Category";
import EventCard from "@/components/event/EventCard";
import UserCard from "@/components/event/UserCard";
import CardSkeleton from "@/components/shared/CardSkeleton";

import services from "@/services";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useQueryTab } from "@/hooks/useQueryTab";
import { categories } from "../../constant";

const tabs = ["All", "Online", "Today", "This Week", "Free"];

const Home = () => {
  const { isSignedIn, userId } = useAuth();
  const [tab, setTab] = useState("All");

  const { data, isLoading } = useQuery(["events"], async () => {
    const res = await services.get("/events");
    return res.data;
  });

  const { data: today } = useQueryTab("filter/today", "/f?date=0", tab === "Today");
  const { data: thisWeek } = useQueryTab("filter/thisWeek", "/f?date=7", tab === "This Week");
  const { data: online } = useQueryTab("filter/online", "/location?loc=isOnline&value=online", tab === "Online");
  const { data: free } = useQueryTab("filter/free", "/f?price=free", tab === "Free");

  const { data: userEvent } = useQueryTab(`event/${userId}`, `/user?id=${userId}`, true);

  return (
    <Container>
      <div className={`flex flex-col w-full items-center ${isSignedIn && "lg:flex-row"}`}>
        <div
          className={`${
            isSignedIn
              ? "w-[1280px]"
              : "w-[640px] lg:w-[calc((100%_-_350px)_-_45px)] mr-0 lg:mr-[45px] h-[1000px] px-6 sm:p-2"
          }`}
        >
          <div
            className={`flex overflow-x-auto gap-4 lg:w-full justify-between ${
              isSignedIn ? "w-[1280px]" : "w-[640px]"
            }`}
          >
            {categories.map((category) => (
              <Category key={category.value} imgUrl="/placeholder.jpeg" category={category} />
            ))}
          </div>
          <div className="mt-8">
            <Tabs defaultValue="All" value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="flex justify-start gap-2">
                {tabs.map((tab) => (
                  <TabsTrigger
                    className="p-2 px-4 rounded-full hover:bg-blue-100 data-[state=active]:bg-blue-100"
                    key={tab}
                    value={tab}
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="All">
                <div className="p-2 grid grid-cols-4 gap-4">
                  {isLoading ? (
                    <CardSkeleton />
                  ) : data.length > 0 ? (
                    data.map((event) => (
                      <div key={event.id}>
                        <EventCard event={event} />
                      </div>
                    ))
                  ) : (
                    <p>no events</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="Online">
                <div className="p-2 grid grid-cols-4 gap-4">
                  {online ? (
                    online.map((event) => (
                      <div key={event.id}>
                        <EventCard event={event} />
                      </div>
                    ))
                  ) : (
                    <p>no online event</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="Today">
                <div className="p-2 grid grid-cols-4 gap-4">
                  {today ? (
                    today.map((event) => (
                      <div key={event.id}>
                        <EventCard event={event} />
                      </div>
                    ))
                  ) : (
                    <CardSkeleton />
                  )}
                </div>
              </TabsContent>
              <TabsContent value="This Week">
                <div className="p-2 grid grid-cols-4 gap-4">
                  {thisWeek ? (
                    thisWeek.map((event) => (
                      <div key={event.id}>
                        <EventCard event={event} />
                      </div>
                    ))
                  ) : (
                    <CardSkeleton />
                  )}
                </div>
              </TabsContent>
              <TabsContent value="Free">
                <div className="p-2 grid grid-cols-4 gap-4">
                  {free ? (
                    free.map((event) => (
                      <div key={event.id}>
                        <EventCard event={event} />
                      </div>
                    ))
                  ) : (
                    <CardSkeleton />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {isSignedIn && (
          <div className="w-[350px] shrink-0 hidden lg:flex">
            <div className="fixed flex flex-col gap-4 top-[80px] w-[1950px] right-auto max-w-[350px] p-2">
              <div className="rounded-md shadow-sm bg-white p-2 w-full">
                <span className="flex gap-2 items-end justify-between">
                  <h3 className="text-lg font-bold">My Events</h3>
                  <Link className="flex gap-1 items-center text-sm text-slate-500" to="/event/my-event/">
                    See All <ChevronRight size={20} />
                  </Link>
                </span>
              </div>
              <div className="rounded-md shadow-sm h-10 bg-white p-2 w-full flex flex-col gap-2">
                {userEvent && userEvent.map((event) => <UserCard key={event.id} event={event} />)}
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Home;
