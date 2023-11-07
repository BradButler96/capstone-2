import axios from "axios";
import PortTrackerAPI from './PortTrackerAPI'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class CryptoAPI {
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
    
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${PortTrackerAPI.token}` };
        const params = (method === 'get') ? data : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
    }

    static async getTokenList(start = 1, limit = 20, sort = 'cmc_rank') {
      const res = await this.request(`crypto/browse`, {start: start, limit: limit, sort: sort});
      return res
    }

    // static async getTokenInfo(IDs) {
    //   console.log(IDs)
    //   return IDs
    // }
}

export default CryptoAPI