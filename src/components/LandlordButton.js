import React from 'react';
import { connect } from 'react-redux'
import icon from '../img/Mona.png'
import 'bootstrap/dist/css/bootstrap.css';
import propertyManagement from '../img/propertymanagement.png';
import { Link, Redirect,withRouter } from 'react-router-dom';

let LandlordButton = ({history}) => (
    <div style={{display: 'inline-block',  marginLeft: '350px'}}>
      
      <button type="button" className="btn btn-outline-secondary" onClick={e =>{ history.push('/Contract')}}>Become a landlord</button>
    </div>
)

export default withRouter(connect ()(LandlordButton));
