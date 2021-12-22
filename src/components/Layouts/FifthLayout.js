import React, { Component } from "react";

import RelativeHeader from "./Headers/RelativeHeader";

// This Layouts used in Home page Header,  static footer and content

class FifthLayout extends Component {
  constructor(props) {
    super(props);

    // define states
  }

  render() {
    return (
      <div className="wrapper">
        <RelativeHeader {...this.props.children} />
        <div>{React.cloneElement(this.props.children)}</div>
      </div>
    );
  }
}
export default FifthLayout;
