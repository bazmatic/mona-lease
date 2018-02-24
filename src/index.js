import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/App';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import monaLease from './redux/index';
import 'bootstrap/dist/css/bootstrap.css';
import Contract from './container/Contract'
import thunk from 'redux-thunk'
import abi from './build/MonaLease.json'
import Web3 from 'web3'
import ReduxThunk from 'redux-thunk' 
import promiseMiddleware from 'redux-promise';
import { BrowserRouter as Router, Route, Link, HashRouter, Switch, BrowserRouter   } from "react-router-dom";
import LandLordView from './components/LandLordView'
import RentPayment from './components/RentPayment'
import SignUp from './components/BecomeRenter'
import Renter from './components/Renter'
import SendWei from './components/SendWei'
import NavBar from './components/Nav'
import Footer from './components/Footer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UpdatedButton from './components/ButtonUpdate'
import LandlordSignUp from './components/Landlord'
const logger = (store) => (next) => (action) => {
        console.group(action.type)
        console.info('dispatching', action)
        let result = next(action)
        console.log('next state', store.getState())
        console.groupEnd(action.type)
        return result
}
const middleware = applyMiddleware(ReduxThunk);
let store = createStore(monaLease, middleware);

store.subscribe(()=> {
    console.log("STORE HAS CHANGED", store.getState())
})
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <Router >
    <Switch>
    <MuiThemeProvider>

      <div>
        <div> 
        <NavBar/>
        </div>
        <Route exact={true} path="/" component={App }/>
        <Route path="/LandLordView" component={LandLordView}/>
        <Route path="/RenterSignUp" component={SignUp}/>
        <Route path="/Renter" component={Renter}/>
        <Route path="/SendWei" component={SendWei}/>
        <Route path="/Contract" component={LandlordSignUp}/>
        <div>
        <Footer/>
        </div>
        </div>
        </MuiThemeProvider>
    </Switch>
    </Router>
    
  </Provider>,
  document.getElementById('root')
)