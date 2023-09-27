import services from "@/services";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useQueryCache } from "@/hooks/useQueryCache";

import { ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Container from "@/components/layout/Container";
import Category from "@/components/event/Category";
import UserCard from "@/components/event/UserCard";
import { categories } from "@/constant/index.jsx";

import TabContentEvent from "./components/TabContentEvent";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const tabs = ["All", "Online", "Today", "This Week", "Free"];
const Home = () => {
  const { isSignedIn, userId } = useAuth();
  const { data: currentUser, isFetched } = useCurrentUser(userId);
  const [tab, setTab] = useState("All");

  const { data, isLoading } = useQuery(["events"], async () => {
    const res = await services.get("/events");
    return res.data;
  });

  const { data: today, isLoading: todayLoading } = useQueryCache(
    "events/today",
    "/filter",
    { filter: 0 },
    tab === "Today",
  );
  const { data: thisWeek, isLoading: thisWeekLoading } = useQueryCache(
    "events/thisWeek",
    "/filter",
    { filter: 7 },
    tab === "This Week",
  );
  const { data: online, isLoading: onlineLoading } = useQueryCache(
    "events/online",
    "/filter",
    { filter: "online" },
    tab === "Online",
  );
  const { data: free, isLoading: freeLoading } = useQueryCache(
    "filter/free",
    "/filter",
    { filter: "free" },
    tab === "Free",
  );

  return (
    <Container>
      <div
        className={`flex flex-col w-full items-center ${isSignedIn && "xl:flex-row"
          }`}
      >
        <div
          className={`${isSignedIn
            ? "w-full xl:w-[calc((100%_-_350px)_-_45px)]"
            : "w-full  mr-0 xl:mr-[45px] sm:px-6 "
            }`}
        >
          <div className={`flex overflow-x-auto  gap-4 w-full justify-between`}>
            {categories.map((category) => (
              <Category
                key={category.value}
                imgUrl="/placeholder.jpeg"
                category={category}
              />
            ))}
          </div>
          <div className="mt-8">
            <Tabs
              defaultValue="All"
              value={tab}
              onValueChange={setTab}
              className="w-full"
            >
              <TabsList className="flex w-full overflow-x-auto overflow-y-hidden  justify-start gap-2 bg-backround text-primary">
                {tabs.map((tab) => (
                  <TabsTrigger
                    className="p-2 px-4 rounded-full hover:ring-1 hover:ring-primary data-[state=active]:border-primary data-[state=active]:border data-[state=active]:text-primary data-[state=active]:font-bold"
                    key={tab}
                    value={tab}
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabContentEvent value="All" loading={isLoading} data={data} />
              <TabContentEvent
                value="Today"
                loading={todayLoading}
                data={today}
              />
              <TabContentEvent
                value="Online"
                loading={onlineLoading}
                data={online}
              />
              <TabContentEvent
                value="This Week"
                loading={thisWeekLoading}
                data={thisWeek}
              />
              <TabContentEvent value="Free" loading={freeLoading} data={free} />
            </Tabs>
          </div>
        </div>
        {isSignedIn && (
          <div className="w-[350px] shrink-0 hidden xl:flex">
            <div className="fixed flex flex-col gap-4 top-[80px] w-[1950px] right-auto max-w-[350px] p-2">
              <div className="rounded-md shadow-sm bg-background p-2 w-full">
                <span className="flex gap-2 items-end justify-between">
                  <h4 className="text-lg font-bold">My Events</h4>
                  <Link
                    className="flex gap-1 items-center text-sm text-slate-500"
                    to="/profile/my-events/"
                  >
                    See All <ChevronRight size={20} />
                  </Link>
                </span>
              </div>
              <div className="rounded-md shadow-sm h-10 bg-background p-2 w-full flex flex-col gap-2">
                {isFetched &&
                  currentUser.event.slice(0, 3).map((event) => (
                    <UserCard key={event.id} event={event} />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Home;
