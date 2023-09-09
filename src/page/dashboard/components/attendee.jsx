import services from "@/services"
import { useQuery } from "@tanstack/react-query"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const Attendee = ({ attendee }) => {
    const { data: currentUser, isFetched } = useQuery({
        queryKey: ['user', attendee.userId],
        queryFn: async () => {
            const res = await services.get(`/users/${attendee.userId}`)
            return res.data
        },
        enabled: !!attendee.userId

    })

    return (
        <>
            {
                isFetched && (
                    <Avatar>
                        <AvatarImage src={currentUser.imageUrl} alt={currentUser.first_name} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                )
            }
        </>
    )
}

export default Attendee