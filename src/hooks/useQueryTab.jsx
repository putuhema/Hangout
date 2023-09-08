import services from "@/services"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useQueryTab = (key, q, isEnabled) => {
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: [key],
        queryFn: async () => {
            const cache = queryClient.getQueryData([key])
            if (cache) {
                return cache
            }
            const res = await services.get(`/events${q}`)
            return res.data.data
        },
        enabled: isEnabled
    })

    return { data }
}