import React, { Component } from "react";
import api from "../../../HostEnvironment";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";
import { Link } from "react-router-dom";

class HostSubscription extends Component {
    state = {
        loading: true,
        subscriptions: null
    };

    componentDidMount() {
        if (this.props.location.state != null) {
            ToastDemo(
                this.props.toastManager,
                this.props.location.state.message,
                "error"
            );
        }
        api.postMethod("subscriptions").then(response => {
            if (response.data.success === true) {
                this.setState({
                    subscriptions: response.data.data,
                    loading: false
                });
            } else {
                ToastDemo(
                    this.props.toastManager,
                    response.data.error,
                    "error"
                );
            }
        });
    }
    render() {
        const { subscriptions, loading } = this.state;
        return (
            <div className="main">
                <div className="container">
                    <div className="top-bottom-spacing">
                        <div>
                            <h3 className="subscriptions-tit">Subscriptions</h3>
                            <div className="sub-line" />
                            <div className="subs-block row">
                                {loading
                                    ? ""
                                    : subscriptions.map(subscription => (
                                          <div
                                              key={
                                                  subscription.provider_subscription_id
                                              }
                                              className="col-md-4 col-sm-6"
                                          >
                                              <div className="subs-box">
                                                  <div className="subs-top text-center">
                                                      <img
                                                          src="../assets/img/loan.svg"
                                                          className="subs-img"
                                                      />
                                                      <h3 className="subs-price">
                                                          {
                                                              subscription.currency
                                                          }
                                                          {subscription.amount}
                                                      </h3>
                                                      <p className="subs-period">
                                                          Plan /{" "}
                                                          {subscription.plan}{" "}
                                                          {
                                                              subscription.plan_type
                                                          }
                                                      </p>
                                                  </div>
                                                  <div className="subs-bottom">
                                                      <div className="start-btn-out">
                                                          <a
                                                              href="#"
                                                              className="start-btn"
                                                          >
                                                              {
                                                                  subscription.title
                                                              }
                                                          </a>
                                                      </div>
                                                      {/* <h3 className="subs-btm-tit">Standard</h3> */}
                                                      <p className="subs-txt">
                                                          {
                                                              subscription.description
                                                          }
                                                      </p>
                                                  </div>

                                                  <Link
                                                      to={{
                                                          pathname:
                                                              "/host/invoice",
                                                          state: subscription
                                                      }}
                                                      className="green-btn subs-btn"
                                                  >
                                                      Buy Now
                                                  </Link>
                                              </div>
                                          </div>
                                      ))}
                            </div>
                            {/* <div className="text-center">
                <a href="#" className="green-btn">
                  Load More
                </a>
              </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withToastManager(HostSubscription);
