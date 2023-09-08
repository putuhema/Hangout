import { useQueryCache } from "@/hooks/useQueryCache"
import { useAuth } from "@clerk/clerk-react"
import MyEventCard from "./components/MyEventCard"

const MyEvent = () => {
  const { userId } = useAuth()

  const { data: userEvent } = useQueryCache(`event/${userId}`, '/user', { id: userId }, true)
  return (
    <>
      {
        userEvent && userEvent.map(event => (
          <MyEventCard key={event.id} event={event} />
        ))
      }
    </>
  )
}

export default MyEvent