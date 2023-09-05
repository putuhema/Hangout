import { Skeleton } from "../ui/skeleton"

const CardSkeleton = () => {

    return (
        <div className="relative w-full h-[250px] bg-gray-300">
            <Skeleton className="absolute top-2 left-2 h-6 w-4" />
            <Skeleton className="absolute bottom-2 left-2 mr-[calc(100%_-_8px)] h-6 w-4" />
        </div>
    )
}


export default CardSkeleton