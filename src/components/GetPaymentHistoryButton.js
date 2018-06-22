import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {resetPaymentHistory, getPaymentHistory} from '../actions/payment'
import RaisedButton from 'material-ui/RaisedButton';

const GetPaymentHistory = ({dispatch, contract, renterAddress}) => {
    return (
        <div>
            <div> 
          
          <RaisedButton label="Update Payment" secondary={true} style={{margin: '12px'}} onClick={e => {
                dispatch(resetPaymentHistory()); //reset
                dispatch(getPaymentHistory(contract, renterAddress)); //update
            }}/>
          </div> 
            
        </div> 


    
    )
}


export default connect ()(GetPaymentHistory);
