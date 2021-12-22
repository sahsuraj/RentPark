import React, { Component } from "react";
import api from "../../../HostEnvironment";
import { Link } from "react-router-dom";
import Loader from "../../Helper/Loader";
import HostHelper from "../../Helper/hostHelper";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";

class HostGallery extends Component {
  state = {
    loading: true,
    gallery: null,
    host_details: null,
    files: [],
    loadingContent: null,
    buttonDisable: false,
    hostId: null
  };
  componentDidMount() {
    this.setState({ hostId: this.props.match.params.id });
    this.getGalleryApiCall(this.props.match.params.id);
  }
  getGalleryApiCall = hostId => {
    api
      .postMethod("hosts_galleries", { host_id: hostId })
      .then(response => {
        if (response.data.success === true) {
          this.setState({
            loading: false,
            gallery: response.data.data.galleries,
            host_details: response.data.data.host_details
          });
        } else {
          ToastDemo(this.props.toastManager, response.data.error, "error");
        }
      })
      .catch(function(error) {});
  };
  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    this.getGalleryApiCall(this.state.hostId);
  }

  handleChange = ({ currentTarget: input }) => {
    // this.setState({ files: [...this.state.files, ...input.files] });

    this.setState({ files: input.files[0] });
  };

  uploadImages = event => {
    event.preventDefault();
    this.setState({
      loadingContent: "Loading... Please wait..",
      buttonDisable: true
    });

    api
      .postMethod("hosts_upload_files", {
        host_id: this.props.match.params.id,
        file: this.state.files
      })
      .then(response => {
        if (response.data.success === true) {
          ToastDemo(this.props.toastManager, response.data.message, "success");
          this.setState({ loadingContent: null, buttonDisable: false });
        } else {
          ToastDemo(this.props.toastManager, response.data.error, "error");
          this.setState({ loadingContent: null, buttonDisable: false });
        }
      })
      .catch(function(error) {});
  };
  deleteImage = (event, host_gallery_id) => {
    event.preventDefault();
    api
      .postMethod("hosts_remove_files", {
        host_id: this.props.match.params.id,
        host_gallery_id: host_gallery_id
      })
      .then(response => {
        if (response.data.success === true) {
          ToastDemo(this.props.toastManager, response.data.message, "success");
        } else {
          ToastDemo(this.props.toastManager, response.data.error, "error");
        }
      })
      .catch(function(error) {});
  };
  render() {
    const { loading, gallery } = this.state;
    return (
      <div className="main">
        <div className="site-content">
          <div className="top-bottom-spacing">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <form onSubmit={this.uploadImages}>
                  <div className="panel">
                    <div className="panel-heading">
                      Add photos to your listing
                      <Link className="float-right" to={"/host/spaces"}>
                        <i className="fas fa-chevron-left" /> Back
                      </Link>
                    </div>
                    <div className="panel-body account">
                      <div className="row">
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                          <div className="media user-profile-sec">
                            <div className="media-body">
                              <h2>
                                {loading
                                  ? "Loading..."
                                  : this.state.host_details
                                  ? this.state.host_details.host_name
                                  : ""}
                              </h2>
                              <h4>
                                Photos help guests imagine staying in your
                                place. You can start with one and add more after
                                you publish.
                              </h4>
                              <input
                                type="file"
                                name="picture"
                                onChange={this.handleChange}
                                multiple
                                className="grey-outline-btn bold-cls w-100 text-center bottom"
                              />
                            </div>
                          </div>

                          <button
                            className="pink-btn btn-block"
                            type="submit"
                            disabled={this.state.buttonDisable}
                          >
                            {this.state.loadingContent != null
                              ? this.state.loadingContent
                              : "Submit"}
                          </button>
                        </div>

                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                          <p>Image Preview</p>
                          <div className="row">
                            {loading
                              ? "Loading..."
                              : this.state.gallery.map(image => (
                                  <div className="col-md-4">
                                    <div className="wishlist-img-sec">
                                      <img
                                        src={image.picture}
                                        alt="image"
                                        className="homes-img"
                                      />
                                    </div>
                                    {/* <img
                                      src={image.picture}
                                      alt="Hello"
                                      className="mr-3 mb-1 user-profile-img"
                                    /> */}
                                    <div className="wishlist-icon-sec">
                                      <div className="wishlist-icon">
                                        <Link
                                          to={"#"}
                                          onClick={event =>
                                            window.confirm("Are you sure?") &&
                                            this.deleteImage(
                                              event,
                                              image.host_gallery_id
                                            )
                                          }
                                        >
                                          <i className="fas fa-trash pink-clr" />
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                          </div>
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

export default withToastManager(HostGallery);
