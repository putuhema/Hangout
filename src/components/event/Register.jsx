import Checkout from "./Checkout"
import { Info, Plus, Minus } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { formatToUnits } from "@/lib/utils"
import { useState } from "react"

export default function Register({ event }) {
  const [ticket, setTicket] = useState(1)

  const maxTicket = 2

  // useEffect()

  return (
    <>
      <div className="border rounded-md w-[300px] px-6 py-4 flex flex-col items-center h-max">
        <div className="rounded-md border-2 border-blue-400 p-3 mb-4">
          <div className="flex items-start">
            <p className="text-base font-medium self-center w-2/3">
              Registration Ticket
            </p>
            <div className="flex items-center justify-self-end">
              <button
                className="rounded-md bg-gray-100 p-1 disabled:opacity-25"
                onClick={() => setTicket(ticket - 1)}
                disabled={ticket <= 1 ? true : false}
              >
                <Minus />
              </button>
              <span className="text-xl font-medium mx-4">{ticket}</span>
              <button
                className="rounded-md bg-gray-100 p-1 disabled:opacity-25"
                onClick={() => setTicket(ticket + 1)}
                disabled={ticket >= maxTicket ? true : false}
              >
                <Plus />
              </button>
            </div>
          </div>
          <div className="text-[16px] font-medium flex gap-3 items-center mt-4">
            {event.type === "paid"
              ? formatToUnits(parseInt(event.price))
              : event.type}
            <button>
              <Info />
            </button>
          </div>
        </div>
        <Dialog>
          <DialogTrigger className="rounded-md bg-slate-800 py-2 text-lg font-medium text-white w-full">
            <span>
              {event.type === "free"
                ? "Reserve a spot"
                : `Checkout for Rp.${ticket * event.price}`}
            </span>
          </DialogTrigger>
          <DialogContent>
            <Checkout ticket={ticket} ticketPrice={10000} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
