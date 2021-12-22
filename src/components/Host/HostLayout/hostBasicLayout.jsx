import React, { Component } from "react";

// This Layouts used in Home page Header,  static footer and content

class HostBasicLayout extends Component {
  constructor(props) {
    super(props);

    // define states
  }

  render() {
    return (
      <div className="wrapper">
        <div>{React.cloneElement(this.props.children)}</div>
      </div>
    );
  }
}
export default HostBasicLayout;
