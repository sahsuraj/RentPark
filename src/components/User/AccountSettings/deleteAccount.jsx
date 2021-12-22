import React, { Component } from "react";
import ProfileSideBar from "../../Helper/profileSideBar";
import ProfileInput from "../../Helper/profileInput";
import api from "../../../Environment";
import Helper from "../../Helper/Helper";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";

class DeleteAccount extends Helper {
  state = {
    data: {},
    loadingContent: null,
    buttonDisable: false
  };

  handleDelete = event => {
    event.preventDefault();
    this.setState({
      loadingContent: "Loading... Please wait..",
      buttonDisable: true
    });
    api.postMethod("delete_account", this.state.data).then(response => {
      if (response.data.success === true) {
        ToastDemo(this.props.toastManager, response.data.message, "success");

        this.setState({ loadingContent: null, buttonDisable: false });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userLoginStatus");
        localStorage.removeItem("user_picture");
        localStorage.removeItem("username");
        window.location = "/";
      } else {
        ToastDemo(this.props.toastManager, response.data.error, "error");
        this.setState({ loadingContent: null, buttonDisable: false });
      }
    });
  };
  render() {
    return (
      <div className="main">
        <div className="site-content">
          <div className="top-bottom-spacing">
            <div className="row">
              <ProfileSideBar />
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
                <form onSubmit={this.handleDelete}>
                  <div className="panel">
                    <div className="panel-heading">delete account</div>
                    <div className="panel-body account">
                      <h2 className="mt-0 medium-cls bottom">
                        Sorry to see you go
                      </h2>

                      <ProfileInput
                        label="old password"
                        type="password"
                        placeholder=""
                        id="old-pass"
                        name="password"
                        value={this.state.data.password}
                        onChange={this.handleChange}
                        description="Once your account is deleted, you will lose your
                        account and review details."
                      />

                      <div className="row">
                        <div className="col-9 offset-3 text-center">
                          <button
                            className="green-btn btn-block"
                            disabled={this.state.buttonDisable}
                          >
                            {this.state.loadingContent != null
                              ? this.state.loadingContent
                              : "submit"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(DeleteAccount);
