import React, { Component } from "react";
import HostProfileSideBar from "./hostProfileSideBar";
import HostHelper from "../../Helper/hostHelper";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";
import api from "../../../HostEnvironment";

class HostPhoto extends HostHelper {
  state = {
    data: null,
    loading: true,
    inputData: [],
    imagePreviewUrl: null,
    profileUpdateStatusContent: null,
    loadingContent: null,
    buttonDisable: false
  };

  componentDidMount() {
    this.getHostDetails();
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
        localStorage.setItem("host_picture", response.data.data.picture);
      } else {
        ToastDemo(this.props.toastManager, response.data.error, "error");
        this.setState({ loadingContent: null, buttonDisable: false });
      }
    });
  };
  render() {
    const { data, loading, imagePreviewUrl } = this.state;
    return (
      <div className="main">
        <div className="site-content">
          <div className="top-bottom-spacing">
            <div className="row">
              <HostProfileSideBar />
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
                <form onSubmit={this.handleSubmit}>
                  {loading ? (
                    "Loading.."
                  ) : (
                    <div className="panel">
                      <div className="panel-heading">profile Hostphoto </div>
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
                              Clear frontal face Hostphotos are an important way
                              for hosts and guests to learn about. It’s not much
                              fun to host a landscape! Be sure to use a
                              Hostphoto that clearly shows your face and doesn’t
                              include any personal or sensitive info you’d
                              rather not have hosts or guests see.
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

export default withToastManager(HostPhoto);
