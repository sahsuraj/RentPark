import React, { Component } from "react";

import FixedHeaderWithSection from "./Headers/FixedHeaderWithSection";

import FloatingFooter from "./Footers/FloatingFooter";
import Footer from "./Footers/footer";

// This Layouts used in Home page Header,  static footer and content

class SeventhLayout extends Component {
  constructor(props) {
    super(props);

    // define states
  }

  render() {
    return (
      <div className="wrapper">
        <FixedHeaderWithSection {...this.props.children} />
        <div>{React.cloneElement(this.props.children)}</div>
        <Footer />
      </div>
    );
  }
}
export default SeventhLayout;
