import React, { Component } from 'react';
import {connect} from 'react-redux';
import SignUp from '../components/SignUp'
class UpdateButton extends Component {
    render() {
        return (
            <div>
            {this.props.contract[0] ? <SignUp contract={this.props.contract[0].contractAddress}/>
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