import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import defaultImg from '../images/default-flight-img.PNG';

const RightMainContent = (props) => {
    let filteredData;
    const clean = (obj) => {
        let newObj = {};
        Object.keys(obj).forEach((prop) => {
            if (obj[prop] !== '') { newObj[prop] = obj[prop]; }
        });
        return newObj;
    }
    let currentSearchObj = clean(props.postSearchObj);
    let allData = props.allFlightsData;
    let filterFun = (item) => {
        let result = item.fare.substr(item.fare.indexOf(" ") + 1);
        let resultor = result.substr(result.indexOf(" ") + 1);
        return currentSearchObj.originCityName === item.source.toLowerCase() && currentSearchObj.destinationCityName === item.destination.toLowerCase() && props.updatedFareValue > parseInt(resultor);
    }
    filteredData = allData.filter(filterFun);
    return (
        <>
            { Object.keys(currentSearchObj).length > 0 ? 
            <>
            <div className="search-title">
                {props.postSearchObj.originCityName} &#62; {props.postSearchObj.destinationCityName}
            </div>
            <div className="flight-detail-container">
                {filteredData.length > 0 && filteredData.map((data, index) => (
                        <div className="flight-details" key={index}>
                            <Grid container spacing={3}>
                                <Grid item md={9}>
                                    <div className="fare">{data.fare}</div>
                                    <div className="flight-id">{data.flight_id}</div>
                                    <div className="from-to">{data.source_code} &#62; {data.destination_code}</div>
                                    <div className="flight-timing">
                                        <div><span>Depart:</span> {data.departs_at}</div>
                                        <div><span>Arrive:</span> {data.arrives_at}</div>
                                    </div>
                                </Grid>
                                <Grid item md={3}>
                                    <div className="default-image">
                                        <img src={defaultImg} />
                                    </div>
                                    <div className="book-flight-btn grey-btn">Book this flight</div>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
            </div>
            </>
             : <div className="search-msg">Please search for flight details</div> }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        postSearchObj: state.reducers.postSearchObj,
        allFlightsData: state.reducers.allFlightsData,
        updatedFareValue: state.reducers.updatedFareValue
    }
}


export default connect(mapStateToProps, null)(RightMainContent);