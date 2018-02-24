import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Contractaddres } from "../actions/contract";
import { withRouter } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SignContract from '../container/Contract';
import LandLordView from '../components/LandLordView'
class Landlord extends Component {
    render() {
        return (
            <div>
                {this.props.contract ?
                
                
                    <h1> Tester</h1>
                
                : <SignContract/>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        renters: state.renter,
        contract: state.Contract
    }
}

export default withRouter(connect () (Landlord))