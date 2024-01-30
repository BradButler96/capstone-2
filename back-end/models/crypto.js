

class Crypto {
    static async getIDsByRank(start, limit) {
        try {
            const res = await fetch(`${BASE_URL}/v1/cryptocurrency/map?start=${start}&limit=${limit}&sort=cmc_rank`, {
                method: 'get',
                headers: {
                    'X-CMC_PRO_API_KEY': API_KEY
                }
            })
            const tokens = await res.json()
            const tokenSet = new Set(tokens.data.map(token => token.id))
            const tokenIDs = [...tokenSet].join(',');

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

    static async getTokenInfo(data) {
        try {
            const res = await fetch(`${BASE_URL}/v2/cryptocurrency/info?${data.idType}=${data.idVal}`, {
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

    static async getCats(start, limit) {
        try {
            const res = await fetch(`${BASE_URL}/v1/cryptocurrency/categories`, {
                method: 'get',
                headers: {
                      'X-CMC_PRO_API_KEY': API_KEY
                }
            })
            const categories = await res.json()
 
            return categories
            
        } catch (err) {
            return next(err);
        }
    }

    static async getCatID(tokenID) {
        try {
            const res = await fetch(`${BASE_URL}/v1/cryptocurrency/categories?id=${tokenID}`, {
                method: 'get',
                headers: {
                      'X-CMC_PRO_API_KEY': API_KEY
                }
            })
            const catInfo = await res.json()

            return catInfo
            
        } catch (err) {
            return next(err);
        }
    }

    static async getTokensByCat(ID) {
        try {
            const res = await fetch(`${BASE_URL}/v1/cryptocurrency/category?id=${ID}`, {
                method: 'get',
                headers: {
                      'X-CMC_PRO_API_KEY': API_KEY
                }
            })
            const tokens = await res.json()

            return tokens
          
        } catch (err) {
            return next(err);
        }
    }

}   

module.exports = Crypto
