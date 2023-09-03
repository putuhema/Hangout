import { Link } from "react-router-dom"
import Container from "../components/layout/Container"
import { ChevronRight } from "lucide-react"
import { categories, tabs } from "../../constant"
import Category from "../components/event/Category"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchEvents } from "@/features/slice/eventAction"
import EventCard from "@/components/event/EventCard"
import { useAuth } from "@clerk/clerk-react"
import SearchBox from "@/components/shared/SearchBox"
import { searchAnEvents } from "@/features/slice/eventSlice"


const Home = () => {
  const { isSignedIn } = useAuth()
  const dispatch = useDispatch()
  const { events, searchEvents } = useSelector((state) => state.events)
  const [tabValue, setTabValue] = useState("All")

  useEffect(() => {
    switch (tabValue) {
      case "Today": {
        dispatch(searchAnEvents(["0"]))
        break;
      }
      default: {
        dispatch(fetchEvents())
      }
    }

  }, [dispatch, tabValue])



  return (
    <Container>
      <SearchBox />
      <div className={`flex flex-col w-full items-center ${isSignedIn && 'lg:flex-row'}`}>
        <div className={`${isSignedIn ? 'w-[1280px]' : 'w-[640px] lg:w-[calc((100%_-_350px)_-_45px)] mr-0 lg:mr-[45px] h-[1000px] px-6 sm:p-2'}`}>
          <div className={`flex overflow-x-auto gap-4 lg:w-full justify-between ${isSignedIn ? 'w-[1280px]' : 'w-[640px]'}`}>
            {
              categories.map(category => (<Category key={category.value} imgUrl="/placeholder.jpeg" category={category} />))
            }
          </div>
          <div className="mt-8">
            <Tabs defaultValue="All" onValueChange={value => setTabValue(value)} className="w-full">
              <TabsList className="flex justify-start gap-2">
                {
                  tabs.map(tab => (
                    <TabsTrigger
                      className="p-2 px-4 rounded-full hover:bg-blue-100 data-[state=active]:bg-blue-100"
                      key={tab} value={tab}
                    >{tab}</TabsTrigger>
                  ))
                }
              </TabsList>
              <TabsContent value="All">
                <div className="p-2 grid grid-cols-4 gap-4">

                  {
                    events.length > 0 ?
                      events.map(event => (<div key={event.id}><EventCard event={event} /></div>))
                      :
                      <p>no events</p>
                  }
                </div>
              </TabsContent>
              <TabsContent value="Today">
                <div className="p-2 grid grid-cols-4 gap-4">
                  {
                    searchEvents.map(event => (<div key={event.id}><EventCard event={event} /></div>))
                  }
                </div>
              </TabsContent>
            </Tabs>

          </div>
        </div>
        {
          isSignedIn && (
            <div className="w-[350px] shrink-0 hidden lg:flex">
              <div className="fixed flex flex-col gap-4 top-[80px] w-[1950px] right-auto max-w-[350px] p-2">
                <div className="rounded-md shadow-sm bg-white p-2 w-full">
                  <span className="flex gap-2 items-end justify-between">
                    <h3 className="text-lg font-bold">My Events</h3>
                    <Link className="flex gap-1 items-center text-sm text-slate-500" to="/event/my-event/">See All <ChevronRight size={20} /></Link>
                  </span>
                </div>
                <div className="rounded-md shadow-sm h-10 bg-white p-2 w-full">

                </div>
              </div>
            </div>
          )
        }
      </div>
    </Container>
  )
}

export default Home
