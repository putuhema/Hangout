import axios from "axios"

export const fetchUser = () => {
  return axios.get("http://localhost:2000/card")
}

export default {
  fetchUser,
}
