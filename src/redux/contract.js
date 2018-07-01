import abi from '../build/MonaLease.json'
import Web3 from 'web3'


export function Contract (state = [], action) {
        switch (action.type) {
            case 'initiate':
            return [

                    {   
                        loading: null,
                        landloardAddress: action.landloardAddress,
                        contractAddress: null, 
                        name: action.name,
                        interval: action.interval,
                        rentAmount: action.amount,
                        oracleAddress: action.address,
                        renterCounter: 0,
                        loading: action.loading
                    }
                ]

                case 'created':
                return state.map(contract => ({
                    ...contract,
                    contractAddress: action.contractAddress,
                    creating: !contract.creating,
                    created: !contract.created
                }))

                case 'loading':
                return state.map(contract => ({
                    ...contract,
                    loading: false
                }))

                case 'loaded': 
                return state.map(contract => ({
                    ...contract,
                    loading: true,
                    contractAddress: action.contractAddress
                }))

                case 'newRenter':
                return state.map(contract => ({
                    ...contract,
                    renterCounter: action.renterCounter
                }))

                case 'propertyDetail':
                return state.map(contract => ({
                    ...contract,
                    name: action.name,
                    rentAmount: action.rentAmount,
                    interval: action.interval
                }))

                default:
                return state;
        } 
}
  

