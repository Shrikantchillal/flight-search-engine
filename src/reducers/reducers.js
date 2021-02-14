const INITIAL_STATE = {
    allFlightsData: [],
    postSearchObj: {},
    updatedFareValue: ''
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'ALL_FLIGHTS_DATA':
            return {
                ...state,
                allFlightsData: action.data
            }
        case 'POST_SEARCH':
            return {
                ...state,
                postSearchObj: action.data
            }
        case 'GET_FARE_VALUE':
            return {
                ...state,
                updatedFareValue: action.val
            }
        default:
            return {
                ...state
            }
    }
}