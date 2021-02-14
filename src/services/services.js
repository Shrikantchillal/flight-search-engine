import axios from 'axios';
import { allFlightsData } from '../actions/actions';

const allServices = store => next => action => {
    const apiUrl = '../data/flights.json';
    const header = {'Content-type': 'application/json', 'Accept': 'application/json'};
    switch(action.type) {
        case 'GET_FLIGHTS_DATA':
            axios.get(apiUrl, header)
                .then((res) => {
                    const data = res.data;
                    console.log('data', data);
                    next(allFlightsData(data));
                })
                .catch((error) => {
                    console.log('error', error);
                });
            break;
        default:
            next(action);
            break;
    }
}

export default allServices;