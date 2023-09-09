import services from "@/services"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useEventsById = (id) => {
    const queryClient = useQueryClient()

    const { data, isLoading, isFetched } = useQuery({
        queryKey: ['/events', id],
        queryFn: async () => {
            const cache = queryClient.getQueryData(['/events', id])
            if (cache) {
                return cache
            }
            const res = await services.get(`/events/${id}`)
            return res.data
        },
        enabled: !!id
    })

    return { data, isLoading, isFetched }
}