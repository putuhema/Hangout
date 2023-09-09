import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "@/features/user"
import { useNavigate } from "react-router-dom"

export default function Card() {
  const dispatch = useDispatch()
  const userList = useSelector((state) => state.user.userList)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  const redirectToStatistics = () => {
    navigate("/statistics")
  }

  return (
    <>
      <div className="flex justify-center flex-wrap gap-5">
        {userList.map((item, index) => (
          <div key={index}>
            <div className="w-72 h-96 border-2 border-gray-200 border-solid relative">
              <div className="card-image">
                <img
                  src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F561593229%2F1498146012223%2F1%2Foriginal.20230725-114809?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C8334%2C4167&s=26cd89c2644014a1b22df007919a4d86"
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-end pl-3 pt-6">
                <p style={{ fontWeight: "700" }}>{item.activity}</p>
                <p style={{ color: "tomato", fontWeight: "bold" }}>
                  {item.time}
                </p>
                <p style={{ color: "#d3d3d3", fontSize: "13px" }}>
                  {item.place}
                </p>
                <p style={{ color: "#d3d3d3", fontSize: "13px" }}>
                  {item.condition !== 0 ? "$ " : ""}
                  {item.condition === 0 ? "Free" : item.condition}
                </p>

                <p
                  style={{
                    color: "mocha",
                    fontWeight: "600",
                    fontSize: "15px",
                  }}
                >
                  {item.organization}
                </p>
                <p style={{ color: "brown", fontWeight: "600" }}>
                  {item.attendee} Followers
                </p>
              </div>
              <div
                className="text-base bg-red-300 text-white py-1 px-2 mx-2 absolute bottom-5 left-1"
                style={{ paddingTop: "3px" }}
              >
                <p>{item.genre}</p>
              </div>
              <div className="my-0 mx-2 absolute bottom-2 right-0 ">
                <button
                  className="transition ease-in-out delay-250 hover:bg-lime-700 bg-lime-600 text-white font-medium py-2 px-6 rounded"
                  onClick={redirectToStatistics}
                >
                  Statistic
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
