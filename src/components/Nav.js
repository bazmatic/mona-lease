import icon from '../img/nav.png'
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

function Nav ({dispatch, history}) {
  return (
  <div>
    <nav className="navbar navbar-light bg-faded">
    
      <img style={{margin: '10px'}}src={icon} width="50" height="50" className="d-inline-block align-top" alt=""
      onClick={e =>{ history.push('/')}}/>
    
  </nav>
  
  </div>
  )
}

const NavC = withRouter(connect()(Nav))

export default NavC