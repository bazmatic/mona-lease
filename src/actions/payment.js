import abi from '../build/MonaLease.json'
import Web3 from 'web3'
var truffleContract = require('truffle-contract')


export function updateLastPaymentHistory ( datePaid, nextRun, fromAdrr, weiPaid,fiatPaid) {
    return {
      type: 'newPayment',
      datePaid,
      nextRun,
      fromAdrr,
      weiPaid,
      fiatPaid
    }
}

export function resetPaymentHistory () {
    return {
        type: 'reset'
    }
}

export function getPaymentHistory (contractAddress, renterAddress) {
    return dispatch => {
      var web3 = window.web3;
      var ByteCode = abi.bytecode;
      var account = web3.eth.accounts[0];
      var Abi = abi.abi;
      var MonaLeaseContract = truffleContract({
         abi: Abi
      })
      MonaLeaseContract.setProvider(web3.currentProvider);
      var instance = MonaLeaseContract.at(contractAddress);
      return instance.payments.call(renterAddress).then(
        (paymentHistory) => {
          dispatch(updateLastPaymentHistory(paymentHistory[0], paymentHistory[1], paymentHistory[2], paymentHistory[3], paymentHistory[4]));
        }).catch(function(e){
          console.log(e);
      }) 
    }
  }
  