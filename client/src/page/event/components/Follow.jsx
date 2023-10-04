import { Button } from "@/components/ui/button"
import services from "@/services"
import { useMutation, useQueryClient } from "@tanstack/react-query"

// FIXME: onSuccess callback is not called when using useMutation

const Follow = ({ eventId, userId, userEventId, isFollowing }) => {
    const queryClient = useQueryClient()

    const url = isFollowing ? '/users/unfollow' : '/users/follow'
    const followMutation = useMutation({
        mutationFn: async (follow) => services.post(url, follow),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["event", eventId] })
        },
    })
    const onSubmit = (e) => {
        e.preventDefault()
        followMutation.mutate({
            followingId: userId,
            followerId: userEventId
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <Button type="submit" className="bg-primary rounded-full hover:bg-primary/80">
                {!isFollowing ? 'FOLLOW' : "UNFOLLOW"}
            </Button>
        </form>
    )
}

export default Follow