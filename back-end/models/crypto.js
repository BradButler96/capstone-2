
const BASE_URL = 'https://pro-api.coinmarketcap.com'
const API_KEY = 'b1627456-450a-4ff2-8a9f-c7facb603810'

class Crypto {
    static async getIDsByRank(start, limit, sort) {
        try {
            const res = await fetch(`${BASE_URL}/v1/cryptocurrency/map?start=${start}&limit=${limit}&sort=${sort}`, {
                method: 'get',
                headers: {
                    'X-CMC_PRO_API_KEY': API_KEY
                }
            })
            const tokens = await res.json()
            const tokenIDs = tokens.data.map(token => token.id).join(',');

            return tokenIDs
          
        } catch (err) {
            return next(err);
        }
    }

    static async getQuotesByID(tokenIDs) {
        try {
            const res = await fetch(`${BASE_URL}/v2/cryptocurrency/quotes/latest?id=${tokenIDs}`, {
                method: 'get',
                headers: {
                    'X-CMC_PRO_API_KEY': API_KEY
                }
            })
            const tokenQuotes = await res.json()

            return tokenQuotes
          
        } catch (err) {
            return next(err);
        }
    }

    static async getInfoByID(tokenIDs) {
        try {
            const res = await fetch(`${BASE_URL}/v2/cryptocurrency/info?id=${tokenIDs}`, {
                method: 'get',
                headers: {
                      'X-CMC_PRO_API_KEY': API_KEY
                }
            })
            const tokenInfo = await res.json()

            return tokenInfo
          
        } catch (err) {
            return next(err);
        }


    }
}   

module.exports = Crypto
