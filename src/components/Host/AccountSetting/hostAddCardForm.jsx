import React, { Component } from "react";
import { injectStripe, CardElement } from "react-stripe-elements";
import api from "../../../HostEnvironment";
import { Link } from "react-router-dom";
import ToastDemo from "../../Helper/toaster";

const $ = window.$;

class HostAddCardForm extends Component {
  state = {
    formData: {
      cardnumber: "",
      expdate: "",
      cvc: "",
      firstname: "",
      lastname: ""
    },
    paynowClicked: null,
    buttonDisable: false
  };
  addCard = ev => {
    ev.preventDefault();

    this.setState({
      paynowClicked: "Please wait... Request processing...",
      buttonDisable: true
    });
    if (this.props.stripe) {
      this.props.stripe
        .createToken({
          type: "card",
          name: localStorage.getItem("provider_name")
        })
        .then(payload => {
          const inputData = {
            card_token: payload.token.id
          };
          api
            .postMethod("cards_add", inputData)
            .then(response => {
              if (response.data.success === true) {
                ToastDemo(
                  this.props.toastManager,
                  response.data.message,
                  "success"
                );
                $("#AddCardModel").modal("hide");
                window.location = "/host/payment";
              } else {
                this.setState({
                  paynowClicked: null,
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
              this.setState({
                paynowClicked: null,
                buttonDisable: false
              });
              ToastDemo(this.props.toastManager, error, "error");
            });
        })
        .catch(error => {
          this.setState({
            paynowClicked: null,
            buttonDisable: false
          });
          ToastDemo(
            this.props.toastManager,
            "Please check your card details and try again..",
            "error"
          );
        });
    } else {
      this.setState({
        paynowClicked: null,
        buttonDisable: false
      });
      ToastDemo(this.props.toastManager, "Stripe is not configured", "error");
    }
  };
  handleChange = ({ currentTarget: input }) => {
    const formaData = { ...this.state.formData };
    formaData[input.name] = input.value;
    this.setState({ formaData });
  };
  render() {
    const { formData } = this.state;

    return (
      <div className="modal fade" id="AddCardModel">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <h1 className="section-head">add a payment method</h1>
              <img src="../assets/img/cards.png" className="cards-img" />

              <form onSubmit={this.addCard}>
                {/* <div className="form-group bottom">
                  <label for="card" className="mt-0">
                    card number*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="cardnumber"
                    onChange={this.handleChange}
                    value={formData.cardnumber}
                  />
                </div>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="form-group bottom">
                      <label className="mt-0">expires on*</label>
                      <div className="row">
                        <div className="col-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="MM/YY"
                            name="expdate"
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="col-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="YYYY"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group bottom">
                      <label className="mt-0">security code*</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cvc"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="form-group bottom">
                      <label className="mt-0">first name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstname"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="form-group bottom">
                      <label className="mt-0">last name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastname"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <p className="overview-line" /> */}

                <CardElement />
                <div className="text-right">
                  <Link
                    className="grey-outline-btn btn-small"
                    data-dismiss="modal"
                    to="#"
                  >
                    cancel
                  </Link>
                  <button
                    type="submit"
                    className="green-btn btn-small auto-width"
                    disabled={this.state.buttonDisable}
                  >
                    {this.state.paynowClicked != null
                      ? this.state.paynowClicked
                      : "add card"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStripe(HostAddCardForm);
