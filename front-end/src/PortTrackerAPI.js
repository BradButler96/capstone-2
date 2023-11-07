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
    console.log('test')

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
      res.user['token'] = PortTrackerAPI.token
      return res.user
    }
  }

  static async editProfile(username, editedInfo) {
    const res = await this.request(`users/${username}`, editedInfo, 'patch')
    res.user['token'] = PortTrackerAPI.token
    return res.user
  }

}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default PortTrackerAPI