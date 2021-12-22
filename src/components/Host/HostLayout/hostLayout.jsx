import React, { Component } from "react";
import HostHeader from "./hostHeader";
import HostFooter from "./hostFooter";

// This Layouts used in Home page Header,  static footer and content

class HostLayout extends Component {
  constructor(props) {
    super(props);

    // define states
  }

  render() {
    return (
      <div className="wrapper">
        <HostHeader {...this.props.children.props} />
        <div>{React.cloneElement(this.props.children)}</div>
        <HostFooter />
      </div>
    );
  }
}
export default HostLayout;
