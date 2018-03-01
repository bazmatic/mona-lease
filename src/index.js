import React from 'react';
import ReactDOM from 'react-dom';
import Home from './container/Home';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import monaLease from './redux/index';
import 'bootstrap/dist/css/bootstrap.css';
import ReduxThunk from 'redux-thunk' 
import { BrowserRouter as Router, Route} from "react-router-dom";
import LandLordView from './container/LandLordView'
import SignUp from './container/BecomeRenter'
import Renter from './container/Renter'
import NavBar from './components/Nav'
import Footer from './components/Footer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandlordSignUp from './container/Landlord';
import {loadState, saveState} from './localStorage';


const middleware = applyMiddleware(ReduxThunk);
var persistedState = loadState();
let store = createStore(monaLease, persistedState, middleware);

store.subscribe(()=> {
    saveState(store.getState());
})

ReactDOM.render(
  <Provider store={store}>
    <Router>
    <MuiThemeProvider>

      <div>
        <div> 
        <NavBar/>
        </div>
        <Route exact={true} path="/" component={Home}/>
        <Route path="/LandLordView" component={LandLordView}/>
        <Route path="/RenterSignUp" component={SignUp}/>
        <Route path="/Renter" component={Renter}/>
        <Route path="/Contract" component={LandlordSignUp}/>
        <div>
        <Footer/>
        </div>
        </div>
    </MuiThemeProvider>
    </Router>
    
  </Provider>,
  document.getElementById('root')
)