import React, { Component } from "react";
import HostProfileSideBar from "./hostProfileSideBar";
import HostHelper from "../../Helper/hostHelper";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";
import api from "../../../HostEnvironment";

class HostNotification extends HostHelper {
    state = {
        data: null,
        loading: true,
        inputData: {}
    };

    componentDidMount() {
        this.getHostDetails();
    }

    handleChange = ({ currentTarget: input }) => {
        const inputData = { ...this.state.inputData };

        if (input.checked) {
            inputData["type"] = input.name;
            inputData["status"] = 1;
        } else {
            inputData["type"] = input.name;
            inputData["status"] = 0;
        }
        this.setState({ inputData });

        this.notificationUpdateApiCall(inputData);
    };

    notificationUpdateApiCall = inputData => {
        api.postMethod("notification/settings", inputData).then(response => {
            if (response.data.success) {
                ToastDemo(
                    this.props.toastManager,
                    response.data.message,
                    "success"
                );
            } else {
                ToastDemo(
                    this.props.toastManager,
                    response.data.error,
                    "error"
                );
            }
        });
    };
    render() {
        const { loading, data } = this.state;
        return (
            <div className="main">
                <div className="site-content">
                    <div className="top-bottom-spacing">
                        <div className="row">
                            <HostProfileSideBar />

                            {loading ? (
                                "Loading..."
                            ) : (
                                <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
                                    <form>
                                        <div className="panel">
                                            <div className="panel-heading">
                                                Messages
                                            </div>
                                            <div className="panel-body account">
                                                <h5 className="m-0 captalize lh-1-4">
                                                    receive messages from hosts
                                                    and guests, including
                                                    booking requests.
                                                </h5>
                                                <p className="overview-line" />

                                                <label className="form-checkbox">
                                                    email
                                                    <input
                                                        type="checkbox"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        name="email"
                                                        defaultChecked={
                                                            data.email_notification_status
                                                        }
                                                    />
                                                    <span className="checkmark" />
                                                </label>

                                                <label className="form-checkbox">
                                                    notifications
                                                    <input
                                                        type="checkbox"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        name="push"
                                                        defaultChecked={
                                                            data.push_notification_status
                                                        }
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                                <h5 className="profile-note ml-35">
                                                    To your mobile or tablet
                                                    device
                                                </h5>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withToastManager(HostNotification);
