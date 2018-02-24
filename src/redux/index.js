import { combineReducers } from 'redux'
import renter from './renter'
import {Contract} from './contract'
const monaLease = combineReducers({
  renter,
  Contract,
})

export default monaLease