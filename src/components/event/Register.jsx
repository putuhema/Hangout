import Checkout from "./Checkout"
import { Info, Plus, Minus } from "lucide-react"
import { useState, useEffect } from "react"

export default function Register() {
  const [ticket, setTicket] = useState(1)
  const [show, setShow] = useState(false)

  const maxTicket = 2

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [show])

  return (
    <>
      <div className="rounded-md shadow-sm bg-white p-6 w-full">
        <div className="rounded-md border-2 border-blue-400 p-3 mb-4">
          <div className="flex justify-between items-start">
            <p className="text-[16px] font-medium self-center w-36">
              Registration Ticket
            </p>
            <div className="flex items-center">
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
            Free <Info />
          </div>
        </div>
        <button
          className="rounded-md bg-slate-800 py-2 text-lg font-medium text-white w-full"
          onClick={() => setShow(!show)}
        >
          Reserve a spot
        </button>
      </div>
      <Checkout ticket={ticket} show={show} setShow={setShow} />
    </>
  )
}
