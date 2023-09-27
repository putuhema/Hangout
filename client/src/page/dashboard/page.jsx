import Navbar from "./components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import Overview from "./components/overview";
import Events from "./components/events/page";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams({ tab: 'overview' })
  const tab = searchParams.get("tab")

  useEffect(() => {
    document.documentElement.classList.add("light");
  }, []);

  return (
    <div>
      <Navbar />
      <div className="xl:w-[1280px] mx-auto text-foreground">
        <div className="mt-4">
          <Tabs value={tab}
            onValueChange={val => setSearchParams(prev => {
              prev.set('tab', val)
              return prev
            }
            )} className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="w-full">
                <Overview />
              </div>
            </TabsContent>
            <TabsContent value="events">
              <Events />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
