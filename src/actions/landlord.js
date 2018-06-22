import abi from '../build/MonaLease.json'
import Web3 from 'web3'
var truffleContract = require('truffle-contract');
var renterCounter = 1;

export function runPayment (ContractAddress) {
    return dispatch => {
        var web3 = window.web3;
        var ByteCode = abi.bytecode;
        var account = web3.eth.accounts[0];
        var Abi = abi.abi;
        var MonaLeaseContract = truffleContract({
            abi: Abi
          })
        MonaLeaseContract.setProvider(web3.currentProvider);
        var instance = MonaLeaseContract.at(ContractAddress);
        console.log(instance)
        return instance.run({from: account}).then(
            (res) => {
                    console.log(res)                   
    
            }).catch(function(e) {
                // There was an error! Handle it.
              })
    }
}
export function renterCounter (counter) {
    renterCounter += counter;
}
export function updateAllRenters(Contractaddres) {
    return dispatch => {
        for(let i=0; i < renterCounter; i++) {
            dispatch(getAddress(Contractaddres, i));
        }
    }
}
export function updateRenter (key, addr, name, email, weiHeld, leaseStartDate, lastPaymentDate, owesWei, inDefault, _assigned) {
    return {
        type: 'update',
        key, addr, name, email, weiHeld, leaseStartDate, lastPaymentDate, owesWei, inDefault, _assigned
    }
}

export function reset () {
    return {
        type: 'reset'
    }
}
export function getRenterDetails (ContractAddress, renterAddy, key) {
    return dispatch => {
        var web3 = window.web3;
        var ByteCode = abi.bytecode;
        var account = web3.eth.accounts[0];
        var Abi = abi.abi;
        var MonaLeaseContract = truffleContract({
            abi: Abi
          })
        MonaLeaseContract.setProvider(web3.currentProvider);
        var instance = MonaLeaseContract.at(ContractAddress);
        return instance.renters.call(renterAddy).then((renterDetails) => {
            dispatch(updateRenter(key, renterDetails[0], renterDetails[1], renterDetails[2], renterDetails[3], renterDetails[4],
                renterDetails[5], renterDetails[6], renterDetails[7], renterDetails[8]));
        })
    }
}

export function getAddress (ContractAddress, renterIndex) {
    return dispatch => {
        var web3 = window.web3;
        var ByteCode = abi.bytecode;
        var account = web3.eth.accounts[0];
        var Abi = abi.abi;
        var MonaLeaseContract = truffleContract({
            abi: Abi
          })
        MonaLeaseContract.setProvider(web3.currentProvider);
        var instance = MonaLeaseContract.at(ContractAddress);
        return  instance.renterList.call(renterIndex).then(
            (res) => {
                    console.log(res)
                    dispatch(getRenterDetails(ContractAddress, res, renterIndex))
                   
                
            }
        )
    }

}