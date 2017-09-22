
/*
{
  "renters": {
    "items": [
      {
        "name": "string",
        "email": "string",
        "key": "string",
        "inDefault": false
      }
    ],
    "displayFilter": "string"
  }

}
*/

import React from 'react';
//import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'

import RenterList from './components/RenterList/RenterList'
import Web3 from 'web3'

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {

  static initialState() {
    return {
      "renters": {
        "items": [{name: "Bob", "email": "bob@example.org", "key": Math.random()}],
        "displayFilter": "all"
      }
    }
  }

  static reducer(state , action) {
    if (typeof(state) !== "object") {
      state = App.initialState();
    }
    var newRenters = RenterList.Reducer(state.renters, action);
    return {
      renters: newRenters
    }
  }

  constructor(props) {
    super(props);
    this.store = createStore(App.reducer);
    this.store.subscribe(props.subscriber);
    /*this.store.subscribe(()=>{
      console.log("Data change detected");
      this.render.bind(this)();//need to bind?
    });*/
  }

  render() {
    var myRenters = this.store.getState().renters;
    return (
      <div className="App">
          <h2>Welcome to Mona Leaser</h2>
          <RenterList store={this.store} renters={myRenters} />
      </div>
    );
  }
}
export default App;







