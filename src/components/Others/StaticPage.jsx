import React, { Component } from "react";
import api from "../../../src/Environment";

import ToastDemo from "../Helper/toaster";
import { withToastManager } from "react-toast-notifications";

class StaticPage extends Component {
  state = {
    loading: true,
    data: null
  };

  componentDidMount() {
    api
      .postMethod("static_pages_web", {
        unique_id: this.props.match.params.id
      })
      .then(response => {
        this.setState({
          loading: false,
          data: response.data.data
        });
      });
  }

  render() {
    return (
      <div>
        <div className="main">
          <div className="site-content">
            <div className="top-bottom-spacing">
              <div className="row">
                <h1>{this.state.data ? this.state.data.title : "-"}</h1>
              </div>
              <div className="row">
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.data ? this.state.data.description : "-"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(StaticPage);
