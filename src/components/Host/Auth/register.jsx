import React, { Component } from "react";
import { Link } from "react-router-dom";
import ToastDemo from "../../Helper/toaster";
import HostHelper from "../../Helper/hostHelper";
import { withToastManager } from "react-toast-notifications";
import api from "../../../HostEnvironment";

import configuration from "react-global-configuration";

class HostRegister extends HostHelper {
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
                            "hostId",
                            response.data.data.provider_id
                        );
                        localStorage.setItem(
                            "accessToken",
                            response.data.data.token
                        );
                        localStorage.setItem("hostLoginStatus", true);

                        window.location = path
                            ? path.from.pathname
                            : "/host/dashboard";
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
                        this.setState({
                            loadingContent: null,
                            buttonDisable: false
                        });
                    }
                })
                .catch(error => {
                    this.setState({
                        loadingContent: null,
                        buttonDisable: false
                    });
                });
        }
    };
    render() {
        const { data } = this.state;
        return (
            <div className="page-content">
                <div className="prov-login">
                    <h1 className=""> Register </h1>
                    <form
                        className="top1 prov-login-form"
                        onSubmit={this.handleSubmit}
                    >
                        <div className="form-group input-group">
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Name"
                                onChange={this.handleChange}
                                value={data.name}
                            />
                        </div>
                        <div className="form-group input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="email address"
                                name="email"
                                onChange={this.handleChange}
                                value={data.email}
                            />
                        </div>
                        <div className="form-group input-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                name="password"
                                onChange={this.handleChange}
                                value={data.password}
                            />
                        </div>
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
                                {configuration.get("configData.site_name")}
                                <Link to={`/page/privacy`} target="_blank">
                                    {" "}
                                    Privacy Policy{" "}
                                </Link>
                                and
                                <Link to={`/page/terms`} target="_blank">
                                    {" "}
                                    Terms of Service{" "}
                                </Link>
                            </label>
                        </div>

                        <button
                            className="green-btn bottom1 block cmn-btn"
                            disabled={this.state.buttonDisable}
                        >
                            {this.state.loadingContent != null
                                ? this.state.loadingContent
                                : "Register"}
                        </button>
                    </form>

                    <h4 className="m-0 text-center captalize">
                        Already have an account? ?{" "}
                        <Link
                            to={"/host/login"}
                            className="bold-cls close-login"
                        >
                            {" "}
                            Login
                        </Link>
                    </h4>
                </div>
            </div>
        );
    }
}

export default withToastManager(HostRegister);
