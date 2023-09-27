import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FormatToIDR } from "@/lib/utils";
import { eventRegisterSchema } from "@/schema";
import services from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";

const TransactionDialog = ({ event, user, discount, price }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // form
  const form = useForm({
    resolver: zodResolver(eventRegisterSchema),
    defaultValues: {
      referal: "",
      firstName: user.firstname || "",
      lastName: user.lastname || "",
      email: user.email || "",
    },
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset({
        referal: "",
        firstName: "",
        lastName: "",
        email: "",
      });
    }
  }, [form.formState, form]);
  const eventMutation = useMutation({
    mutationFn: async (register) => {
      return services.post(`/events/register`, register);
    },
  });

  const onSubmit = (values) => {
    const newReferral = v4().split("-")[0].toUpperCase()
    eventMutation.mutate({
      ...values,
      userId: user.id,
      eventId: event.id,
      promoId: event.promo.id,
      ownerId: event.user.id,
      newReferral: newReferral,
      price: (price - (price - discount))
    })
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {!eventMutation.isSuccess &&
            (currentPage === 1 ? "Contact Information" : "Checkout")}
        </DialogTitle>
      </DialogHeader>
      <div>
        {currentPage === 1 &&
          (user ? (
            <p>
              logged in as{" "}
              <span className="text-muted-foreground">
                {user.email}
              </span>
            </p>
          ) : (
            <p>register for the event</p>
          ))}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {currentPage === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="referal"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel>Referal Code</FormLabel>
                      <FormControl>
                        <Input
                          id="referal"
                          {...field}
                          placeholder="ex: 240F4151"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4 items-center mt-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input id="firstName" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input id="lastName" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input id="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span
                  onClick={async () => {
                    const inputErr = await form.trigger(
                      ["email", "firstName", "lastName"],
                      { shouldFocus: true },
                    );
                    if (inputErr) setCurrentPage(currentPage + 1);
                  }}
                  className="bg-primary p-2 px-4 rounded-md hover:bg-primary/80 block w-max text-primary-foreground cursor-pointer"
                >
                  Register
                </span>
              </>
            )}
            {currentPage === 2 && !eventMutation.isSuccess ? (
              <div className="p-2">
                <span
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="flex gap-2 items-center mb-4  hover:text-muted-foreground cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 cursor-pointer" />
                  <p>back</p>
                </span>
                <span className="grid grid-cols-3">
                  <p>Name</p>
                  <p className="span-2 text-muted-foreground">{`${form.getValues(
                    "firstName",
                  )} ${form.getValues("lastName")}`}</p>
                </span>
                <span className="grid grid-cols-3">
                  <p>Email</p>
                  <p className="span-2 text-muted-foreground">
                    {form.getValues("email")}
                  </p>
                </span>
                <span className="grid grid-cols-3">
                  <p>Items</p>
                  <p className="span-2 text-muted-foreground">{`1 x ${event.name} Ticket`}</p>
                </span>
                <span className="grid grid-cols-3">
                  <p>Price</p>
                  <p className="span-2 text-muted-foreground">
                    {FormatToIDR(price)}
                  </p>
                </span>
                {
                  discount > 0 && (
                    <span className="grid grid-cols-3">
                      <p>Discount</p>
                      <p className="span-2 text-muted-foreground">{FormatToIDR(price - discount)}</p>
                    </span>
                  )
                }
                <Separator className="my-3" />
                <span className="grid grid-cols-3">
                  <p className="font-bold">Total</p>
                  <p className="span-2 text-foreground">{discount ? FormatToIDR(price - (price - discount)) : FormatToIDR(price)}</p>
                </span>
                <Button
                  className="mt-6 bg-primary hover:bg-primary/80 w-full"
                  type="submit"
                >
                  {eventMutation.isLoading && (
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  )}
                  {eventMutation.isLoading ? "Processing..." : "Checkout"}
                </Button>
              </div>
            ) : (
              eventMutation.isSuccess && (
                <div>
                  <div className="flex items-center gap-2 p-2 bg-green-100 rounded-full text-green-600 justify-center">
                    <p>Checkout Success</p>
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-muted-foreground text-center my-4">
                    you can close(x) the modal
                  </p>
                </div>
              )
            )}
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};

export default TransactionDialog;
