import React, { Component } from "react";

import HomeHeader from "./Headers/HomeHeader";

import StaticFooter from "./Footers/StaticFooter";
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
        <HomeHeader />
        <div>{React.cloneElement(this.props.children)}</div>
        <Footer />
      </div>
    );
  }
}
export default FirstLayout;
