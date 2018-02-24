import React, { Component } from 'react';
import { connect } from 'react-redux'
import {FormGroup, Label} from 'reactstrap';
import { Contractaddres, createContract } from "../actions/contract";
import { Link } from 'react-router-dom';
import {SendWeiAmount} from '../actions/renterAction'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const SendWei = ({dispatch, contract}) => {
    var divStyle = {
        margin: '20px'
      };
    let money;

    return (
        <div> 
            <TextField style={{width: '400px', marginLeft: '400px'}}
            hintText="Enter Value in Wei"  ref={node => { money = node }}
            /><br />
             <RaisedButton label="Send Value" style={{marginLeft: '525px', marginTop: '12px'}} 
            onClick={e => {
                dispatch(SendWeiAmount(contract, money.getValue()));
                money.getInputNode().value = '';
            }}/>
        </div>
    )
}

export default connect ()(SendWei);
