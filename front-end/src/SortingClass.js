
class SortingClass {

    static sortTokens = (tokens, header, direction) => {
        let sorted;

        if (direction === 'ascending') {
            if (header === 'name') sorted = [...tokens].sort((a,b) => a[header].localeCompare(b[header]))
            else if (header === 'favorites') sorted = [...tokens].sort((a,b) => a.cmc_rank - b.cmc_rank)
            else sorted = [...tokens].sort((a,b) => b.quote.USD[header] - a.quote.USD[header])
        } else if (direction === 'descending') {
            if (header === 'name') sorted = [...tokens].sort((a,b) => b[header].localeCompare(a[header]))
            else if (header === 'favorites') sorted = [...tokens].sort((a,b) => b.cmc_rank - a.cmc_rank)
            else sorted = [...tokens].sort((a,b) => a.quote.USD[header] - b.quote.USD[header])
        } else {
            sorted = [...tokens].sort((a,b) => a.cmc_rank - b.cmc_rank)
        }

        return sorted
    }

    static sortCats = (categories, header, direction) => {
        let sorted;

        if (direction === 'ascending') {
            if (header === 'name') sorted = [...categories].sort((a,b) => a[header].localeCompare(b[header]))
            else sorted = [...categories].sort((a,b) => b[header] - a[header])
        } else if (direction === 'descending') {
            if (header === 'name') sorted = [...categories].sort((a,b) => b[header].localeCompare(a[header]))
            else sorted = [...categories].sort((a,b) => a[header] - b[header])
        } else {
            sorted = [...categories].sort((a,b) => b.market_cap - a.market_cap)
        }

        return sorted
    }
}

export default SortingClass