import Container from "@/components/layout/Container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { fetchEvent, getLocation } from "@/features/slice/eventAction"
import { formatToUnits } from "@/lib/utils"
import { format } from "date-fns"
import { Heart, Share } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const EventDetails = () => {
    const { eventId } = useParams()
    const dispatch = useDispatch()
    const { event, location } = useSelector(state => state.events)
    const { province, regency, district, isOnline } = event.location


    useEffect(() => {
        dispatch(fetchEvent(eventId))
    }, [dispatch, eventId])

    useEffect(() => {
        if (isOnline !== 'online') {
            if (province) dispatch(getLocation({ id: province, loc: "province" }))
            if (regency) dispatch(getLocation({ id: regency, loc: "regency" }))
            if (district) dispatch(getLocation({ id: district, loc: "district" }))
        }
    }, [isOnline, province, regency, district, dispatch])
    return (
        <Container>
            <div className="flex flex-col gap-4">
                <div className="w-full h-[250px] rounded-md bg-gradient-to-r from-rose-100 to-teal-100" />
                <p>{format(new Date(event.date), "PPP")}</p>
                <div className="flex gap-6">
                    <div className="flex flex-col flex-1">
                        <h2 className="font-bold text-4xl">{event.name}</h2>
                        <p>{event.description}</p>
                        <div className="w-full p-2 mt-4 rounded-md bg-gray-100 flex items-center justify-between">
                            <div>
                                <p>Putu</p>
                                <p>49 Follower</p>
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
                                        <p className="text-sm">{`${location.district.name}, ${location.regency.name}, ${location.province.name}`}</p>
                                }
                            </span>
                            <span className="block">
                                <p className="font-bold">Tags</p>
                                <span className="space-x-2">
                                    {
                                        event.tags.map(tag => (
                                            <Badge key={tag}>{tag}</Badge>
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