import axios from "axios"

export default axios.create({
    baseURL: "https://a5c6-180-251-146-247.ngrok-free.app",
    headers: {
        "Content-Type": "application/json"
    }
})