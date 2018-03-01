import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getAddress, updateAllRenters, runPayment, reset} from '../actions/landlord'
import RaisedButton from 'material-ui/RaisedButton';

const GetRentersTemp = ({dispatch, contract}) => {
    return (
        <div>
            <div> 
          
          <RaisedButton label="Update Renters" secondary={true} style={{margin: '12px'}} onClick={e => {
                dispatch(reset());
                dispatch(updateAllRenters(contract));
            }}/>
          </div> 
            
        </div> 


    
    )
}


export default connect ()(GetRentersTemp);
