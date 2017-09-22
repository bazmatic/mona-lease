import React from 'react';
import RenterRow from '../RenterRow/RenterRow';

//=== RenterList
//

class RenterList extends React.Component {

  render() {
    const renterElements = this.props.renters.items.map((item) => <RenterRow key={item.key} renter={item} />);
    return (
      <div className="RenterList">
        <button type="button" className="btn btn-primary" onClick={this.addRenterEvt.bind(this)}>Sign up</button>
        {renterElements}
      </div>
    );
  }
  addRenterEvt(e) {
    this.props.store.dispatch(
      {
        type: ActionTypes.ADD_RENTER,
        data: {
          name: "New Renter",
          email: "newrenter@example.org",
          key: Math.random()
        }
      }
    )
  }

  static Reducer(state, action) {
    if (action.type === ActionTypes.ADD_RENTER) {
      return {...state,  items: state.items.concat([action.data]) };
    }
    else return state;
  }

}
export default RenterList;

const ActionTypes = {
  ADD_RENTER: "addRenter"
}
