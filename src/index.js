import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

import Web3 from 'web3';
import contract from 'truffle-contract'
import Main from "./Main";


// Import our contract artifacts and turn them into usable abstractions.
//import monaLeaseArtifact from '../../build/contracts/MonaLease.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
//var MonaLeaseContract = contract(monaLeaseArtifact);


ReactDOM.render(
	<Main/>, 
	document.getElementById("root")
  );


