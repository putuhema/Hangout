import React, { useEffect } from "react"
import { User2 } from "lucide-react"
import { CircleDollarSign } from "lucide-react"
import { useSelector } from "react-redux"
// import { fetchUser } from "@/features/user"

const Widget = ({ type }) => {
  // const dispatch = useDispatch()
  const userList = useSelector((state) => state.user.userList)
  let data

  const attendee = userList.map((item) => item.attendee)
  const cost = userList.map((item) => item.condition)

  const attendees = Number(
    attendee.reduce((acc, current) => {
      return acc + current
    }, 0)
  )
  const price = Number(
    cost.reduce((acc, current) => {
      return acc + current
    }, 0)
  )

  switch (type) {
    case "attendee":
      data = {
        title: "TOTAL ATTENDEE",
        isMoney: false,
        icon: (
          <User2
            className="text-lg p-1 rounded-md"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              width: 40,
              height: 40,
            }}
          />
        ),
        number: attendees,
      }
      break
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        icon: (
          <CircleDollarSign
            className="text-4xl p-1 rounded-md"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
              width: 40,
              height: 40,
            }}
          />
        ),
        number: price.toFixed(2),
      }
      break
    default:
      break
  }
  return (
    <div className="flex-row p-3 rounded-xl shadow-lg w-full justify-between">
      <div className=" flex flex-col justify-between h-28">
        <span className="title font-bold text-2xl text-gray-400">
          {data.title}
        </span>
        <div className="content flex items-center justify-between">
          <span className=" text-2xl font-medium text-slate-700">
            {data.isMoney && "$"}
            {data.number}
          </span>
          <span className="">{data.icon}</span>
        </div>
      </div>
    </div>
  )
}

export default Widget
