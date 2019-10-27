import React, { Component } from "react";

class Logout extends Component {
  state = {};

  componentDidMount() {
    console.log("logout");
    // clear local storage
    localStorage.clear();

    window.location = "/";
  }

  render() {
    return <h1>You have been logout</h1>;
  }
}

export default Logout;
