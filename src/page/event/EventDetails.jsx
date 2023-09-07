import Container from "@/components/layout/Container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useLocation } from "@/hooks/useLocation"
import { formatToUnits } from "@/lib/utils"
import services from "@/services"
import { format } from "date-fns"
import { ArrowLeft, Heart, Share } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"



const EventDetails = () => {
    const { eventId } = useParams()
    const navigate = useNavigate()

    const { data: event, isFetched } = useQuery(["event", eventId], async () => {
        const res = await services.get(`/events/${eventId}`)
        return res.data
    })
    const { province: pId, regency: rId, district: dId, isOnline } = isFetched ? event.location : {}
    const { data: province } = useLocation("province", pId)
    const { data: regency } = useLocation("regency", rId)
    const { data: district } = useLocation("district", dId)

    return (
        isFetched &&
        <Container>
            <div className="flex flex-col gap-4">
                <span className="cursor-pointer" onClick={() => navigate(-1)}>
                    <ArrowLeft />
                </span>

                <div className="w-full h-[250px] rounded-md bg-gradient-to-r from-rose-100 to-teal-100" />
                <p>{format(new Date(event.date), "PPP")}</p>
                <div className="flex gap-6">
                    <div className="flex flex-col flex-1">
                        <h2 className="font-bold text-4xl">{event.name}</h2>
                        <p>{event.description}</p>
                        <div className="w-full p-2 mt-4 rounded-md bg-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img className="object-cover rounded-full w-[30px] h-[30px] self-start" src={event.user.imageUrl} />
                                <span className="flex flex-col">
                                    <p className="font-bold">{event.user.fullname}</p>
                                    <p>{event.user.follower} Follower</p>
                                </span>
                            </div>
                            <Button>FOLLOW</Button>
                        </div>
                        <div className="space-y-6 mt-6">
                            <span className="block">
                                <p className="font-bold">Date & Time</p>
                                <span className="flex gap-2">
                                    <p>{format(new Date(event.date), "PPP")}</p>
                                    <span className="text-gray-500">{event.time}</span>
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
                    <div className="flex flex-col self-start gap-4">
                        <span className="flex items-center gap-4 self-end">
                            <Heart className="w-6 h-6 cursor-pointer" />
                            <Share className="w-6 h-6 cursor-pointer" />
                        </span>
                        <div className="border rounded-md w-[250px] px-6 py-4 flex flex-col items-center h-max">
                            <p className="font-bold text-lg">{event.type === 'paid' ? formatToUnits(parseInt(event.price)) : event.type}</p>
                            <Button className="w-full">Get Ticket</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default EventDetails