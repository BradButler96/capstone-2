import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class PortTrackerAPI {

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${PortTrackerAPI.token}` };
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

//   // Individual API routes

  static async register(user) {
    const res = await this.request(`auth/register`, user, 'post');
    PortTrackerAPI.token = res.token

    return res.token
  }

  static async login(user) {
    const res = await this.request(`auth/token`, user, 'post');
    PortTrackerAPI.token = res.token
    return res.token
  }

  static async logout() {
    PortTrackerAPI.token = null
    return 'logout complete'
  }

  static async getUserInfo(username) {
    if (username !== '') {
      const res = await this.request(`users/${username}`)
      res.user.token = PortTrackerAPI.token
      return res.user
    }
  }

  static async editProfile(username, userInfo) {
      const res = await this.request(`users/${username}`, userInfo, 'patch')

      res.user.token = PortTrackerAPI.token
      return res.user
  }

  static async updateFavorites(username, action, tokenID) {
    const info = {action:action, id: tokenID}
    const res = await this.request(`users/${username}/favorites`, info, 'patch')
    return res.favorites
  }

  static async addTxn(data) {
    const res = await this.request(`users/${data.username}/trades`, data, 'post')
    return res.updatedOrders
  }
}


export default PortTrackerAPI