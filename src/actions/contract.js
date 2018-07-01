var Web3 = require('web3');
var build = require('../build/MonaLease.json');
var swal = require('sweetalert');
var withRouter = require('react-router-dom');
export function createContract  (name, interval, amount, address, landloardAddress) {
  return {
    type: 'initiate',
    name,
    interval, 
    amount,
    address,
    landloardAddress,
  }
    
}


export function contractCreated (contractAddress) {
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

export function propertyDetail (name, rentalAmount, rentalInterval) {
  return {
    type: 'propertyDetail',
    name, 
    rentalAmount, 
    rentalInterval
  }
}

export function _propertyDetail (contractAddress) {
  return dispatch => {
    var web3 = window.web3;
    var account = web3.eth.accounts[0];
    var Abi = build.abi;
    var monacontract = web3.eth.contract(Abi);
    var name, rentalAmount, rentalInterval;
    return monacontract.description.call().then(
      (res) => {
      console.log(res)
      name = res;
      dispatch(propertyDetail(name, "j", "a", "a"));               
      }).catch(function(e) {
        dispatch({type: "addError", errorType: "Invalid Contract", errorMessage: "The Contract Address provided doesn't exist"});
    })
  }
}
export function Contractaddres (name, interval, amount, address) {
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
        if (res) {
            var tx = res.transactionHash;
            web3.eth.getTransactionReceipt(tx, function(error, result){
              if(result) {
                  dispatch(contractCreated(result.contractAddress));
                  swal({
                    title: "Congratulations",
                    text: "Your contract Address: " + result.contractAddress,
                    icon: "success",
                    timer: 2000,
                  })
              }
          })

        }
    })
  }
}

