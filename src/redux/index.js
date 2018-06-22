import { combineReducers } from 'redux'
import renter from './renter'
import {Contract} from './contract'
import payment from './payment'
const monaLease = combineReducers({
  renter,
  Contract,
  payment
})



export default monaLease