import React, { Component } from 'react';
import { connect } from 'react-redux'
import {FormGroup, Label} from 'reactstrap';
import { createRenter } from "../actions/renterAction";
import { Link, withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const RenterSignUp = ({dispatch, history, contract}) => {
    let name, email;
    return (
        
    <div style={{margin:'150px'}}>
     
    <TextField style={{width: '400px', marginLeft: '400px'}}
      hintText="Enter Your Name"  ref={node => { name = node }}
    /><br />

    <TextField style={{width: '400px',  marginLeft: '400px'}}
      hintText="Enter Your Email"  ref={node => { email = node }}
    /><br />


   <RaisedButton label="Become A Renter" style={{marginLeft: '525px', marginTop: '12px'}} 
   onClick={e => {
    dispatch(createRenter(contract, name.getValue(), email.getValue()));
    name.getInputNode().value = '';
    email.getInputNode().value = '';
    history.push('/Renter')
    }}/>
  </div>
    )
}

export default withRouter(connect ()(RenterSignUp));
