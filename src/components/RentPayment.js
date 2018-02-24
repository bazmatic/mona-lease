import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getAddress, updateAllRenters, runPayment} from '../actions/landlord'
import RaisedButton from 'material-ui/RaisedButton';

const RentPayment = ({dispatch, contract}) => {
    return (
        <div> 
            
          <RaisedButton label="Rent Run" secondary={true} style={{margin: '12px'}} onClick={e => {
                dispatch(runPayment(contract));
            }}/>

        </div>
    )
}

export default connect ()(RentPayment);