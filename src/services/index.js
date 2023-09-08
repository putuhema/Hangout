import axios from "axios"

export default axios.create({
    baseURL: "https://7d57-180-251-152-27.ngrok-free.app",
    headers: {
        "Content-Type": "application/json"
    }
})