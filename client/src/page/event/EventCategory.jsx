import EventCard from "@/components/event/EventCard";
import Container from "@/components/layout/Container";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categories } from "@/constant";
import { Skeleton } from "@/components/ui/skeleton";
import NoResources from "@/components/shared/NoResources";
import { useQuery } from "@tanstack/react-query";
import services from "@/services";

const CategoryPage = () => {
  const { eventCategory } = useParams();
  const [select, setSelect] = useState("all");
  const [image, setImage] = useState('')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const navigate = useNavigate();


  const currentCategory = categories.filter(
    (category) => category.value === eventCategory,
  )[0];
  // dynamically import image from assets
  ((imageName) => {
    import(`../../assets/${imageName}.jpg`).then((img) => setImage(img.default))
  })(currentCategory.value)

  const { data, isLoading } = useQuery(
    {
      queryKey: ['event/category', currentCategory.value, select],
      queryFn: async () => {
        const res = await services.get(`/events/category`, { params: { category: currentCategory.value, filter: select } });
        return res.data;
      },
      enabled: Boolean(select) || Boolean(currentCategory.value),
    }
  )

  return (
    <Container>
      <span className="cursor-pointer" onClick={() => navigate(-1)}>
        <span className="flex items-center gap-2">
          <ArrowLeft className="text-primary w-4 h-4" />{" "}
          <p className="hover:underline text-muted-foreground hover:text-foreground">
            back
          </p>
        </span>
      </span>
      <div className="relative w-full bg-black mt-4 h-[250px] rounded-md">
        <img className="absolute inset-0 w-full h-full object-cover opacity-75 rounded-md" src={image} />
        <div className="absolute top-0 left-0 t w-full  mx-auto text-background flex items-center h-full">
          <div className="flex flex-col justify-center px-8 gap-2">
            <h1 className="text-6xl font-extrabold max-w-[800px]">{`${currentCategory.text} Events`}</h1>
            <p>{`Discover the best ${currentCategory.text} events in your area and online`}</p>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto py-4 relative">
        <Select
          open={isCalendarOpen}
          onOpenChange={() => {
            setIsCalendarOpen(!isCalendarOpen);
          }}
          value={select}
          onValueChange={(value) => setSelect(value)}
        >
          <SelectTrigger className="w-[180px] rounded-full">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="2">Tomorrow</SelectItem>
              <SelectItem value="7">This Weekend</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="p-2 grid grid-cols-4 gap-4">
          {isLoading ? (
            <Skeleton className="w-10 h-10 rounded-md bg-secondary" />
          ) : data.length > 0 ? (
            data.map((event) => (
              <div key={event.id}>
                <EventCard event={event} />
              </div>
            ))
          ) : (
            <NoResources text={`no ${currentCategory.text} Events`} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default CategoryPage;
