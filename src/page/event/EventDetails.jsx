import Container from "@/components/layout/Container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useLocation } from "@/hooks/useLocation"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { FormatToIDR, IsObjectEmpty } from "@/lib/utils"
import { format } from "date-fns"
import { ArrowLeft, Heart, Loader2, Share, Ticket } from "lucide-react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth, useUser } from "@clerk/clerk-react"
import services from "@/services"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { eventRegisterSchema } from "@/schema"
import { v4 as uuidv4 } from "uuid"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"


const EventDetails = () => {
    const { eventId } = useParams()
    const { userId } = useAuth()
    const { user, isSignedIn } = useUser()
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)


    const { data: event, isFetched } = useQuery(["event", eventId], async () => {
        const res = await services.get(`/events/${eventId}`)
        return res.data
    })
    const eventMutation = useMutation({
        mutationFn: async (register) => {
            return services.put(`/events/${eventId}`, register)
        }
    })


    // FIXME: remember to implement cache
    const userEventId = isFetched && event.userId || ""
    const { data: userEvent } = useQuery(
        {
            queryKey: ['user', userEventId],
            queryFn: async () => {
                const res = await services.get(`/users/${userEventId}`)
                return res.data
            },
            enabled: !!userEventId
        })
    const { province: pId, regency: rId, district: dId, isOnline } = isFetched ? event.location : {}
    const { data: province } = useLocation("province", pId)
    const { data: regency } = useLocation("regency", rId)
    const { data: district } = useLocation("district", dId)

    // form
    const form = useForm({
        resolver: zodResolver(eventRegisterSchema),
        defaultValues: {
            referal: '',
            firstName: isSignedIn ? user.firstName : '',
            lastName: isSignedIn ? user.lastName : '',
            email: isSignedIn ? user.emailAddresses[0].emailAddress : ''
        },
    })

    useEffect(() => {
        if (form.formState.isSubmitSuccessful) {
            form.reset({
                referal: "",
                firstName: "",
                lastName: "",
                email: ""
            })
        }
    }, [form.formState, form])

    const referalMutation = useMutation({
        mutationFn: async (data) => {
            return services.post("/events/referal", data)
        }
    })



    const onSubmit = (values) => {
        // checking if current user loggin is already attend to the event
        const isAlreadyAttend = event.attendees.filter(attendee => attendee.userId === userId).length > 0
        const referalCode = uuidv4()
        if (userId !== userEventId && !isAlreadyAttend) {
            if (values.referal.length > 0) {
                referalMutation.mutate({
                    eventId: event.id,
                    code: values.referal,
                    userId
                })
            }
            eventMutation.mutate({
                ...event,
                attendees: [
                    ...event.attendees,
                    {
                        ...values,
                        eventId: event.id,
                        eventMakerId: event.userId,
                        userId: userId,
                        myReferalCode: referalCode,
                    }]
            })
        } else {
            console.log("cant register to own event")
        }
    }


    const price = isFetched && event.type === "paid" && Number(event.price)
    const discount = isFetched && !IsObjectEmpty(event.promos) ? (price - (price * (Number(event.promos.percentage) / 100))) : 0

    return (
        isFetched &&
        <Container>
            <div className="flex flex-col gap-4 pb-10">
                <span className="cursor-pointer" onClick={() => navigate(-1)}>
                    <span className="flex items-center gap-2">
                        <ArrowLeft className="text-primary w-4 h-4" /> <p className="hover:underline text-muted-foreground hover:text-foreground">back</p>
                    </span>
                </span>
                <div className="w-full h-[250px] rounded-md bg-secondary" />
                <p className="text-muted-foreground">{format(new Date(event.date), "PPP")}</p>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="order-2 md:order-1 flex flex-col flex-1">
                        <h2 className="font-bold text-2xl md:text-4xl">{event.name}</h2>
                        <p>{event.description}</p>
                        {
                            userEvent &&
                            <div className="w-full p-2 mt-4 rounded-md bg-secondary flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img className="object-cover rounded-full w-[30px] h-[30px] self-start" src={userEvent.imageUrl} />
                                    <span className="flex flex-col">
                                        <p className="font-bold">{userEvent.first_name}</p>
                                        <p className="text-sm text-muted-foreground">{userEvent.follower.length} Follower</p>
                                    </span>
                                </div>
                                <Button className="bg-primary rounded-full hover:bg-primary/80">FOLLOW</Button>
                            </div>
                        }
                        <div className="space-y-6 mt-6">
                            <span className="block">
                                <p className="font-bold">Date & Time</p>
                                <span className="flex gap-2">
                                    <p>{format(new Date(event.date), "PPP")}</p>
                                    <span className="text-muted-foreground">{event.time}</span>
                                </span>
                            </span>
                            <span className="block">
                                <p className="font-bold">Location</p>
                                {

                                    isOnline === "online" ?
                                        <p className="text-sm">{isOnline}</p> :
                                        <span className="text-sm flex gap-2 capitalize">
                                            {district ? <p>{`${district.name.toLowerCase()},`}</p> : <Skeleton className="h4 w-10" />}
                                            {regency ? <p>{`${regency.name.toLowerCase()},`}</p> : <Skeleton className="h4 w-10" />}
                                            {province ? <p>{`${province.name.toLowerCase()}`}</p> : <Skeleton className="h4 w-10" />}
                                        </span>
                                }
                            </span>
                            <span className="block">
                                <p className="font-bold">Tags</p>
                                <span className="space-x-2">
                                    {
                                        event.tags.map(tag => (
                                            <Badge className="cursor-pointer" key={tag}>{tag}</Badge>
                                        ))
                                    }
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 flex flex-col self-start gap-4 w-full md:w-max">
                        <span className="flex items-center gap-4 self-end">
                            <Heart className="w-6 h-6 cursor-pointer" />
                            <Share className="w-6 h-6 cursor-pointer" />
                        </span>
                        <div className="md:border md:border-border rounded-md w-full md:w-[250px] justify-between py-3 gap-2 md:px-6 md:py-4 flex flex-row md:flex-col items-center h-max">
                            {
                                discount > 0 ? (
                                    <span>
                                        <p className="font-bold">{FormatToIDR(price - (price - discount))}</p>
                                        <span className="flex gap-2">
                                            <Badge className="text-xs">{`${event.promos.percentage}%`}</Badge>
                                            <p className="line-through text-muted-foreground text-sm">{FormatToIDR(price)}</p>
                                        </span>
                                    </span>
                                ) : (<p className=" font-bold text-lg">{event.type === 'paid' ? FormatToIDR(price) : event.type}</p>)

                            }
                            <Dialog >
                                <DialogTrigger>
                                    <span className="flex items-center gap-2 hover:bg-secondary w-full order-2 md:order-1 border p-2 rounded-md">
                                        <Ticket className="text-primary" />
                                        <p>
                                            Get Ticket
                                        </p>
                                    </span>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            {currentPage === 1 ? 'Contact Information' : 'Checkout'}
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div>
                                        {
                                            currentPage === 1 &&
                                            (isSignedIn ? (<p>logged in as <span className="text-gray-500">{user.emailAddresses[0].emailAddress}</span></p>) : (
                                                <p>register for the event</p>))
                                        }
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                                                {
                                                    currentPage === 1 && (
                                                        <>
                                                            <FormField
                                                                control={form.control}
                                                                name="referal"
                                                                render={({ field }) => (
                                                                    <FormItem className="mt-6">
                                                                        <FormLabel>Referal Code</FormLabel>
                                                                        <FormControl>
                                                                            <Input id="referal" {...field} placeholder="ex. 30eb68f-e0fa-5ecc-887a-7c7a62614681" />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )
                                                                }
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
                                                                    )
                                                                    }
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
                                                                    )
                                                                    }
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
                                                                )
                                                                }
                                                            />
                                                            <span onClick={() => setCurrentPage(currentPage + 1)} className='bg-primary p-2 px-4 rounded-md hover:bg-primary/80 block w-max text-primary-foreground cursor-pointer'>
                                                                Register
                                                            </span>
                                                        </>
                                                    )

                                                }
                                                {
                                                    currentPage === 2 && (
                                                        <div className="p-2">
                                                            <ArrowLeft className="w-4 h-4 cursor-pointer mb-6" onClick={() => setCurrentPage(currentPage - 1)} />
                                                            <span className="grid grid-cols-3">
                                                                <p>Name</p>
                                                                <p className="span-2 text-muted-foreground">{`${form.getValues('firstName')} ${form.getValues('lastName')}`}</p>
                                                            </span>
                                                            <span className="grid grid-cols-3">
                                                                <p>Email</p>
                                                                <p className="span-2 text-muted-foreground">{form.getValues("email")}</p>
                                                            </span>
                                                            <Separator className="my-2" />
                                                            <span className="grid grid-cols-3">
                                                                <p>Payment</p>
                                                                <p className="span-2 text-muted-foreground">{FormatToIDR(price)}</p>
                                                            </span>
                                                            {
                                                                discount > 0 && (
                                                                    <span className="grid grid-cols-3">
                                                                        <p>Discount</p>
                                                                        <p className="span-2 text-muted-foreground">{FormatToIDR(price - discount)}</p>
                                                                    </span>
                                                                )
                                                            }
                                                            <Button className="mt-6 bg-primary hover:bg-primary/80 w-full" type="submit">
                                                                {
                                                                    eventMutation.isLoading && (
                                                                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                                                                    )
                                                                }
                                                                {eventMutation.isLoading ? 'Processing...' : 'Checkout'}
                                                            </Button>
                                                        </div>

                                                    )
                                                }
                                            </form>
                                        </Form>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default EventDetails