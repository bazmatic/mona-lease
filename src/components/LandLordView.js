import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import Update from "./ButtonUpdate";
import RentPayment from './RentPayment'
import BigNumber from 'big-number'
class Landlord extends React.Component {
    createAddress () {
        return this.props.renters.map((renter) => {
            return (
                <div key={renter.key+renter.addr} className="card" style={{textAlign: 'center', width: "23rem", display: 'inline-block', margin: '10px'}}>
                    <div className="card-block">
                        <p className="list-group-item">Renter's Ethereum Address is <span><em>{renter.addr}</em></span></p>

                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Name: <span><em>{renter.name}</em></span></li>
                        <li className="list-group-item">Email: <span><em>{renter.email}</em></span></li>
                        <li className="list-group-item">Current Balance: <span><em>{(renter.weiHeld).toNumber()}</em></span></li>
                        <li className="list-group-item">Start Date: <span><em>{Date(renter.leaseStartDate.toNumber()).toString().slice(0,24)}</em></span></li>
                        <li className="list-group-item">Last Payment: <span><em>{Date(renter.leaseStartDate.toNumber()).toString().slice(0,24)}</em></span></li>
                        <li className="list-group-item">Owing Balance: <span><em>{(renter.owesWei).toNumber()}</em></span></li>
                        <li className="list-group-item">Payment Defaults: <span><em>{renter.inDefault.toString()}</em></span></li>

                    </ul>
                </div>
            );
        })
    }

 
   
    render() {
        return(
            <div>
               <div > 
                {this.createAddress()}
                </div>
                <div> 
                    <Update/>
                </div>
                <div>

                </div>
            </div>
            
        )
    }
}
function mapStateToProps(state) {
    return {
        renters: state.renter
    }
}
export default connect(mapStateToProps)(Landlord)