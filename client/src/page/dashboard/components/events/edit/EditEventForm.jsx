import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Plus, X, ArrowLeft, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { editFormSchema } from "@/schema";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/constant";
import PickedTime from "@/page/form/components/PickedTime";
import DateAndTime from "@/page/form/components/DateAndTime";

import { useMutation } from "@tanstack/react-query";
import services from "@/services";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/clerk-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getHours, getMinutes } from "date-fns";
import Navbar from "../../navbar";

const emptyForm = {
  name: "",
  location: "",
  date: new Date(),
  time: {
    hours: getHours(new Date()),
    minutes: getMinutes(new Date()),
    type: "PM",
  },
  description: "",
  type: "free",
  price: "",
  tags: [],
  image: {},
};

const EditEventForm = ({ event }) => {

  const navigate = useNavigate();
  const { userId } = useAuth();
  const { toast } = useToast();
  const { data: currentUser, isFetched, } = useCurrentUser(userId);

  const editType = event.type === 'free' ? 'free' : 'paid'

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState(event.tag);
  const [type, setType] = useState(editType);
  const [location, setLocation] = useState("online");

  const mutation = useMutation({
    mutationFn: async (newEvents) => {
      return services.put("/events", newEvents, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });

  const time = event.time.split(":")
  const hours = time[0]
  const minutes = time.length > 0 && time[1].split(" ")

  const defaultValues = {
    name: event.name,
    location: event.location,
    date: new Date(event.date),
    time: {
      hours: hours,
      minutes: minutes[0],
      type: minutes[1],
    },
    description: event.description,
    category: event.category,
    type: event.type,
    price: String(event.price),
    tags: event.tag,
    image: {}
  }

  const form = useForm({
    resolver: zodResolver(editFormSchema),
    defaultValues: defaultValues
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset(emptyForm);
    }
  }, [form, form.formState.isSubmitSuccessful]);

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append(
      "events",
      JSON.stringify({
        ...values,
        type: type,
        eventId: event.id,
        location: location === "online" ? "online" : values.location,
        price: values.type === "free" ? 0 : values.price,
        userId: isFetched && currentUser.id,
        date: new Date(values.date),
        time: `${values.time.hours}:${values.time.minutes
          } ${values.time.type.toUpperCase()}`,
      }),
    );

    setTags([]);
    mutation.mutate(formData);

    toast({
      title: "Success",
      description: "Your event has been edit",
    })
  };

  const handleAddTag = () => {
    setTag("");
    if (tag.length > 0) {
      const id = tags.length > 0 ? tags[tags.length - 1].id : 0
      setTags([...tags, { id: id + 1, name: tag }]);
      form.setValue("tags", [...form.getValues("tags"), { id: id + 1, name: tag }]);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="xl:w-[1280px] mx-auto text-foreground">
        <div className="mt-4">
          {
            (
              <div className="w-full space-y-4 border rounded-md p-4 mb-4">
                <span className="flex items-center gap-2">
                  <ArrowLeft className="w-6 h-6" onClick={() => navigate(-1)} />
                  <h2 className="font-bold text-lg">
                    Lets edit your event
                  </h2>
                </span>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
                    encType="multipart/form-data"
                    method="post"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                      <div className="w-full space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="flex flex-col gap-3">
                              <FormLabel htmlFor="name">Event Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  value={field.value}
                                  id="name"
                                  placeholder="What is your event called"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {location === "online" && event.location === 'online' ? (
                                  "Is Your Event an Online Event?"
                                ) : (
                                  <span
                                    onClick={() => setLocation("online")}
                                    className="flex gap-2 cursor-pointer hover:text-muted-foreground"
                                  >
                                    <ArrowLeft className="w-4 h-4" />
                                    online ?
                                  </span>
                                )}
                              </FormLabel>
                              <FormControl>
                                {location === "online" && event.location === "online" ? (
                                  <RadioGroup
                                    onValueChange={(value) => setLocation(value)}
                                    className="flex gap-4"
                                    defaultValue={location}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="online" id="online" />
                                      <Label htmlFor="online">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="offline" id="offline" />
                                      <Label htmlFor="offline">No</Label>
                                    </div>
                                  </RadioGroup>
                                ) : (
                                  <Input
                                    placeholder="Where is the event held"
                                    {...field}
                                  />
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about the event"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="w-full space-y-4">
                        <div className="flex gap-4">
                          {type === "paid" ? (
                            <FormField
                              control={form.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem className="w-full flex flex-col gap-2">
                                  <span className="flex gap-2">
                                    <span onClick={() => setType("free")}>
                                      <ArrowLeft className="w-4 h-4 cursor-pointer" />
                                    </span>
                                    <FormLabel htmlFor="price">Event Price</FormLabel>
                                  </span>
                                  <FormControl>
                                    <div className="flex border rounded-md">
                                      <span className="block p-2 bg-secondary rounded-l-md  text-muted-foreground">
                                        Rp.
                                      </span>
                                      <Input
                                        className="border-none"
                                        id="price"
                                        value={
                                          (field.value === "paid" || field.value === "free") ? "" : field.value
                                        }
                                        onChange={field.onChange}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : (
                            <FormField
                              control={form.control}
                              name="type"
                              render={() => (
                                <FormItem className="w-full">
                                  <FormLabel>Event Type</FormLabel>
                                  <FormControl>
                                    <Select
                                      onValueChange={(value) => {
                                        setType(value);
                                        form.setValue("type", type);
                                      }}
                                      value={type}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Event Type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectItem value="free">Free</SelectItem>
                                          <SelectItem value="paid">Paid</SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Event Category</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={(e) => {
                                      field.onChange(e);
                                    }}
                                    defaultValue={form.getValues("category")}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder={event.category} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {categories.map((category) => (
                                          <SelectItem
                                            key={category.value}
                                            value={category.value}
                                          >
                                            {category.text}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="image"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="image">Event Image</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  id="image"
                                  type="file"
                                  value={field.value.filename}
                                  onChange={(e) => {
                                    field.onChange(e.target.files[0]);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex flex-col sm:flex-row gap-4 justify-between">
                          <DateAndTime form={form} />
                          <PickedTime form={form} />
                        </div>
                        <div className="flex flex-col text-sm gap-3 h-max">
                          <label htmlFor="tag">tag(s)</label>
                          <div className="flex gap-2">
                            <span className="border w-max rounded-md flex">
                              <Input
                                className="border-none focus-visible:rounded-none py-1 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-gray-200 focus-visible:outline-none w-[100px] "
                                id="tag"
                                type="text"
                                value={tag}
                                onChange={(e) => {
                                  setTag(e.target.value)
                                }}
                                placeholder="ex. Book"
                              />
                              <span
                                onClick={handleAddTag}
                                className="p-2 cursor-pointer bg-secondary rounded-r-md text-gray-500"
                              >
                                <Plus size={20} />
                              </span>
                            </span>
                            <span className="flex flex-wrap max-w[400px] gap-2 h-max">
                              {tags.map((tag) => (
                                <Badge
                                  key={tag.id}
                                  className="flex gap-2 justify-between bg-primary hover:bg-primary/80"
                                >
                                  <span>{tag.name}</span>
                                  <span
                                    className="cursor-pointer"
                                    onClick={() => {
                                      setTags((preTags) =>
                                        preTags.filter((t) => t.id !== tag.id),
                                      );
                                      form.setValue(
                                        "tags",
                                        form
                                          .getValues("tags")
                                          .filter((t) => t.id !== tag.id),
                                      );
                                    }}
                                  >
                                    <X size={15} />
                                  </span>
                                </Badge>
                              ))}
                            </span>
                          </div>
                          {
                            tag.length >= 10 && (
                              <span className="text-red-500">Tag max length 10 char</span>
                            )
                          }
                        </div>
                      </div>
                    </div>
                    <Button
                      className="mt-4 bg-primary hover:bg-primary/80 dark:bg-primary dark:hover:bg-primary/80"
                      type="submit"
                    >
                      {mutation.isLoading && (
                        <Loader2 className={`animate-spin w-4 h-4`} />
                      )}
                      {mutation.isLoading ? "editing..." : "Edit Event"}
                    </Button>
                  </form>
                </Form>
              </div>

            )
          }
        </div>
      </div>
    </div>
  );
};

export default EditEventForm;
