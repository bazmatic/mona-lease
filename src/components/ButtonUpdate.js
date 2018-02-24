import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {getAddress, updateAllRenters, runPayment, reset} from '../actions/landlord';
import UpdatedButton from './UpdateButton'
import RentPayment from './RentPayment'
class UpdateButton extends Component {
    render() {
        return (
            <div>
            {this.props.contract[0] ? 
            <div> 
                <UpdatedButton contract={this.props.contract[0].contractAddress}/>
                <RentPayment contract={this.props.contract[0].contractAddress}/>
            </div>
                : <h2 style={{margin: '250px'}}> There is no Contract Available, Please Create a Contract</h2>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        contract: state.Contract
    }
}
export default connect(mapStateToProps)(UpdateButton)
