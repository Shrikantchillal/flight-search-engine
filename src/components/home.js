import React, { useEffect } from 'react';
import LeftSidebar from './leftSidebar';
import RightMainContent from './rightMainContent';
import { connect } from 'react-redux';
import { getFlightsData } from '../actions/actions'; 

const Home = (props) => {

    useEffect(() => {
        props.getFlightsData();
    }, []);

    return(
        <>
            <div className="main-content">
                <div className="left-sidebar">
                    <LeftSidebar />
                </div>
                <div className="right-mainContent">
                    <RightMainContent />
                </div>
            </div>
        </>
    )
}

// const mapStateToProps = (state) => {
//     return {

//     }
// };

const mapDispatchToProps = (dispatch) => ({
    getFlightsData: () => {
        dispatch(getFlightsData());
    }
});

export default connect(null, mapDispatchToProps)(Home);