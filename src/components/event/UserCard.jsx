import { formatToUnits } from "@/lib/utils"

const userCard = ({ event }) => {

    return (
        <div className="flex gap-2 items-center rounded-md border p-2">
            <span className="block h-[50px] w-[50px] rounded-md bg-gray-100">
            </span>
            <div className="flex flex-col gap-2">
                <p className="font-bold">{event.name}</p>
                <p className="font-bold rounded-full text-sm px-2 w-max bg-black text-white ">{event.type === 'paid' ? formatToUnits(parseInt(event.price)) : event.type}</p>
            </div>
        </div>)
}

export default userCard