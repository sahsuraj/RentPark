import React, { Component } from "react";
import SideBar from "./sideBar";
import api from "../../../HostEnvironment";
import { Link } from "react-router-dom";

class HostTransactionHistory extends Component {
  state = {
    loading: true,
    transactions: null,
    skipCount: 0,
    loadingStatus: true,
    loadingContent: null
  };
  componentDidMount() {
    this.transactionApiCall();
  }

  transactionApiCall() {
    let items;
    api
      .postMethod("transactions_history", { skip: this.state.skipCount })
      .then(response => {
        if (response.data.success) {
          if (this.state.transactions != null) {
            items = [...this.state.transactions, ...response.data.data];
          } else {
            items = [...response.data.data];
          }
          this.setState({
            transactions: items,
            loading: false,
            skipCount: response.data.data.length + this.state.skipCount,
            loadingStatus: true
          });
        }
      });
  }

  loadMore = event => {
    event.preventDefault();
    this.setState({ loadingStatus: false, loadingContent: "Loading..." });

    this.transactionApiCall();
  };
  render() {
    const { loading, transactions, loadingContent, loadingStatus } = this.state;
    return (
      <div className="main">
        <div className="site-content">
          <div className="top-bottom-spacing">
            <div className="row">
              <SideBar />
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
                <div className="transactions">
                  <h2 className="sec-tit">Transaction History</h2>
                  <div className="tab-content prov-tab-content">
                    <div className="tab-pane active" id="home" role="tabpanel">
                      <div className="clear-both" />

                      <div className="trans-table table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Date</th>
                              <th scope="col">Payment Mode</th>
                              <th scope="col">Details</th>
                              <th scope="col">Your Commission</th>
                              <th scope="col">Total Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading
                              ? ""
                              : transactions.length > 0
                              ? transactions.map(transaction => (
                                  <tr key={transaction.booking_payment_id}>
                                    <td scope="row">{transaction.paid_date}</td>
                                    <td>{transaction.payment_mode}</td>
                                    <td>{transaction.message}</td>
                                    <td>
                                      {transaction.provider_amount_formatted}
                                    </td>
                                    <td>{transaction.paid_amount_formatted}</td>
                                  </tr>
                                ))
                              : 
                              <tr className="no-data">
                                <td colspan="5">
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
                        ) : transactions.length > 0 ? (
                          <Link to={"#"} onClick={this.loadMore}>
                            Load More
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div
                      className="tab-pane"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      ...
                    </div>
                    <div
                      className="tab-pane"
                      id="contact"
                      role="tabpanel"
                      aria-labelledby="contact-tab"
                    >
                      ...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HostTransactionHistory;
