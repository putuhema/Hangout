import { formatToUnits } from "@/lib/utils";
import { categories } from "@/constant";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader, Ticket } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventPromos } from "@/schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import services from "@/services";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const MyEventCard = ({ event }) => {
  const icons = categories.filter(
    (category) => category.value === event.category,
  )[0];

  const form = useForm({
    resolver: zodResolver(eventPromos),
    defaultValues: {
      name: "",
      amount: "",
      limit: "",
    },
  });

  const { data: promo, isFetched, isLoading } = useQuery({
    queryKey: ["promo", event.id],
    queryFn: async () => {
      const res = await services.get(`/events/promo/${event.id}`)
      return res.data
    },
    enabled: !!event.id
  })


  const isEventHasPromo = promo !== null

  const postPromo = useMutation({
    mutationFn: async (promo) => {
      return services.post(`/events/promo`, promo);
    },
  });

  const deletePromo = useMutation({
    mutationFn: async () => {
      return services.delete(`/events/promo/${event.id}`);
    },
  });

  const onSubmit = (values) => {
    postPromo.mutate({
      ...values,
      eventId: event.id
    });
  };

  const handleDeletePromo = () => {
    deletePromo.mutate()
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset({
        name: "",
        amount: "",
        limit: "",
      });
    }
  }, [form.formState, form]);

  return (
    <div className="flex flex-col md:flex-row gap-2 items-center justify-between border border-border p-2 rounded-md">
      <div className="flex gap-2 items-center">
        <span className="grid place-content-center h-[50px] w-[50px] rounded-md bg-secondary border border-border text-primary">
          {icons.icon}
        </span>
        <div className="flex flex-col gap-2">
          <Link to={`/event/${event.id}`}>
            <p className="font-bold whitespace-nowrap text-ellipsis overflow-hidden  w-[230px] md:w-[300px]">
              {event.name}
            </p>
          </Link>
          <p className="font-bold rounded-full text-sm px-2 w-max bg-primary text-primary-foreground">
            {event.type === "paid"
              ? formatToUnits(parseInt(event.price))
              : event.type}
          </p>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex w-full md:w-max gap-2 items-center rounded-full bg-primary hover:bg-primary/80">
            <Ticket />
            add promos
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Promos</DialogTitle>
            {
              isEventHasPromo ? (
                <DialogDescription>
                  This Event Already has a Promo, you need to delete the old promo to create new one.
                </DialogDescription>
              ) :

                <DialogDescription>
                  Easily create and manage enticing discounts and promotions for
                  your events, driving higher ticket sales and increasing event
                  attendance.
                </DialogDescription>
            }
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, (err) =>
                  console.log(err),
                )}
                className="space-y-4"
              >
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promo Name</FormLabel>
                      <div className="col-span-3">
                        <FormControl>
                          <Input
                            {...field}
                            value={isEventHasPromo ? isLoading ? "" : promo.name : field.value}
                            placeholder="ex. PROMO75"
                            disabled={isEventHasPromo} />
                        </FormControl>
                        <FormDescription>
                          give your promo unique identifier
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    name="amount"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel id="amount">Amount</FormLabel>
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              id="amount"
                              value={isEventHasPromo ? isLoading ? "" : promo.amount : field.value}
                              {...field}
                              placeholder="ex. 35"
                              disabled={isEventHasPromo}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="limit"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel id="limit">Limit</FormLabel>
                        <div className="col-span-3">
                          <FormControl>
                            <Input
                              id="limit"
                              {...field}
                              value={isEventHasPromo ? isLoading ? "" : promo.limit : field.value}
                              placeholder="ex. 10"
                              disabled={isEventHasPromo}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {
                  isEventHasPromo ? (
                    <div
                      className="bg-red-500 p-2 rounded-md w-max cursor-pointer hover:bg-red-500/80 text-primary-foreground"
                      onClick={handleDeletePromo}
                    >
                      {deletePromo.isLoading && (
                        <Loader className="w-4 h-4 animate-spin" />
                      )}
                      {deletePromo.isLoading ? "Processing..." : "Delete Promo"}
                    </div>
                  ) : (
                    <Button
                      className="bg-primary hover:bg-primary/80 text-primary-foreground"
                      type="submit"
                    >
                      {postPromo.isLoading && (
                        <Loader className="w-4 h-4 animate-spin" />
                      )}
                      {postPromo.isLoading ? "Processing..." : "Set Promo"}
                    </Button>
                  )
                }
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyEventCard;
