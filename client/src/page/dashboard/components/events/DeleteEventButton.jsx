import services from "@/services"
import { useMutation } from "@tanstack/react-query"
import { Trash } from "lucide-react"

const DeleteEventButton = ({ eventId }) => {
    const { mutate } = useMutation({
        mutationFn: async () => {
            return services.delete(`/events/${eventId}`)
        }
    })

    const handleOnSubmit = (e) => {
        e.preventDefault()
        mutate()
    }
    return (
        <form onSubmit={handleOnSubmit}>
            <button type="submit" className="flex gap-2 items-center text-red-400 text-foreground">
                <Trash className="w-4 h-4 text-red-500" /> Delete
            </button >
        </form>
    )
}

export default DeleteEventButton