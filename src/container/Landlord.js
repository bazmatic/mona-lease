import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import SignContract from '../components/Contract';
import LandLordView from '../container/LandLordView'
class Landlord extends Component {
    render() {
        return (
            <div>
                {this.props.contract[0] ? 
                <div>  <LandLordView/> </div>
               
                : <div> <SignContract/> </div>
            
                }
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

export default withRouter(connect (mapStateToProps) (Landlord))