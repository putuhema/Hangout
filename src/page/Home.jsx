import { Link } from "react-router-dom"
import Container from "../components/layout/Container"
import { ChevronRight } from "lucide-react"
import { categories, tabs } from "../../constant"
import Category from "../components/event/Category"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

const Home = () => {
  return (
    <Container>
      <div className="flex flex-col w-full items-center lg:flex-row">
        <div className="w-[640px] lg:w-[calc((100%_-_350px)_-_45px)] mr-0 lg:mr-[45px] h-[1000px] px-6 sm:p-2">
          <div className="flex overflow-x-auto gap-4 w-[640px] lg:w-full justify-between">
            {categories.map((category) => (
              <Category
                key={category}
                imgUrl="/placeholder.jpeg"
                title={category}
              />
            ))}
          </div>
          <div className="mt-8">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="flex justify-start gap-2">
                {tabs.map((tab) => (
                  <TabsTrigger
                    className="p-2 px-4 rounded-full hover:bg-blue-100 data-[state=active]:bg-blue-100"
                    key={tab.value}
                    value={tab.value}
                  >
                    {tab.text}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="all">All content</TabsContent>
              <TabsContent value="forYou">For You Content</TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="w-[350px] shrink-0 hidden lg:flex">
          <div className="fixed flex flex-col gap-4 top-[80px] w-[1950px] right-auto max-w-[350px] p-2">
            <div className="rounded-md shadow-sm bg-white p-2 w-full">
              <span className="flex gap-2 items-end justify-between">
                <h3 className="text-lg font-bold">My Events</h3>
                <Link
                  className="flex gap-1 items-center text-sm text-slate-500"
                  to="/event/my-event/"
                >
                  See All <ChevronRight size={20} />
                </Link>
              </span>
            </div>
            <div className="rounded-md shadow-sm h-10 bg-white p-2 w-full"></div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Home
