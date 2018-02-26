import abi from '../build/MonaLease.json'
import Web3 from 'web3'


export function Contract (state = [], action) {
        switch (action.type) {
            case 'initiate':
            return [

                    {   
                        creating: true,
                        created: false,
                        landloardAddress: action.landloardAddress,
                        contractAddress: null, 
                        name: action.name,
                        interval: action.interval,
                        rentAmount: action.amount,
                        oracleAddress: action.address
                    }
                ]

                case 'created':
                return state.map(contract => ({
                    ...contract,
                    contractAddress: action.contractAddress,
                    creating: !contract.creating,
                    created: !contract.created
                }))

                default:
                return state;
        } 
}
  
