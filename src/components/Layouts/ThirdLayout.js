import React, { Component } from "react";

import FixedHeader from "./Headers/FixedHeader";

import FloatingFooter from "./Footers/FloatingFooter";
import Footer from "./Footers/footer";

// This Layouts used in Home page Header,  static footer and content

class FirstLayout extends Component {
  constructor(props) {
    super(props);

    // define states
  }

  render() {
    return (
      <div className="wrapper">
        <FixedHeader {...this.props.children.props} />
        <div>{React.cloneElement(this.props.children)}</div>
        <Footer />
      </div>
    );
  }
}
export default FirstLayout;
