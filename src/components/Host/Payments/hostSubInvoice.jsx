import React, { Component } from "react";
import Loader from "../../Helper/Loader";
import { Link, Redirect } from "react-router-dom";
import api from "../../../HostEnvironment";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";

class HostSubscriptionInvoice extends Component {
  state = {
    loading: true,
    redirect: false
  };

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({ loading: false });
    } else {
      window.location = "/host/dashboard";
    }
  }

  payNow = (event, subscription) => {
    event.preventDefault();

    api
      .postMethod("subscriptions_payment_by_stripe", {
        provider_subscription_id: subscription.provider_subscription_id
      })
      .then(response => {
        if (response.data.success === true) {
          this.setState({
            redirect: true
          });
          ToastDemo(this.props.toastManager, response.data.message, "success");
        } else {
          ToastDemo(this.props.toastManager, response.data.error, "error");
        }
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/host/subscription/success"} />;
    }
    let loader = new Loader();
    const { loading } = this.state;
    if (loading) {
      return loader.propertyLoader();
    } else {
      const subscription = this.props.location.state;

      return (
        <div className="main">
          <div className="container">
            <div className="top-bottom-spacing">
              <div>
                <h3 className="subscriptions-tit">InVoice</h3>
                <div className="sub-line" />
                <div className="invoice">
                  <h3>{subscription.title}</h3>
                  <p>{subscription.description}</p>
                  <div className="invoice-table table-responsive">
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <td>
                            <b>Price</b>
                          </td>
                          <td className="text-right">
                            {subscription.currency}
                            {subscription.amount}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <th>Total</th>
                        <th className="text-right">
                          {subscription.currency}
                          {subscription.amount}
                        </th>
                      </tfoot>
                    </table>
                  </div>

                  <div className="invoice-pay">
                    <Link
                      to="#"
                      className="green-btn invoice-pay-btn small-btn"
                      onClick={e => this.payNow(e, subscription)}
                    >
                      Pay Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withToastManager(HostSubscriptionInvoice);
