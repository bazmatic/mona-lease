import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Contractaddres } from "../actions/contract";
import { withRouter } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const TextFieldExampleSimple = ({dispatch, history}) => {
    let name, amount, interval, address;
    console.log(history)

    return (
        
    <div style={{margin:'150px'}}>
     
    <TextField style={{width: '400px', marginLeft: '400px'}}
      hintText="Enter Name of the property"  ref={node => { name = node }}
    /><br />

    <TextField style={{width: '400px',  marginLeft: '400px'}}
      hintText="Enter The Rent Interval"  ref={node => { interval = node }}
    /><br />

    <TextField style={{width: '400px',  marginLeft: '400px'}}
      hintText="Enter The Rent Amount in AUD"  ref={node => { amount = node }}
    /><br />
    <TextField style={{width: '400px',  marginLeft: '400px'}}
      hintText="Enter the Oracle ID"  ref={node => { address = node }}
    /><br />
   <RaisedButton label="Create Contract" style={{marginLeft: '525px', marginTop: '12px'}} 
   onClick={e => {
     console.log(history)
    dispatch(Contractaddres(name.getValue(), interval.getValue(), amount.getValue(), address.getValue()));
    name.getInputNode().value = '';
    address.getInputNode().value = '';
    amount.getInputNode().value = '';
    interval.getInputNode().value = '';
    e.preventDefault();
    history.push('/LandLordView')
    }}/>
  </div>
    )
}

const Contract = withRouter(connect()(TextFieldExampleSimple))

export default Contract;
