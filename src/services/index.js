import axios from "axios"

export default axios.create({
    baseURL: "https://a1a9-180-251-152-27.ngrok-free.app",
    headers: {
        "Content-Type": "application/json"
    }
})