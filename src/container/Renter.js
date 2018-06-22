import React from 'react';
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import GetRenters from "../components/GetRentersButton";
import GetPayment from "../components/GetPaymentHistoryButton";
import Web3 from 'web3'
import SendWei from '../components/SendWei'
import {CSVLink, CSVDownload} from 'react-csv';
import SentRent from '../components/RentPayment'
class Landlord extends React.Component {
    createAddress () {
        var web3 = window.web3;
        var account = web3.eth.accounts[0];
        return this.props.renters.filter(renters => renters.addr === account).map((renter) => {
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
                        <li className="list-group-item">Current Balance: <span><em>{parseInt(renter.weiHeld)}</em></span></li>
                        <li className="list-group-item">Start Date: <span><em>{Date(parseInt(renter.leaseStartDate)).toString().slice(0,24)}</em></span></li>
                        <li className="list-group-item">Owing Balance: <span><em>{parseInt(renter.owesWei)}</em></span></li>
                        <li className="list-group-item">Payment Defaults: <span><em>{renter.inDefault.toString()}</em></span></li>

                    </ul>
                    </div> 
                 
                </div>
            );
           
        })
    }


    paymentHistory () {
        var web3 = window.web3;
        var account = web3.eth.accounts[0];
        return this.props.payments.map((payment) => {
            return (
                <div key={payment.fromAdrr} className="card" style={{textAlign: 'center', width: "23rem", display: 'inline-block', margin: '10px'}}>
                    <div className="card-block">
                        <p className="list-group-item">Payment Last History</p>

                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Next Rent Run: <span><em>{Date(parseInt(payment.nextRun)).toString().slice(0,24)}</em></span></li>
                        <li className="list-group-item">Wei Paid: <span><em>{parseInt(payment.weiPaid)}</em></span></li>
                        <li className="list-group-item">AUD Paid: <span><em>{parseInt(payment.fiatPaid)}</em></span></li>
                        <li className="list-group-item">Date Paid: <span><em>{Date(parseInt(payment.datePaid)).toString().slice(0,24)}</em></span></li>

                    </ul>
                </div>
            );
        })
    }
 
   
    render() {
        var contractAddress = this.props.match.params.id;
        var web3 = window.web3;
        var renterAccount = web3.eth.accounts[0];
        const csvData = this.props.payments;
        return(
            <div>
                <div> 
                    {this.createAddress()}
                </div>
                <div>
                <SendWei contract={contractAddress}/>
                </div>
                <div>
                <GetRenters contract={contractAddress}/>
                </div>
                <div> 
                <GetPayment contract={contractAddress} renterAddress={renterAccount}/>
                </div>
                <div>
                    {this.props.payments[0] ? this.paymentHistory() : <div> </div>}
                </div>
                <div> 
                <CSVLink data={csvData} >Download Payment History</CSVLink>
                </div>
            </div>
            
        )
    }
}
function mapStateToProps(state) {
    return {
        renters: state.renter,
        contract: state.Contract,
        payments: state.payment
    }
}
export default connect(mapStateToProps)(Landlord)