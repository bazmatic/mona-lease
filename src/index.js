import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

import Web3 from 'web3';
import contract from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import monaLeaseArtifact from '../../build/contracts/MonaLease.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var MonaLeaseContract = contract(monaLeaseArtifact);


function renderApp() {
	ReactDOM.render(
	  <App subscriber={onStoreChange} />,
	  document.getElementById('root')
	);	
}

function onStoreChange() {
	renderApp(this);
}
renderApp(onStoreChange);



