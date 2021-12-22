import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ProfileSideBar from "../../Helper/profileSideBar";
import ProfileInput from "../../Helper/profileInput";
import Helper from "../../Helper/Helper";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";
import api from "../../../Environment";
import configuration from "react-global-configuration";

class EditProfile extends Helper {
    constructor(props) {
        super(props);

        // States and props usage
    }

    state = {
        data: null,
        loading: true,
        profileError: null,
        profileUpdateStatusContent: null,
        loadingContent: null,
        buttonDisable: false
    };

    componentDidMount() {
        this.getUserDetails();
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            loadingContent: "Loading... Please wait..",
            buttonDisable: true
        });

        let userDetails = { ...this.state.data };
        const data = {
            name: userDetails.name,
            description: userDetails.description,
            email: userDetails.email,
            mobile: userDetails.mobile
        };
        api.postMethod("update_profile", data).then(response => {
            if (response.data.success) {
                ToastDemo(
                    this.props.toastManager,
                    response.data.message,
                    "success"
                );
                this.setState({ loadingContent: null, buttonDisable: false });
            } else {
                ToastDemo(
                    this.props.toastManager,
                    response.data.error,
                    "error"
                );
                this.setState({ loadingContent: null, buttonDisable: false });
            }
        });
    };

    render() {
        const { data, loading, profileError } = this.state;

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
                                    <div className="panel">
                                        <div className="panel-heading">
                                            required
                                        </div>

                                        <div className="panel-body  account">
                                            <ProfileInput
                                                label="Name"
                                                type="text"
                                                placeholder=""
                                                id="fname"
                                                name="name"
                                                value={
                                                    loading
                                                        ? "Loading"
                                                        : data.name
                                                }
                                                onChange={this.handleChange}
                                                description=""
                                            />

                                            <ProfileInput
                                                label="email address"
                                                type="text"
                                                placeholder=""
                                                id="email"
                                                name="email"
                                                value={
                                                    loading
                                                        ? "Loading"
                                                        : data.email
                                                }
                                                onChange={this.handleChange}
                                                description="We won’t share your private email address with other users."
                                            />

                                            <ProfileInput
                                                label="phone number"
                                                type="text"
                                                placeholder=""
                                                id="number"
                                                name="mobile"
                                                value={
                                                    loading
                                                        ? "Loading"
                                                        : data.mobile
                                                }
                                                onChange={this.handleChange}
                                                description="This is only shared once you have a confirmed
                        booking with another user. This is how we can
                        all get in touch."
                                            />

                                            <div className="form-group row">
                                                <div className="col-3 text-right">
                                                    <label>
                                                        describe yourself
                                                    </label>
                                                </div>
                                                <div className="col-9">
                                                    <textarea
                                                        type="text"
                                                        className="form-control"
                                                        rows="4"
                                                        name="description"
                                                        value={
                                                            loading
                                                                ? "Loading"
                                                                : data.description
                                                        }
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                    />
                                                    <h5 className="profile-note">
                                                        {configuration.get(
                                                            "configData.site_name"
                                                        )}{" "}
                                                        is built on
                                                        relationships. Help
                                                        other people get to know
                                                        you.
                                                    </h5>

                                                    <h5 className="profile-note">
                                                        Tell them about the
                                                        things you like: What
                                                        are 5 things you can’t
                                                        live without? Share your
                                                        favorite travel
                                                        destinations, books,
                                                        movies, shows, music,
                                                        food
                                                    </h5>

                                                    <h5 className="profile-note">
                                                        Tell them what it’s like
                                                        to have you as a guest
                                                        or host: What’s your
                                                        style of traveling? Of{" "}
                                                        {configuration.get(
                                                            "configData.site_name"
                                                        )}
                                                        hosting?
                                                    </h5>

                                                    <h5 className="profile-note">
                                                        Tell them about you: Do
                                                        you have a life motto?
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-9 offset-3 text-center">
                                                    <button
                                                        className="green-btn btn-block"
                                                        id="saveButton"
                                                        disabled={
                                                            this.state
                                                                .buttonDisable
                                                        }
                                                    >
                                                        {this.state
                                                            .loadingContent !=
                                                        null
                                                            ? this.state
                                                                  .loadingContent
                                                            : "save"}
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

export default withToastManager(EditProfile);
