import React, { Component } from "react";

import StaticFooter from "./Footers/StaticFooter";
import Footer from "./Footers/footer";

// This Layouts used in Home page Header,  static footer and content

class SixthLayout extends Component {
  constructor(props) {
    super(props);

    // define states
  }

  render() {
    return (
      <div className="wrapper">
        <div>{React.cloneElement(this.props.children)}</div>
        <Footer />
      </div>
    );
  }
}
export default SixthLayout;
