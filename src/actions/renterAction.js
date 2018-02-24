import abi from '../build/MonaLease.json'
import Web3 from 'web3'
var truffleContract = require('truffle-contract');

export function createRenter (contractAddress, name, email) {
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
        return instance.signLease(name, email, {from: account}).then(
          (res) => {
                  console.log(res)                   
  
          }).catch(function(e) {
              // There was an error! Handle it.
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

