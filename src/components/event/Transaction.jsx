import React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import { fetchUser } from "@/features/user"
import { useDispatch, useSelector } from "react-redux"

export default function Transaction() {
  // const transactions = [
  //   {
  //     id: 1,
  //     date: "2023-09-01",
  //     activity: "Makan Gratis Sambil Bangun Network Bisnis",
  //     amount: 500.0,
  //   },
  //   {
  //     id: 2,
  //     date: "2023-09-02",
  //     activity: "FRENCH TECH DAYS 2023, Jakarta",
  //     amount: 110.0,
  //   },
  //   {
  //     id: 3,
  //     date: "2023-09-02",
  //     activity: "Peak Performance Training : Reveal Your True Potential",
  //     amount: 0,
  //   },
  //   {
  //     id: 4,
  //     date: "2023-09-02",
  //     activity: "Pameran Pendidikan Internasional 2023",
  //     amount: 0,
  //   },
  //   {
  //     id: 5,
  //     date: "2023-09-02",
  //     activity: "Seminar Digital Marketing di Jakarta Barat",
  //     amount: 0,
  //   },
  //   {
  //     id: 6,
  //     date: "2023-09-02",
  //     activity: "Nostalgia Lounge with Obbie Mesakh",
  //     amount: 26.6,
  //   },

  //   {
  //     id: 8,
  //     date: "2023-09-02",
  //     activity: "HALAL EXPO INDONESIA (HEI)",
  //     amount: 0,
  //   },
  //   {
  //     id: 9,
  //     date: "2023-09-02",
  //     activity: "INAFOOD EXPO & FORUM",
  //     amount: 0,
  //   },
  //   {
  //     id: 10,
  //     date: "2023-09-02",
  //     activity: "Seminar Digital Marketing di Jakarta Barat",
  //     amount: 100.0,
  //   },
  // ]
  // const dispatch = useDispatch()
  const user = useSelector((state) => state.user.userList)

  // const totalBalance = user.reduce((total, transaction) => {
  //   return total + transaction.amount
  // }, 0)

  return (
    <>
      <h1 className="text-4xl text-center my-5">Transaction Page</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium ">
                {transaction.time.slice(4, 15)}
              </TableCell>
              <TableCell>{transaction.activity}</TableCell>
              <TableCell className="text-right">
                {transaction.condition === "free"
                  ? 0
                  : transaction.condition && `$ ${transaction.condition}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <hr />
    </>
  )
}
