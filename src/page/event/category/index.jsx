import EventCard from "@/components/event/EventCard"
import Container from "@/components/layout/Container"
import { Calendar } from "@/components/ui/calendar"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { fetchEventOnCategory } from "@/features/slice/eventAction"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const CategoryPage = () => {
    const { eventCategory } = useParams()
    const dispatch = useDispatch()
    const { events } = useSelector((state) => state.events)
    const [select, setSelect] = useState('today')
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)
    const ref = useRef(null)



    useEffect(() => {
        dispatch(fetchEventOnCategory(eventCategory))
    }, [dispatch, eventCategory])

    useEffect(() => {
        const clickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setSelect('today')
            }
        }
        clickOutside()

        document.addEventListener('mousedown', clickOutside)
        return () => {
            document.removeEventListener('mousedown', clickOutside)
        }

    }, [])
    return (
        <Container>
            <div className="w-full bg-black h-[250px] rounded-md">
                <div className="w-full mx-auto pt-20">
                    <div className="py-4 px-8">
                        <h1 className="text-6xl font-extrabold text-[#f7f154]">Music Events</h1>
                        <p className="text-white">Discover the best Music events in your area and online</p>
                    </div>
                </div>
            </div>
            <div className="w-full mx-auto py-4 relative">
                <Select open={isCalendarOpen} onOpenChange={() => { setIsCalendarOpen(!isCalendarOpen) }
                } value={select} onValueChange={(value) => setSelect(value)} >
                    <SelectTrigger className="w-[180px] rounded-full">
                        <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup  >
                            <SelectItem value="calendar">Calendar</SelectItem>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="tomorrow">Tomorrow</SelectItem>
                            <SelectItem value="weekend">This Weekend</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {
                    select === 'calendar' &&
                    (
                        <div ref={ref}>
                            <Calendar className="absolute left-0 top-12 border w-max rounded-md bg-white mt-5" />
                        </div>
                    )
                }
                <div className="p-2 grid grid-cols-4 gap-4">
                    {
                        events.map(event => (<div key={event.id}><EventCard event={event} /></div>))
                    }
                </div>
            </div>
        </Container >
    )
}

export default CategoryPage