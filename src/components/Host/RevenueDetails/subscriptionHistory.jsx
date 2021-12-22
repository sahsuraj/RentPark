import React, { Component } from "react";
import SideBar from "./sideBar";
import api from "../../../HostEnvironment";
import { Link } from "react-router-dom";

class HostSubscriptionHistory extends Component {
  state = {
    subscriptions: null,
    loading: true,
    loadingStatus: true,
    loadingContent: null,
    skipCount: 0
  };
  componentDidMount() {
    this.subscriptionHistoryApi();
  }

  subscriptionHistoryApi() {
    let items;
    api
      .postMethod("subscriptions_history", {
        skip: this.state.skipCount
      })
      .then(response => {
        if (response.data.success === true) {
          if (this.state.subscriptions != null) {
            items = [...this.state.subscriptions, ...response.data.data];
          } else {
            items = [...response.data.data];
          }
          this.setState({
            subscriptions: items,
            loading: false,
            skipCount: response.data.data.length + this.state.skipCount,
            loadingStatus: true
          });
        }
      });
  }

  loadMore = event => {
    this.setState({ loadingStatus: false, loadingContent: "Loading..." });
    event.preventDefault();
    this.subscriptionHistoryApi();
  };
  render() {
    const {
      loading,
      subscriptions,
      loadingContent,
      loadingStatus
    } = this.state;
    return (
      <div className="main">
        <div className="site-content">
          <div
            className="top-bottom-spacing booking-list"
            style={{ padding: "50px 0px" }}
          >
            <div className="row">
              <SideBar />

              <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
                <h2 className="sec-tit">Subscriptions History</h2>

                {loading ? (
                  ""
                ) : subscriptions.length > 0 ? (
                  subscriptions[0].is_current_subscription ? (
                    <h5>
                      Current Plan:{" "}
                      <span className="text-success">
                        {subscriptions[0].title}{" "}
                      </span>
                      ( Expires At:{" "}
                      <span className="text-success">
                        {subscriptions[0].expiry_date}{" "}
                      </span>
                      )
                    </h5>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                <br />

                <div className="table-responsive">
                  <table className="cmn-table table subs-table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Plan Name</th>
                        <th>Period</th>
                        <th>Expiry Date</th>
                        <th scope="col">Payment Mode</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading
                        ? ""
                        : subscriptions.length > 0
                        ? subscriptions.map((subscription, index) => (
                            <tr
                              key={
                                subscription.provider_subscription_payment_id
                              }
                            >
                              <td>{index + 1}</td>
                              <td>
                                {subscription.title}
                                <br />
                                <span>#{subscription.payment_id}</span>
                              </td>
                              <td className="text-center">
                                {subscription.plan_text}
                              </td>
                              <td>{subscription.expiry_date}</td>
                              <td>{subscription.payment_mode}</td>
                              <td>{subscription.paid_amount_formatted}</td>
                              <td>
                                <span className="badge status-btn badge-success">
                                  {subscription.status_text}
                                </span>
                              </td>
                            </tr>
                          ))
                        : 
                        <tr className="no-data">
                          <td colspan="7">
                            <img src="../assets/img/parking/no-data.svg" />
                            <h5>No Data Found</h5>
                          </td>
                        </tr>
                      }
                      {loadingStatus ? "" : loadingContent}
                    </tbody>
                  </table>
                  {loading ? (
                    ""
                  ) : subscriptions.length > 0 ? (
                    <Link to={"#"} onClick={this.loadMore}>
                      Load More
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HostSubscriptionHistory;
