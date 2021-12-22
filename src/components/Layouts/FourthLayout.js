import React, { Component } from "react";

import StaticFooter from "./Footers/StaticFooter";
import FixedHeader from "./Headers/FixedHeader";
import Footer from "./Footers/footer";

// This Layouts used in Home page Header,  static footer and content

class FourthLayout extends Component {
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
export default FourthLayout;
