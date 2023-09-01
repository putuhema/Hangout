import axios from "axios";

class Repositories {
  url = "http://localhost:3000";

  async getAPI(params) {
    try {
      return await axios.get(`${this.url}/${params}`);
    } catch (error) {
      console.log(error);
    }
  }

  async postAPI(params, data) {
    try {
      return await axios.post(`${this.url}/${params}`, data);
    } catch (error) {
      console.log(error);
    }
  }

  async updateUPI(params, data) {
    try {
      return await axios.post(`${this.url}/${params}`, data);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAPI(params, data) {
    try {
      return await axios.post(`${this.url}/${params}`, data);
    } catch (error) {
      console.log(error);
    }
  }
}

const repositories = new Repositories();
export default repositories;
