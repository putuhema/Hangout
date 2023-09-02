import React, { useEffect, useState } from "react"
import Axios from "axios"
import style from "./Card.module.css"

export default function Card() {
  const [cards, setCards] = useState([])
  const fetchCard = () => {
    Axios.get("http://localhost:3000/card")
      .then((response) => {
        setCards(response.data)
      })
      .catch(() => alert("Error Pages Not Found"))
  }

  useEffect(() => {
    fetchCard()
  }, [])

  return (
    <>
      <div className={style.cards_container}>
        {cards.map((item, index) => (
          <div key={index}>
            <div className={style.card}>
              <div className="card-image">
                <img
                  src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F561593229%2F1498146012223%2F1%2Foriginal.20230725-114809?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C8334%2C4167&s=26cd89c2644014a1b22df007919a4d86"
                  alt=""
                />
              </div>
              <div className={style.card_content}>
                <p style={{ fontWeight: "700" }}>{item.activity}</p>
                <p style={{ color: "tomato", fontWeight: "bold" }}>
                  {item.time}
                </p>
                <p style={{ color: "#d3d3d3", fontSize: "13px" }}>
                  {item.place}
                </p>
                <p style={{ color: "#d3d3d3", fontSize: "13px" }}>
                  {item.condition}
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
              <div className={style.button}>
                <button className={style.button}>Statistic</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
