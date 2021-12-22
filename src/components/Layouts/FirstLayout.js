import React, { Component } from "react";

import HomeHeader from "./Headers/HomeHeader";

import Footer from "./Footers/footer";

// This Layouts used in Home page Header,  floating footer and content

class FirstLayout extends Component {
  constructor(props) {
    super(props);

    // define states

    this.eventEmitter = this.props.screenProps;
  }

  render() {
    return (
      <div className="wrapper">
        <HomeHeader {...this.props.children.props} />
        <div>
          {React.cloneElement(this.props.children, {
            eventEmitter: this.eventEmitter
          })}
        </div>
        <Footer />
      </div>
    );
  }
}
export default FirstLayout;
