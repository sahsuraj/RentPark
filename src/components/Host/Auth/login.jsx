import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../../HostEnvironment";
import ToastDemo from "../../Helper/toaster";
import HostHelper from "../../Helper/hostHelper";
import { withToastManager } from "react-toast-notifications";

class HostLogin extends HostHelper {
  state = { loadingContent: null, buttonDisable: false };

  handleSubmit = event => {
    event.preventDefault();
    const { path } = this.props.location;
    this.setState({
      loadingContent: "Loading... Please wait..",
      buttonDisable: true
    });
    api
      .postMethod("login", this.state.data)
      .then(response => {
        if (response.data.success) {
          localStorage.setItem("hostId", response.data.data.provider_id);
          localStorage.setItem("accessToken", response.data.data.token);
          localStorage.setItem("hostLoginStatus", true);
          localStorage.setItem("host_picture", response.data.data.picture);
          localStorage.setItem("provider_name", response.data.data.username);

          window.location = path ? path.from.pathname : "/host/dashboard";
          // this.props.history.push("/host/dashbaord");
          ToastDemo(this.props.toastManager, response.data.message, "success");
          // window.locatiom = path
          //   ? this.props.history.push(path.from.pathname)
          //   : this.props.history.push("/home");
          // this.props.history.push("/home");
        } else {
          ToastDemo(this.props.toastManager, response.data.error, "error");
          this.setState({ loadingContent: null, buttonDisable: false });
        }
      })
      .catch(error => {
        this.setState({ loadingContent: null });
      });
  };

  render() {
    return (
      <div className="page-content">
        <div className="prov-login">
          <h1 className=""> Login </h1>
          <form className="top1 prov-login-form" onSubmit={this.handleSubmit}>
            <div className="form-group input-group">
              <input
                type="text"
                className="form-control"
                placeholder="email address"
                onChange={this.handleChange}
                name="email"
              />
            </div>
            <div className="form-group input-group">
              <input
                type="password"
                className="form-control"
                placeholder="password"
                onChange={this.handleChange}
                name="password"
              />
            </div>
            <button
              className="green-btn bottom1 block cmn-btn"
              disabled={this.state.buttonDisable}
            >
              {" "}
              {this.state.loadingContent != null
                ? this.state.loadingContent
                : "login"}
            </button>
            <Link
              to={"/host/forgot-password"}
              className="forgot-pass close-login"
            >
              forgot password?
            </Link>
          </form>

          <h4 className="m-0 text-center captalize">
            Don't have an account?{" "}
            <Link to={"/host/register"} className="bold-cls close-login">
              {" "}
              Sign up
            </Link>
          </h4>
        </div>
      </div>
    );
  }
}

export default withToastManager(HostLogin);
