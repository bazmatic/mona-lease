import React, { Component } from "react";
 
class SignUp extends Component {
  render() {
    return (
      <div>
        <h2>Enter Renter Details</h2>
        <form>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <label>
                Email:
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
 
export default SignUp;