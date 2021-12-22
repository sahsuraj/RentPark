import React, { Component } from "react";
import InputField from "../Helper/inputfield";
import Helper from "../Helper/Helper";
import api from "../../Environment";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../Helper/toaster";
import { Link } from "react-router-dom";

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import configuration from "react-global-configuration";

const $ = window.$;

class Register extends Helper {
    state = {
        data: {
            name: "",
            email: "",
            password: "",
            device_type: "web",
            device_token: "123466",
            login_by: "manual",
            agree: 0
        },
        loadingContent: null,
        buttonDisable: false
    };

    responseGoogle = response => {
        const { path } = this.props.location;
        const googleLoginInput = {
            social_unique_id: response.profileObj.googleId,
            login_by: "google",
            email: response.profileObj.email,
            name: response.profileObj.name,
            picture: response.profileObj.imageUrl,
            device_type: "web",
            device_token: "123466"
        };
        api.postMethod("register", googleLoginInput)
            .then(response => {
                if (response.data.success === true) {
                    localStorage.setItem("userId", response.data.data.user_id);
                    localStorage.setItem(
                        "accessToken",
                        response.data.data.token
                    );
                    localStorage.setItem("userLoginStatus", true);
                    localStorage.setItem(
                        "user_picture",
                        response.data.data.picture
                    );

                    window.location = path ? path.from.pathname : "/home";
                    ToastDemo(
                        this.props.toastManager,
                        response.data.message,
                        "success"
                    );
                    this.setState({
                        loadingContent: null,
                        buttonDisable: false
                    });
                } else {
                    this.setState({
                        loadingContent: null,
                        buttonDisable: false
                    });
                    ToastDemo(
                        this.props.toastManager,
                        response.data.error,
                        "error"
                    );
                }
            })
            .catch(error => {
                this.setState({ loadingContent: null, buttonDisable: false });
            });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { path } = this.props.location;

        if (this.state.data.agree != 1) {
            this.setState({
                loadingContent: null,
                buttonDisable: false
            });
            ToastDemo(
                this.props.toastManager,
                "Please click the agree box",
                "error"
            );
        } else {
            this.setState({
                loadingContent: "Loading... Please wait..",
                buttonDisable: true
            });
            api.postMethod("register", this.state.data)
                .then(response => {
                    if (response.data.success === true) {
                        localStorage.setItem(
                            "userId",
                            response.data.data.user_id
                        );
                        localStorage.setItem(
                            "accessToken",
                            response.data.data.token
                        );
                        localStorage.setItem("userLoginStatus", true);

                        window.location = path ? path.from.pathname : "/home";
                        ToastDemo(
                            this.props.toastManager,
                            response.data.message,
                            "success"
                        );
                        this.setState({
                            loadingContent: null,
                            buttonDisable: false
                        });
                        // window.locatiom = path
                        //   ? this.props.history.push(path.from.pathname)
                        //   : this.props.history.push("/home");
                        // this.props.history.push("/home");
                    } else {
                        ToastDemo(
                            this.props.toastManager,
                            response.data.error,
                            "error"
                        );
                        // $("#signup").modal("hide");
                        this.setState({
                            loadingContent: null,
                            buttonDisable: false
                        });
                    }
                })
                .catch(function(error) {});
        }
    };

    render() {
        const { data } = this.state;
        return (
            <div>
                <div className="modal fade auth" id="signup">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    id="close-signup"
                                    data-dismiss="modal"
                                >
                                    <i className="material-icons">close</i>
                                </button>
                            </div>

                            <div
                                className="modal-body"
                                onSubmit={this.handleSubmit}
                            >
                                <h1 className="section-head">
                                    welcome to{" "}
                                    {configuration.get("configData.site_name")}
                                </h1>
                                <form className="top1">
                                    <InputField
                                        type="text"
                                        name="name"
                                        onChange={this.handleChange}
                                        placeholder="name"
                                        iconClassName="fas fa-lock"
                                        value={data.name}
                                    />

                                    <InputField
                                        type="text"
                                        name="email"
                                        onChange={this.handleChange}
                                        placeholder="email"
                                        iconClassName="fas fa-envelope"
                                        value={data.email}
                                    />

                                    <InputField
                                        type="password"
                                        name="password"
                                        onChange={this.handleChange}
                                        placeholder="password"
                                        iconClassName="fas fa-lock"
                                        value={data.password}
                                    />
                                    <div className="input-group">
                                        <label className="text-none">
                                            <input
                                                type="checkbox"
                                                name="agree"
                                                value="1"
                                                onChange={this.handleChange}
                                                className="signup_agree"
                                            />{" "}
                                            I agree to the{" "}
                                            {configuration.get(
                                                "configData.site_name"
                                            )}
                                            <Link
                                                to={`/page/privacy`}
                                                target="_blank"
                                            >
                                                {" "}
                                                Privacy Policy{" "}
                                            </Link>
                                            and
                                            <Link
                                                to={`/page/terms`}
                                                target="_blank"
                                            >
                                                {" "}
                                                Terms of Service{" "}
                                            </Link>
                                        </label>
                                    </div>

                                    <button
                                        className="green-btn btn-block"
                                        disabled={this.state.buttonDisable}
                                    >
                                        {this.state.loadingContent != null
                                            ? this.state.loadingContent
                                            : "Signup"}
                                    </button>
                                </form>

                                <div className="login-separator">
                                    or continue with
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 bottom1">
                                        <GoogleLogin
                                            clientId={configuration.get(
                                                "configData.social_logins.GOOGLE_CLIENT_ID"
                                            )}
                                            render={renderProps => (
                                                <button
                                                    className="social-btn"
                                                    onClick={
                                                        renderProps.onClick
                                                    }
                                                    disabled={
                                                        renderProps.disabled
                                                    }
                                                >
                                                    <i className="fab fa-google" />{" "}
                                                    Google
                                                </button>
                                            )}
                                            buttonText="Login"
                                            onSuccess={this.responseGoogle}
                                            onFailure={this.responseGoogle}
                                            cookiePolicy={"single_host_origin"}
                                        />
                                    </div>
                                </div>
                                <p className="line" />
                                <h4 className="m-0 text-center captalize">
                                    Already have an{" "}
                                    {configuration.get("configData.site_name")}{" "}
                                    account?{" "}
                                    <a
                                        href="#"
                                        className="bold-cls close-signup"
                                        data-toggle="modal"
                                        data-target="#login"
                                    >
                                        {" "}
                                        Log in
                                    </a>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withToastManager(Register);
