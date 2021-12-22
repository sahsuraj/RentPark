import React, { Component } from "react";
import HostProfileSideBar from "./hostProfileSideBar";
import HostHelper from "../../Helper/hostHelper";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";
import api from "../../../HostEnvironment";

class HostDocumentVerification extends HostHelper {
  state = {
    data: null,
    loading: true,
    inputData: [],
    imagePreviewUrl: [],
    profileUpdateStatusContent: null,
    loadingContent: null,
    buttonDisable: false,
    getDocumentData: null,
    loadingDocument: true,
    identityVerificationImage: null
  };

  componentDidMount() {
    this.getHostDetails();
    this.getDocumentDetails();
  }

  getDocumentDetails = () => {
    api.postMethod("documents").then(response => {
      if (response.data.success) {
        this.setState({
          getDocumentData: response.data.data,
          loadingDocument: false
        });
      } else {
        ToastDemo(this.props.toastManager, response.data.error, "error");
      }
    });
  };
  changeDocumentImage = (event, document_id) => {
    const inputData = { ...this.state.inputData };
    // console.log("event", event);
    if (event.currentTarget.type === "file") {
      inputData["document_url"] = event.currentTarget.files[0];
      this.setState({ inputData });
    }
    let reader = new FileReader();
    let file = event.currentTarget.files[0];
    const imagePreviewUrl = { ...this.state.imagePreviewUrl };
    reader.onloadend = () => {
      imagePreviewUrl[document_id] = reader.result;
      this.setState({
        imagePreviewUrl
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  handleChange = ({ currentTarget: input }) => {
    this.setState({ inputData: [] });
    const inputData = { ...this.state.inputData };
    if (input.type === "file") {
      inputData["document_url"] = input.files[0];
      this.setState({ inputData });
    }
    let reader = new FileReader();
    let file = input.files[0];

    reader.onloadend = () => {
      this.setState({
        identityVerificationImage: reader.result
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  documentUploadAPICall = inputData => {
    api.postMethod("documents_upload", inputData).then(response => {
      if (response.data.success) {
        ToastDemo(this.props.toastManager, response.data.message, "success");
        this.setState({ loadingContent: null, buttonDisable: false });
      } else {
        ToastDemo(this.props.toastManager, response.data.error, "error");
        this.setState({ loadingContent: null, buttonDisable: false });
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loadingContent: "Loading... Please wait..",
      buttonDisable: true
    });
    const inputData = { ...this.state.inputData };
    inputData["type"] = "identity";
    this.setState({ inputData });
    this.documentUploadAPICall(inputData);
  };

  uploadDocumentVerification = (event, document_id) => {
    event.preventDefault();
    this.setState({
      loadingContent: "Loading... Please wait..",
      buttonDisable: true
    });
    const inputData = { ...this.state.inputData };
    inputData["document_id"] = document_id;
    this.setState({ inputData });
    this.documentUploadAPICall(inputData);
  };

  render() {
    const {
      data,
      loading,
      imagePreviewUrl,
      getDocumentData,
      loadingDocument,
      identityVerificationImage
    } = this.state;
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
                      <div className="panel-heading text-uppercase">
                        Identity Verification { data.identity_verification_file != "" ? <i className="fa fa-check-circle text-success"></i> : "" }
                      </div>
                      <div className="panel-body account">
                        <div className="media user-profile-sec">
                          <img
                            src={
                              identityVerificationImage
                                ? identityVerificationImage
                                : data.identity_verification_file != ""
                                ? data.identity_verification_file
                                : data.identity_verification_preview
                            }
                            alt={data.username}
                            className="mr-3 document-img"
                          />
                          <div className="media-body">
                            <h4>
                              Clear frontal face Hostphotos are an important way
                              for hosts and guests to learn about.
                            </h4>
                            <input
                              type="file"
                              name="picture"
                              className="grey-outline-btn bold-cls w-100 text-center bottom"
                              onChange={this.handleChange}
                            />
                            <button
                            className="green-btn mb-5"
                            type="submit"
                            disabled={this.state.buttonDisable}
                          >
                            {this.state.loadingContent != null
                              ? this.state.loadingContent
                              : "Upload"}
                          </button>
                          </div>
                        </div>
                        
                      </div>
                      
                    </div>
                  )}
                </form>

                {loadingDocument
                  ? "Loading..."
                  : getDocumentData.map(documents => (
                      <form>
                        {loading ? (
                          "Loading..."
                        ) : (
                          <div className="panel">
                            <div className="panel-heading">
                              {documents.document_name} { documents.provider_document_id != 0 ? <i className="fa fa-check-circle text-success"></i> : "" }
                            </div>
                            <div className="panel-body account">
                              <div className="media user-profile-sec">
                                <img
                                  src={
                                    imagePreviewUrl[documents.document_id] !=
                                    undefined
                                      ? imagePreviewUrl[documents.document_id]
                                      : documents.provider_document_id != 0
                                      ? documents.document_url
                                      : documents.preview
                                  }
                                  alt={data.username}
                                  className="mr-3 document-img"
                                />
                                <div className="media-body">
                                  <h4>{documents.document_description}</h4>
                                  <input
                                    type="file"
                                    name="picture"
                                    className="grey-outline-btn bold-cls w-100 text-center bottom"
                                    onChange={event =>
                                      this.changeDocumentImage(
                                        event,
                                        documents.document_id
                                      )
                                    }
                                  />
                                  <button
                                  className="green-btn mb-5"
                                  type="submit"
                                  disabled={this.state.buttonDisable}
                                  onClick={event =>
                                    this.uploadDocumentVerification(
                                      event,
                                      documents.document_id
                                    )
                                  }
                                >
                                  {this.state.loadingContent != null
                                    ? this.state.loadingContent
                                    : "Upload"}
                                </button>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-8 offset-3 text-center">
                                
                              </div>
                            </div>
                          </div>
                        )}
                      </form>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(HostDocumentVerification);
