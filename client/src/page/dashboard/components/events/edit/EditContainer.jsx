import { useQuery } from '@tanstack/react-query'
import EditEventForm from './EditEventForm'
import { useParams } from 'react-router-dom'
import services from '@/services'
import EditLoading from './EditLoading'

const EditContainer = () => {
  const { eventId } = useParams()

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      const res = await services.get(`/events/${eventId}`)
      return res.data
    }
  })

  if (isLoading) return <EditLoading />

  return (
    <EditEventForm event={event} />
  )
}

export default EditContainer
