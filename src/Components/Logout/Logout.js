import React from "react";
import "./Logout.css";

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }
  render() {
    return (
      <button className="logout" onClick={this.logout}>
        Log-Out
      </button>
    );
  }
}

export default Logout;
