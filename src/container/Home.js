import React from 'react';
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import propertyManagement from '../img/propertymanagement.png';
import { withRouter } from 'react-router-dom';
import LandlordButton from '../components/LandlordButton'
import RenterButtons from '../components/RenterButton'

let PropertyIcon = () => (
  <div style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%'}}>
      <img style={{margin: '10px'}}src={propertyManagement} width="100" height="200" className="d-inline-block align-top" alt=""/>
  </div>
)

let Monalease = () => (
  <div style={{margin: '60px', alignContent: 'center'}}className="container-fluid"> 
           <h1 style={{textAlign: 'center'}}className="h2">Monalease</h1>
           <p style={{fontSize: '15px', marginLeft: '50px'}}className="lead"><em>
           MonaLEASE is a Decentralised Application (Dapp) that manages rental payments for the code cave property.
           This is the <span className="h6">first Dapp in the world to manage rental payments</span>. Be the first to join! 
          </em></p>
    </div>
)

let App = ({history}) => (
    
    <div> 
      <Monalease/>
      <div style = {{margin: '50px'}}>
        <RenterButtons />
        <LandlordButton/>
      </div>
      <div style={{marginLeft: '400px'}}>
        <PropertyIcon/>
      </div>
    </div>
)
export default withRouter(connect ()(App));







