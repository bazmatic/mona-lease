import icon from '../img/nav.png'
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import IconButton from 'material-ui/IconButton';
import { Link, Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

function Nav ({dispatch, history}) {
  console.log(history);
  return (
  <div>
    <nav className="navbar navbar-light bg-faded">
    
      <img style={{margin: '10px'}}src={icon} width="50" height="50" className="d-inline-block align-top" 
      onClick={e =>{ history.push('/')}}/>
    
  </nav>
  
  </div>
  )
}

const NavC = withRouter(connect()(Nav))

export default NavC