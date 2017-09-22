import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


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

//App.store.subscribe(renderApp);

//registerServiceWorker();
