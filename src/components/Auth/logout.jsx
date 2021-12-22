import React, { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userLoginStatus");
    localStorage.removeItem("user_picture");
    localStorage.removeItem("username");
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
