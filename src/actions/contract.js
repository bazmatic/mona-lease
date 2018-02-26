import abi from '../build/MonaLease.json'
import Web3 from 'web3'
import swal from 'sweetalert';
import { Link } from 'react-router-dom'

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
        var ByteCode = abi.bytecode;
        var account = web3.eth.accounts[0];
        var Abi = abi.abi;
        var monacontract = web3.eth.contract(Abi);
        dispatch(createContract(name, interval, amount, address, account));
        return monacontract.new(name.toString(), interval, amount, account, {
          from: account,
          data: '0x606060405261b98c60045534156200001657600080fd5b6040516200156a3803806200156a83398101604052808051820191906020018051906020019091908051906020019091908051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508360019080519060200190620000aa92919062000104565b50826002819055508160038190555080600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050620001b3565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200014757805160ff191683800117855562000178565b8280016001018555821562000178579182015b82811115620001775782518255916020019190600101906200015a565b5b5090506200018791906200018b565b5090565b620001b091905b80821115620001ac57600081600090555060010162000192565b5090565b90565b6113a780620001c36000396000f3006060604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630d469483146100b05780631695533d146100e7578063302bf83b14610187578063322eab46146101b0578063644a1370146101d957806375355e3414610396578063c0406226146103b9578063e3edbfd3146103ce578063f340fa011461041b578063f8d9db8f14610449575b6100ae33346104ac565b005b34156100bb57600080fd5b6100d160048080359060200190919050506105fa565b6040518082815260200191505060405180910390f35b34156100f257600080fd5b610185600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505061061b565b005b341561019257600080fd5b61019a61089c565b6040518082815260200191505060405180910390f35b34156101bb57600080fd5b6101c36108a2565b6040518082815260200191505060405180910390f35b34156101e457600080fd5b610210600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506108a8565b604051808a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200180602001898152602001888152602001878152602001868152602001851515151581526020018415151515815260200183810383528b8181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156102fb5780601f106102d0576101008083540402835291602001916102fb565b820191906000526020600020905b8154815290600101906020018083116102de57829003601f168201915b505083810382528a81815460018160011615610100020316600290048152602001915080546001816001161561010002031660029004801561037e5780601f106103535761010080835404028352916020019161037e565b820191906000526020600020905b81548152906001019060200180831161036157829003601f168201915b50509b50505050505050505050505060405180910390f35b34156103a157600080fd5b6103b7600480803590602001909190505061092e565b005b34156103c457600080fd5b6103cc610a20565b005b34156103d957600080fd5b610405600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610af0565b6040518082815260200191505060405180910390f35b610447600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b30565b005b341561045457600080fd5b61046a6004808035906020019091905050610b3d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104b533610b7c565b15156104c057600080fd5b6000811180156104d557506104d482610b7c565b5b156105925734600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600301600082825401925050819055507f569bfd1b450475abb105387eb78b154f74e4429de7c7301e7796a2880c23c49e82604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a16105f6565b7f3a3ca39c60519dc11c163d54b9ab8205543e1dfb45baf261f56052f58647682f82604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b5050565b600081600454670de0b6b3a764000081151561061257fe5b04029050919050565b610623611223565b61062c33610b7c565b1561063657600080fd5b610120604051908101604052803373ffffffffffffffffffffffffffffffffffffffff16815260200184815260200183815260200160008152602001428152602001428152602001600081526020016000151581526020016001151581525090508060076000836000015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550602082015181600101908051906020019061073e929190611296565b50604082015181600201908051906020019061075b929190611296565b50606082015181600301556080820151816004015560a0820151816005015560c0820151816006015560e08201518160070160006101000a81548160ff0219169083151502179055506101008201518160070160016101000a81548160ff021916908315150217905550905050600880548060010182816107dc9190611316565b916000526020600020900160008360000151909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550507ffc259c995f3b1094a53469904177aa81084e21a71ab240d540f8b2fb2ca15ee360405180806020018281038252600c8152602001807f5369676e6564206c65617365000000000000000000000000000000000000000081525060200191505060405180910390a1505050565b60055481565b60045481565b60076020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001019080600201908060030154908060040154908060050154908060060154908060070160009054906101000a900460ff16908060070160019054906101000a900460ff16905089565b600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561098a57600080fd5b7ffc259c995f3b1094a53469904177aa81084e21a71ab240d540f8b2fb2ca15ee36040518080602001828103825260168152602001807f5265636569766564204f7261636c65206164766963650000000000000000000081525060200191505060405180910390a180600481905550600454670de0b6b3a7640000811515610a0e57fe5b04600581905550610a1d610a20565b50565b60007ffc259c995f3b1094a53469904177aa81084e21a71ab240d540f8b2fb2ca15ee36040518080602001828103825260058152602001807f52756e282900000000000000000000000000000000000000000000000000000081525060200191505060405180910390a1600090505b600880549050811015610aed57610adf600882815481101515610aae57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610bd5565b508080600101915050610a8f565b50565b6000610afa611223565b600080610b0685610fd0565b92508260a001514203915060025482811515610b1e57fe5b04905060035481029350505050919050565b610b3a81346104ac565b50565b600881815481101515610b4c57fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060070160019054906101000a900460ff169050919050565b6000806000610be384610af0565b9150610bee826105fa565b9050600081118015610c415750600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206003015481115b15610d545780600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600601819055506001600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060070160006101000a81548160ff0219169083151502179055507f19b89e312990f1a9aa3ef03b24de652a9072f56a8bce7644b3b8d891305d0fad84604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a160009250610fc9565b80600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600301600082825403925050819055506000600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060070160006101000a81548160ff02191690831515021790555042600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600501819055506000600760008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600601819055506000811115610fc4576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ef857600080fd5b7fa1c84e9116023626b77bda1fa15b7a58f715875390d6cdea5ae27f6d2d63101c84604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a17ffc259c995f3b1094a53469904177aa81084e21a71ab240d540f8b2fb2ca15ee36040518080602001828103825260048152602001807f73656e740000000000000000000000000000000000000000000000000000000081525060200191505060405180910390a15b600192505b5050919050565b610fd8611223565b600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002061012060405190810160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156111135780601f106110e857610100808354040283529160200191611113565b820191906000526020600020905b8154815290600101906020018083116110f657829003601f168201915b50505050508152602001600282018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156111b55780601f1061118a576101008083540402835291602001916111b5565b820191906000526020600020905b81548152906001019060200180831161119857829003601f168201915b50505050508152602001600382015481526020016004820154815260200160058201548152602001600682015481526020016007820160009054906101000a900460ff161515151581526020016007820160019054906101000a900460ff1615151515815250509050919050565b61012060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001611255611342565b8152602001611262611342565b8152602001600081526020016000815260200160008152602001600081526020016000151581526020016000151581525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106112d757805160ff1916838001178555611305565b82800160010185558215611305579182015b828111156113045782518255916020019190600101906112e9565b5b5090506113129190611356565b5090565b81548183558181151161133d5781836000526020600020918201910161133c9190611356565b5b505050565b602060405190810160405280600081525090565b61137891905b8082111561137457600081600090555060010161135c565b5090565b905600a165627a7a7230582018bef9b4f62f27f60af03896c6e5d7e7a91ce01f98e60bc59ae9ddceb148291f0029',
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
                  .then((willDelete) => {
                    var baseName = window.location.host;

                   
                  })
                 
              }
                
              else
                  console.error(error);
          })

        }
    })
  }
}