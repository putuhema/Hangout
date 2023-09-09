import React from "react"
import Widget from "../widgets/Widget"
import Transaction from "./Transaction"
import Chart from "../chart/Chart"

export default function Statistics() {
  return (
    <>
      <div className="flex justify-between mb-5 ">
        <Widget type="attendee" />
        <Widget type="earning" />
      </div>
      <div className=" p-5 gap-5">
        <Chart title={"Last 4 months (Attendee)"} aspect={2 / 1} />
      </div>
      <Transaction />
    </>
  )
}
