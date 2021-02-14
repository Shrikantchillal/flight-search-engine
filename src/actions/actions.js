export function getFlightsData() {
    return {
        type: 'GET_FLIGHTS_DATA'
    }
}

export function allFlightsData(data) {
    return {
        type: 'ALL_FLIGHTS_DATA',
        data: data
    }
}

export function postSearch(data) {
    return {
        type: 'POST_SEARCH',
        data
    }
}

export function getFareValue(val) {
    return {
        type: 'GET_FARE_VALUE',
        val
    }
}