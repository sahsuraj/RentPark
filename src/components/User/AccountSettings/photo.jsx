import React, { Component } from "react";
import ProfileSideBar from "../../Helper/profileSideBar";
import Helper from "../../Helper/Helper";
import { Redirect } from "react-router-dom";
import api from "../../../Environment";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";

class Photo extends Helper {
  state = {
    data: null,
    loading: true,
    profileError: null,
    inputData: [],
    imagePreviewUrl: null,
    profileUpdateStatusContent: null,
    loadingContent: null,
    buttonDisable: false
  };

  componentDidMount() {
    this.getUserDetails();
  }
  handleChange = ({ currentTarget: input }) => {
    const inputData = { ...this.state.inputData };
    if (input.type === "file") {
      inputData[input.name] = input.files[0];
      this.setState({ inputData });
    }
    let reader = new FileReader();
    let file = input.files[0];

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loadingContent: "Loading... Please wait..",
      buttonDisable: true
    });
    const inputData = { ...this.state.inputData };
    inputData["name"] = this.state.data.username;
    inputData["email"] = this.state.data.email;
    this.setState({ inputData });
    api.postMethod("update_profile", inputData).then(response => {
      if (response.data.success) {
        ToastDemo(this.props.toastManager, response.data.message, "success");
        this.setState({ loadingContent: null, buttonDisable: false });
        localStorage.setItem("user_picture", response.data.data.picture);
      } else {
        ToastDemo(this.props.toastManager, response.data.error, "error");
        this.setState({ loadingContent: null, buttonDisable: false });
      }
    });
  };

  render() {
    const { data, loading, profileError, imagePreviewUrl } = this.state;
    if (profileError != null) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { error: profileError }
          }}
        />
      );
    }
    return (
      <div className="main">
        <div className="site-content">
          <div className="top-bottom-spacing">
            <div className="row">
              <ProfileSideBar />
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
                <form onSubmit={this.handleSubmit}>
                  {loading ? (
                    "Loading.."
                  ) : (
                    <div className="panel">
                      <div className="panel-heading">profile photo </div>
                      <div className="panel-body account">
                        <div className="media user-profile-sec">
                          <img
                            src={
                              imagePreviewUrl ? imagePreviewUrl : data.picture
                            }
                            alt={data.username}
                            className="mr-3 rounded-circle user-profile-img"
                          />
                          <div className="media-body">
                            <h4>
                              Clear frontal face photos are an important way for
                              hosts and guests to learn about eimport {Redirect}{" "}
                              from 'react-router-dom'; ach other. It’s not much
                              fun to host a landscape! Be sure to use a photo
                              that clearly shows your face and doesn’t include
                              any personal or sensitive info you’d rather not
                              have hosts or guests see.
                            </h4>
                            <input
                              type="file"
                              name="picture"
                              className="grey-outline-btn bold-cls w-100 text-center bottom"
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-8 offset-3 text-center">
                          <button
                            className="green-btn btn-block mb-5"
                            type="submit"
                            disabled={this.state.buttonDisable}
                          >
                            {this.state.loadingContent != null
                              ? this.state.loadingContent
                              : "Submit"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(Photo);
