import React, { Component } from "react";
import HostFooter from "./hostFooter";
import HostAuthHeader from "./hostAuthHeader";

// This Layouts used in Home page Header,  static footer and content

class HostAuthLayout extends Component {
  constructor(props) {
    super(props);

    // define states
  }

  render() {
    return (
      <div className="wrapper">
        <HostAuthHeader {...this.props.children.props} />
        <div>{React.cloneElement(this.props.children)}</div>
        <HostFooter />
      </div>
    );
  }
}
export default HostAuthLayout;
