import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useSelector } from "react-redux"

const Chart = ({ aspect, title }) => {
  const userData = useSelector((state) => state.user.userList)
  const timeUser = userData.map((data) => data.time.slice(4, 7))
  const aug = timeUser.filter((data) => data == "Aug")
  const sep = timeUser.filter((data) => data == "Sep")
  const oct = timeUser.filter((data) => data == "Oct")
  const des = timeUser.filter((data) => data == "Des")
  const nov = timeUser.filter((data) => data == "Nov")

  const data = [
    {
      name: "August",
      Total: aug.length,
    },
    {
      name: "September",
      Total: sep.length,
    },
    {
      name: "October",
      Total: oct.length,
    },
    {
      name: "November",
      Total: nov.length,
    },
    {
      name: "Desember",
      Total: des.length,
    },
  ]

  return (
    <div className="flex-4 p-2 text-gray-400 shadow-gray-900">
      <div className="mb-5">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-300" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
