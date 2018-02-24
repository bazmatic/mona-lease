import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import Update from "./UpdateButton";
import RentPayment from './RentPayment'
import BigNumber from 'big-number'
import abi from '../build/MonaLease.json'
import Web3 from 'web3'
import SendWei from '../components/SendWei'
class Landlord extends React.Component {
    createAddress () {
        var web3 = window.web3;
        var account = web3.eth.accounts[0];
        var renter;
        return this.props.renters.filter(renters => renters.addr == account).map((renter) => {
            return (
                <div key={renter.addr} className="card" style={{textAlign: 'center', width: "23rem", display: 'inline-block', margin: '10px'}}>
                
                   <div>
                        </div>
                    <div className="card-block">
                        <p className="list-group-item">Your Renter Details are<span><em></em></span></p>

                    </div>
                    <div>
                        <ul className="list-group list-group-flush">
                        <li className="list-group-item">Name: <span><em>{renter.name}</em></span></li>
                        <li className="list-group-item">Email: <span><em>{renter.email}</em></span></li>
                        <li className="list-group-item">Current Balance: <span><em>{(renter.weiHeld).toNumber()}</em></span></li>
                        <li className="list-group-item">Last Payment: <span><em>{Date(renter.leaseStartDate.toNumber()).toString().slice(0,24)}</em></span></li>
                        <li className="list-group-item">Owing Balance: <span><em>{(renter.owesWei).toNumber()}</em></span></li>
                        <li className="list-group-item">Payment Defaults: <span><em>{renter.inDefault.toString()}</em></span></li>

                    </ul>
                    </div> 
                 
                </div>
            );
           
        })
    }

 
   
    render() {
        return(
            <div>
               <div style={{ }}> 
                {this.createAddress()}
                </div>
                <div> 
                <Update contract={this.props.contract[0].contractAddress}/>
                </div>
                <SendWei contract={this.props.contract[0].contractAddress}/>
                <div>
                </div>
                <div>

                </div>
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
export default connect(mapStateToProps)(Landlord)