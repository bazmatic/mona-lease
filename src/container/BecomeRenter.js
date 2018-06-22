import React, { Component } from 'react';
import {connect} from 'react-redux';
import SignUp from '../components/SignUp'
import Web3 from 'web3'


class UpdateButton extends Component {
    contractInterval () {
        var web3 = window.web3;
        var account = web3.eth.accounts[0];
        var contract_address = this.props.match.params.id;
        return this.props.contracts.filter(contracts => contracts.contractAddress === contract_address).map((contract) => {
            return (
                <div style={{alignContent: 'center', margin: '10px'}}>
                    <p className="h4">Details of <em> {contract.contractAddress}</em> contract address</p>
                    <p className ="h4">Rental Period is every  <em> {parseInt(contract.interval)/60} </em> minutes</p>
                    <p className="h4">Rental Amount <em> {parseInt(contract.rentAmount)} </em> ether</p>
                    <div>
                    </div>
            
                 
                </div>
            );
           
        })
    }
    render() {
        var contractAddress = this.props.match.params.id;
        var web3 = window.web3;
        var account = web3.eth.accounts[0];
        return (
            <div>
                <div style={{margin:'80px'}}>             
                    {this.contractInterval()}
                </div>
                <div>
                    <SignUp contract={contractAddress} account = {account}/>
                </div>
            </div>
        )
    }
}



function mapStateToProps(state) {
    return {
        contracts: state.Contract,
        renter: state.renter
    }
}
export default connect(mapStateToProps)(UpdateButton)


//localhost::300/siginup/0x00