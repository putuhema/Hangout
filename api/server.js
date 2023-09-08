import { isThisWeek, isToday, isTomorrow } from "date-fns"
import jsonServer from "json-server"
import { Low } from "lowdb"
import { JSONFile } from 'lowdb/node'


const db = new Low(new JSONFile("./db.json"), {},
)

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()



server.use(middlewares)

function getDateOnFilter(date, events) {
    let filteredData = []
    switch (date) {
        case '0': {
            filteredData = events.filter(event => isToday(new Date(event.date)))
            break;
        }
        case "2": {
            filteredData = events.filter(event => isTomorrow(new Date(event.date)))
            break;
        }
        case "7": {
            filteredData = events.filter(event => isThisWeek(new Date(event.date)))
            break;
        }
        default: {
            filteredData = []
        }
    }

    return filteredData;
}

server.get("/events/user", async (req, res) => {

    await db.read()
    const events = db.data.events
    const { id } = req.query

    const filterData = events.filter(event => event.userId === id)

    res.status(200).jsonp({
        data: filterData
    })
})


server.get("/events/f", async (req, res) => {
    await db.read()
    const events = db.data.events
    const { date, price, category, q } = req.query

    let filteredData = events
    if (date) filteredData = getDateOnFilter(date, filteredData)
    if (price) filteredData = filteredData.filter(event => event.type === price)
    if (category) filteredData = filteredData.filter(event => event.category === category)

    if (q) {
        filteredData = filteredData.filter(event =>
            event.name.toLowerCase().includes(q.toLocaleString().toLowerCase()))
    }
    res.jsonp({
        data: filteredData.flat()
    })
})

server.get("/events/location", async (req, res) => {
    await db.read()
    const events = db.data.events
    const { loc, value } = req.query

    let filteredData = []

    if (loc) {
        filteredData = events.filter(event => event.location[loc] === value)
    }

    res.jsonp({
        data: filteredData
    })
})

server.use(router)

server.listen(3000, () => {
    console.log('JSON Server is running')
})

