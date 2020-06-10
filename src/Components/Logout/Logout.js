import React from "react";
import "./Logout.css";
import Spotify from "../../util/Spotify";

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
        LOG-OUT
      </button>
    );
  }
}

export default Logout;
