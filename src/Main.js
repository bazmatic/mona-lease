import React, { Component } from "react";
import logo from './monaleaseIcon.png';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
 
class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
        <div className="App">
        <header className="App-header">
          <img src={logo}/>
          <h1 className="App-title">Welcome to MonaLease</h1>
         </header>
         </div>

          <ul className="header">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/SignUp">SignUp</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/SignUp" component={SignUp}/>
          </div>
        </div>
      </HashRouter>
    );
    
  }
}
 
export default Main;