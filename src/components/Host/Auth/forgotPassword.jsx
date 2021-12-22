import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../../HostEnvironment";
import ToastDemo from "../../Helper/toaster";
import HostHelper from "../../Helper/hostHelper";
import { withToastManager } from "react-toast-notifications";

class HostForgotPassword extends HostHelper {
  state = {
    data: {
      email: "",
      password: "",
      device_type: "web"
    },
    loadingContent: null,
    buttonDisable: false
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loadingContent: "Loading... Please wait..",
      buttonDisable: true
    });
    api
      .postMethod("forgot_password", this.state.data)
      .then(response => {
        if (response.data.success === true) {
          window.location = "/host";
          ToastDemo(this.props.toastManager, response.data.message, "success");
          this.setState({ loadingContent: null, buttonDisable: false });
        } else {
          this.setState({ loadingContent: null, buttonDisable: false });
          ToastDemo(this.props.toastManager, response.data.error, "error");
        }
      })
      .catch(error => {
        this.setState({ loadingContent: null, buttonDisable: false });
      });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="page-content">
        <div className="prov-login">
          <div className="log-head">
            <h4>Reset Password</h4>
            <p>
              Enter the email address associated with your account, and we’ll
              email you a link to reset your password.
            </p>
          </div>
          <form className="top1 prov-login-form" onSubmit={this.handleSubmit}>
            <div className="form-group input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email Address"
                onChange={this.handleChange}
                name="email"
                value={data.email}
              />
            </div>
            <button
              className="green-btn bottom1 btn-block"
              disabled={this.state.buttonDisable}
              type="submit"
            >
              {this.state.loadingContent != null
                ? this.state.loadingContent
                : "send reset link"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withToastManager(HostForgotPassword);
