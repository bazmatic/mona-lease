import React from 'react';

//=== RenterRow
//

class RenterRow extends React.Component {

  render() {

    return (
      <div className="RenterRow row">
        <div className="RenterCell RenterName col">
          {this.props.renter.name}
        </div>
        <div className="RenterCell RenterEmail col">
          {this.props.renter.email}
        </div>
        <div className="RenterCell RenterKey col">
          {this.props.renter.key}
        </div>
      </div>
    );
  }


}
export default RenterRow;
