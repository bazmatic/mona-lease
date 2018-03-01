import abi from '../build/MonaLease.json'
import Web3 from 'web3'
import swal from 'sweetalert';
import { Link } from 'react-router-dom'
import build from '../build/MonaLease.json'

export function createContract  (name, interval, amount, address, landloardAddress) {
  return {
    type: 'initiate',
    name,
    interval, 
    amount,
    address,
    landloardAddress
  }
    
  }


export function sendAddress (contractAddress) {
  return {
  type: 'created', 
  contractAddress
  }

}

export function addy (landloardAddress) {
  return {
  type: 'address', 
  landloardAddress
  }
}

export  function Contractaddres (name, interval, amount, address) {
  return  dispatch => {
        var web3 = window.web3;
        var account = web3.eth.accounts[0];
        var Abi = build.abi;
        var monacontract = web3.eth.contract(Abi);
        dispatch(createContract(name, interval, amount, address, account));
        return monacontract.new(name.toString(), interval, amount, account, {
          from: account,
          data: build.bytecode,
          gas: 4000000
      }, (err, res) => {
        if (err) {
            console.log('this is error', err);
        }

        if (res) {
            console.log(res);
            var tx = res.transactionHash;
            web3.eth.getTransactionReceipt(tx, function(error, result){
              if(!error) {
                  dispatch(sendAddress(result.contractAddress));
                  swal({
                    title: "New Contract has been created",
                    text: "The new Contract Address is "+ result.contractAddress,
                    icon: "success",
                    button: {
                      text: "Goto See Renters"

                    },
                  })
                  
                 
              }
                
              else
                  console.error(error);
          })

        }
    })
  }
}