import React, { useState } from 'react';
import { TextField, MenuItem, Slider } from '@material-ui/core';
import { postSearch, getFareValue } from '../actions/actions';
import { connect } from 'react-redux';

const LeftSidebar = (props) => {
    const [values, setValues] = useState({
        originCityName: '',
        destinationCityName: '',
        departurDate: '',
        returnDate: '',
        passengers: 'Passengers',
        passengersList: [1, 2, 3, 4],
        destinationError: false,
        originCityError: false,
        search: false
    });
    const [fareValue, updateFareValue] = useState(40000);
    const handleChange = (e) => {
        if(e.target.name === 'origin-city') {
            setValues((values) => ({
                ...values,
                originCityName: e.target.value,
                originCityError: false
            }));
        } else if(e.target.name === 'destination-city') {
            setValues((values) => ({
                ...values,
                destinationCityName: e.target.value,
                destinationError: false
            }));
        } else if(e.target.name === 'passengers') {
            setValues((values) => ({
                ...values,
                passengers: e.target.value,
            }));
        }
    }
    const handleSave = () => {
        const obj = {
            originCityName: values.originCityName.toLocaleLowerCase(),
            destinationCityName: values.destinationCityName.toLocaleLowerCase(),
            departurDate: values.departurDate,
            passengers: values.passengers
        }
        if(values.destinationCityName === '') {
            setValues((values) => ({...values, destinationError: true }))
        } else {
            props.postSearch(obj);
            setValues((values) => ({...values, search: true }));
        }
    }
    const handleChangeFare = (event, newValue) => {
        updateFareValue(newValue);
    }
    if(values.search) {
        props.getFareValue(fareValue)
    }
    return (
        <>
            <div className="form-title">One Way</div>
            <div className="form-fields">
                <TextField 
                    name="origin-city"
                    placeholder="Enter Origin City"
                    autoComplete="off"
                    value={values.originCityName || ''}
                    onChange={(e) => handleChange(e)}
                    className={"text-field"}
                />
                <TextField 
                    name="destination-city"
                    placeholder="Enter Destination City"
                    autoComplete="off"
                    error={values.destinationError}
                    helperText={values.destinationError ? 'Required field' : ''}
                    value={values.destinationCityName || ''}
                    onChange={(e) => handleChange(e)}
                    className={"text-field"}
                />
                <TextField
                    name="departure-date"
                    label="Departure Date"
                    type="date"
                    defaultValue="2017-05-24"
                    value={values.departurDate || '2017-05-24'}
                    onChange={(e) => handleChange(e)}
                    className={"text-field date-field"}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="return-date"
                    label="Return Date"
                    type="date"
                    defaultValue="2017-05-24"
                    value={values.returnDate || '2017-05-24'}
                    className={"text-field date-field"}
                    onChange={(e) => handleChange(e)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    select
                    name="passengers"
                    value={values.passengers}
                    className={"text-field"}
                    onChange={(e) => handleChange(e)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    SelectProps={{
                        MenuProps: {
                            className: 'affinity-details-view-textfield',
                            getContentAnchorEl: null,
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                            }
                        },
                    }}
                >
                    <MenuItem value={'Passengers'}>Passengers</MenuItem>
                    {values.passengersList.map((item, index) => {
                        return (
                            <MenuItem key={index} value={item} >{item}</MenuItem>
                        )
                    })}
                </TextField>
                <button onClick={handleSave} variant="contained" className={'grey-btn'}>Search</button>
            </div>
            <div className="refine-flight-search">
                <div className="title">Refine flight search</div>
                <Slider                    
                    value={fareValue}
                    min={0}
                    step={10000}
                    max={100000}
                    onChange={handleChangeFare}
                    valueLabelDisplay="auto"
                    marks
                    aria-labelledby="non-linear-slider"
                />
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => ({
    postSearch: (data) => {
        dispatch(postSearch(data));
    },
    getFareValue: (val) => {
        dispatch(getFareValue(val));
    }
})

export default connect(null, mapDispatchToProps)(LeftSidebar);