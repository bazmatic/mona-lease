import abi from '../build/MonaLease.json'
import Web3 from 'web3'
import {updateAllRenters, renterCounter} from './landlord'
var truffleContract = require('truffle-contract')

export function createRenter (contractAddress, name, email, history) {
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
        return instance.signLease(name, email, {from: account}).then(
          (res) => {
            dispatch(renterCounter(1));
            dispatch(updateAllRenters(contractAddress));
          }).catch(function(e) {
        })
  
  }
}
export function updateRentalInterval (rentalInterval) {
  return {
    type: 'update',
    rentalInterval
  }
}

export function getRentalInterval (contractAddress) {
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
    return instance.getRentalInterval.call().then(
      (res) => {
        dispatch(updateRentalInterval(res));
      }).catch(function(e){
        console.log(e);
    }) 
  }
}

export function SendWeiAmount (contractAddress, value) {
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
    console.log(instance);
    return instance.deposit(account, {from: account, value: web3.toWei(value, "ether")}).then(
      (res) => {
       console.log(res)                   
      }).catch(function(e) {
              // There was an error! Handle it.
    })
  }
}
