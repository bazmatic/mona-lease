import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

let Footerstyle = {position: 'fixed', left: '0', bottom: '0', width: '100%', backgroundColor: 'gray', textAlign: 'center', color: 'silver'};

let Footer = () => (
  <div>
    <footer style={Footerstyle}>

    <div className="footer">
        <div className="container-fluid">
            <p ><em>© 2018 Copyright Monalease</em></p>
        </div>
    </div>

</footer>
  </div>
)

export default Footer