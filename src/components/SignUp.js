import React, { Component } from 'react';
import { connect } from 'react-redux'
import {FormGroup, Label} from 'reactstrap';
import { createRenter } from "../actions/renterAction";
import { Link, withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Web3 from 'web3'
import axios from 'axios';

const RenterSignUp = ({dispatch, history, contract, account}) => {
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

    var content = 'Dear ' + name.getValue() + '\n\nYou have signed a lease with the contract address ' + contract + '. \n\n\n' +
    ' We have provided you, with the following' + ' personal url: ' + 'localhost/Renter/'+contract+'/'+account + 
    '. \n\n\nPlease Make sure you are using the following account on MetaMask: ' 
    + account + '\n\n Thanks,\n\nMonaLease Team';

    axios.post('http://localhost:3002/send', {
      subject: ['Welcome to MonaLease - You have Signed Contract: ' + contract],   
      email: [email.getValue()],  
      message: [content]
    })
    .catch(function (error) {
      console.log(error.response.data);
    });

    dispatch(createRenter(contract, name.getValue(), email.getValue()));
    history.push('/Renter/'+contract+'/'+account);
    
    name.getInputNode().value = '';
    email.getInputNode().value = '';
    }}/>
  </div>
    )
}

export default withRouter(connect ()(RenterSignUp));
