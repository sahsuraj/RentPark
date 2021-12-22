import React, { Component } from "react";
import api from "../../Environment";
import AddCardForm from "../User/AccountSettings/addCardForm";
import { Elements, StripeProvider } from "react-stripe-elements";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../Helper/toaster";
import { DatePicker } from "@y0c/react-datepicker";
import dayjs from "dayjs";

class PaymentPage extends Component {
  state = {
    loading: true,
    cardList: null,
    cardLoading: true,
    vehiclesList: null,
    vehiclesLoading: true,
    formData: {
      vehicle_type: "",
      vehicle_brand: "",
      vehicle_model: "",
      vehicle_number: ""
    },
    priceCalData: {
      checkin: "",
      checkout: ""
    },
    activeVehicle: null,
    activeVehicleLoading: true,
    totalPrice: 0,
    loadingContent: null,
    buttonDisable: false,
    addVehicleButton: false,
    addVehilceLoadingContent: null,
    totalDuration: "1 hr"
  };
  componentDidMount() {
    if (this.props.location.state) {
      this.setState({ loading: false });
      this.listCardApi();
      this.vehiclesListApi();
      const priceCalData = { ...this.state.priceCalData };
      priceCalData["host_id"] = this.props.location.state.host_id;
      this.setState({ priceCalData });
      this.setState({
        totalPrice: this.props.location.state.per_hour_formatted
      });
    } else {
      // window.location = "/search";
      this.props.history.push("/search");
      ToastDemo(
        this.props.toastManager,
        "Something went wrong. Try again",
        "error"
      );
    }
  }

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    this.listCardApi();
  }

  listCardApi = () => {
    api.postMethod("cards_list").then(response => {
      if (response.data.success) {
        this.setState({
          cardList: response.data.data,
          cardLoading: false
        });
      } else {
        ToastDemo(this.props.toastManager, response.data.error, "error");
      }
    });
  };

  vehiclesListApi = () => {
    api.postMethod("vehicles").then(response => {
      if (response.data.success) {
        this.setState({
          vehiclesList: response.data.data,
          vehiclesLoading: false
        });
        if (this.state.vehiclesList.length > 0) {
          this.setState({
            activeVehicle: this.state.vehiclesList[0],
            activeVehicleLoading: false
          });
        }
      } else {
        ToastDemo(this.props.toastManager, response.data.error, "error");
      }
    });
  };

  changeCard = ({ currentTarget: input }) => {
    console.log("clicked");
    api
      .postMethod("cards_default", { user_card_id: input.value })
      .then(response => {
        if (response.data.success) {
          ToastDemo(this.props.toastManager, response.data.message, "success");
        } else {
          ToastDemo(this.props.toastManager, response.data.error, "error");
        }
        console.log("cadfasdf", response);
      });
  };

  handleAddVehicle = ({ currentTarget: input }) => {
    console.log("Changes ");
    const formData = { ...this.state.formData };
    formData[input.name] = input.value;
    this.setState({ formData });
  };

  addVehicle = event => {
    event.preventDefault();
    const { formData } = this.state;
    if (
      formData.vehicle_brand == "" ||
      formData.vehicle_model == "" ||
      formData.vehicle_number == "" ||
      formData.vehicle_type == ""
    ) {
      ToastDemo(
        this.props.toastManager,
        "Please add all required fields",
        "error"
      );
    } else {
      this.setState({
        addVehilceLoadingContent: "Loading... Please Wait",
        addVehicleButton: true
      });
      this.addVehicleApi();
    }
  };

  addVehicleApi = () => {
    api.postMethod("vehicles_save", this.state.formData).then(response => {
      if (response.data.success) {
        ToastDemo(
          this.props.toastManager,
          "Vehicle Added Successfully. ",
          "success"
        );
        const formData = { ...this.state.formData };
        formData["vehicle_brand"] = "";
        formData["vehicle_model"] = "";
        formData["vehicle_number"] = "";
        formData["vehicle_type"] = "";
        this.setState({ formData });
        this.setState({
          addVehilceLoadingContent: null,
          addVehicleButton: false
        });
        this.vehiclesListApi();
      } else {
        ToastDemo(this.props.toastManager, response.data.error, "error");
        this.setState({
          addVehilceLoadingContent: null,
          addVehicleButton: false
        });
      }
    });
  };

  changeVehicle = (event, vehicle) => {
    event.preventDefault();
    this.setState({ activeVehicle: vehicle });
  };

  getArrivingDateandTime = title => (...args) => {
    console.log("arg", args);
    this.setState({ totalPrice: "Loadin..", totalDuration: "Loadin.." });
    const priceCalData = { ...this.state.priceCalData };
    const datess = dayjs(args[0]).format("YYYY-MM-DD HH:mm:ss");
    priceCalData["checkin"] = datess;
    this.setState({ priceCalData });
    setTimeout(() => {
      this.priceCalApi();
    }, 1000);
  };

  getOutDateandTime = title => (...args) => {
    console.log("arg", args);
    this.setState({ totalPrice: "Loadin..", totalDuration: "Loadin.." });
    const priceCalData = { ...this.state.priceCalData };
    const datess = dayjs(args[0]).format("YYYY-MM-DD HH:mm:ss");
    priceCalData["checkout"] = datess;
    this.setState({ priceCalData });
    setTimeout(() => {
      this.priceCalApi();
    }, 1000);
  };

  priceCalApi = () => {
    if (
      this.state.priceCalData.checkin == "" ||
      this.state.priceCalData.checkout == ""
    ) {
      console.log("Chagenges");
      // Do nothing...
    } else {
      console.log("sdfasdfsd ");
      api
        .postMethod("spaces_price_calculator", this.state.priceCalData)
        .then(response => {
          if (response.data.success) {
            this.setState({
              totalPrice: response.data.data.total_formatted,
              totalDuration: response.data.data.duration
            });
          } else {
            ToastDemo(this.props.toastManager, response.data.error, "error");
            this.setState({
              totalPrice: this.props.location.state.per_hour_formatted,
              totalDuration: "1 hr"
            });
          }
          console.log("cadfasdf", response);
        });
    }
  };

  bookNow = event => {
    event.preventDefault();
    this.setState({
      loadingContent: "Loading... Please wait..",
      buttonDisable: true
    });
    const { priceCalData } = this.state;
    if (
      priceCalData.checkin == "" ||
      priceCalData.checkout == "" ||
      priceCalData.host_id == "" ||
      this.state.activeVehicle == null
    ) {
      ToastDemo(
        this.props.toastManager,
        "Please add checkin, checkout time and vehicle to proceed..",
        "error"
      );
      this.setState({ loadingContent: null, buttonDisable: false });
    } else {
      const priceCalData = { ...this.state.priceCalData };
      priceCalData[
        "user_vehicle_id"
      ] = this.state.activeVehicle.user_vehicle_id;
      priceCalData["payment_mode"] = "card";
      this.setState({ priceCalData });
      setTimeout(() => {
        this.bookNowApiCall();
      }, 1000);
    }
  };

  bookNowApiCall = () => {
    api
      .postMethod("spaces_bookings_create", this.state.priceCalData)
      .then(response => {
        if (response.data.success) {
          ToastDemo(this.props.toastManager, response.data.message, "success");
          this.props.history.push("/history");
          this.setState({ loadingContent: null, buttonDisable: false });
        } else {
          ToastDemo(this.props.toastManager, response.data.error, "error");
          this.setState({ loadingContent: null, buttonDisable: false });
        }
      });
  };

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  // componentWillReceiveProps(nextProps) {
  //   this.vehiclesListApi();
  // }

  render() {
    const {
      loading,
      cardLoading,
      vehiclesList,
      vehiclesLoading,
      cardList,
      formData,
      activeVehicle,
      activeVehicleLoading,
      loadingContent,
      buttonDisable
    } = this.state;
    const singleDetails = this.props.location.state;
    if (loading) {
      return "Loading...";
    } else {
      return (
        <div className="main">
          <div className="container">
            <div className="top-bottom-spacing">
              <h2 className="pay-main-tit">Secure Payment</h2>
              <div className="row">
                <div className="col-md-4">
                  <div className="pay-left">
                    <div className="pay-details-wrap">
                      <div className="pay-location">
                        <p className="loc-name">{singleDetails.host_name}</p>
                      </div>
                      <div className="pay-loc-img">
                        <img src={singleDetails.host_picture} />
                      </div>
                      <div className="pay-loc-date row">
                        <div className="col-md-6 pay-card-opt">
                          <label>Arriving ON</label>
                          <DatePicker
                            onChange={this.getArrivingDateandTime(
                              "Range DatePicker"
                            )}
                            includeTime
                          />
                        </div>
                        <div className="col-md-6">
                          <label>Leaving ON</label>
                          <DatePicker
                            onChange={this.getOutDateandTime(
                              "Range DatePicker"
                            )}
                            includeTime
                          />
                        </div>
                      </div>
                      <div className="pay-duration text-center">
                        <h4 className="park-sub-tit">
                          {this.state.totalDuration}
                        </h4>
                        <p className="park-txt">Total Duration</p>
                      </div>
                      <div className="pay-price text-right">
                        <h3 className="">
                          <span>Total Price:</span> {this.state.totalPrice}
                        </h3>
                      </div>
                    </div>
                    <div className="pay-right-btm">
                      <div className="safe-box">
                        <div className="safe-img">
                          <img
                            src={
                              window.location.origin + "/assets/img/shield.svg"
                            }
                          />
                        </div>
                        <div className="safe-content">
                          <h6>
                            Reserving parking with JustPark is safe and secure!
                          </h6>
                          <p>
                            {/* <a href="#" className="green-link">
                              Read about our cancellation policy
                            </a> */}
                          </p>
                        </div>
                      </div>
                      <ul className="list-unstyled secure-list">
                        <li>
                          <i className="flaticon-tick" />
                          <span>
                            Full refund on short term bookings before start time
                          </span>
                        </li>
                        <li>
                          <i className="flaticon-tick" />
                          <span>Trusted by over 2.5 million motorists</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="pay-right">
                    <div className="pay-right-box">
                      <div className="pay-head row">
                        <div className="col-sm-6 col-xs-12 pay-head-left">
                          <h4 className="pay-tit">1. Personal Details</h4>
                        </div>
                      </div>
                      <div className="pay-det-block">
                        <div className="pay-det-group">
                          <label>{localStorage.getItem("username")}</label>
                          {/* <p>johndoe@gmail.com</p> */}
                        </div>
                        {/* <div className="pay-det-group">
                          <label>Phone Number</label>
                          <div className="row">
                            <div className="col-sm-8">
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Phone Number"
                              />
                            </div>
                          </div>
                        </div> */}
                        <form onSubmit={this.addVehicle}>
                          <div className="pay-det-group">
                            <label>Vehicle type</label>
                            <div className="row">
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control pay-card-opt"
                                  placeholder="Car"
                                  name="vehicle_type"
                                  value={formData.vehicle_type}
                                  onChange={this.handleAddVehicle}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="pay-det-group">
                            <label>Vehicle brand</label>
                            <div className="row">
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control pay-card-opt"
                                  placeholder="Jeep"
                                  name="vehicle_brand"
                                  value={formData.vehicle_brand}
                                  onChange={this.handleAddVehicle}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="pay-det-group">
                            <label>Vehicle model</label>
                            <div className="row">
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control pay-card-opt"
                                  placeholder="Jeep Compass"
                                  name="vehicle_model"
                                  value={formData.vehicle_model}
                                  onChange={this.handleAddVehicle}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="pay-det-group">
                            <label>Vehicle number</label>
                            <div className="row">
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  className="form-control pay-card-opt"
                                  placeholder="Jo 7623"
                                  name="vehicle_number"
                                  value={formData.vehicle_number}
                                  onChange={this.handleAddVehicle}
                                />
                              </div>
                              <div className="col-sm-4">
                                <button
                                  className="full-btn green-btn"
                                  type="submit"
                                  disabled={this.state.addVehicleButton}
                                >
                                  {this.state.addVehilceLoadingContent != null
                                    ? this.state.addVehilceLoadingContent
                                    : "Add Vehicle"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                        {vehiclesLoading ? (
                          "Loading..."
                        ) : vehiclesList.length > 0 ? (
                          <div className="pay-det-group">
                            <label>Select Vehicle</label>
                            {vehiclesList.map((vehicle, index) => (
                              <a
                                href="#"
                                key={index}
                                className={
                                  activeVehicleLoading
                                    ? ""
                                    : activeVehicle.user_vehicle_id ==
                                      vehicle.user_vehicle_id
                                    ? "sel-vehicle active"
                                    : "sel-vehicle "
                                }
                                onClick={event =>
                                  this.changeVehicle(event, vehicle)
                                }
                              >
                                <h3>{vehicle.vehicle_number}</h3>
                                <p className="grey-txt">
                                  {vehicle.vehicle_model}
                                </p>
                                <p className="grey-txt">
                                  {vehicle.vehicle_type}
                                </p>
                              </a>
                            ))}
                          </div>
                        ) : (
                          "Please add vechile"
                        )}
                      </div>
                    </div>
                    <div className="pay-right-box">
                      <div className="pay-head row">
                        <div className="col-sm-6 col-xs-12 pay-head-left">
                          <h4 className="pay-tit">2. Payment Information</h4>
                        </div>
                        <div className="col-sm-6 col-xs-12 pay-head-right text-right">
                          <a
                            href="#"
                            data-toggle="modal"
                            data-target="#AddCardModel"
                            className="green-link edit-link"
                          >
                            add a card method
                          </a>
                          <StripeProvider apiKey="pk_live_Q7rd7M3glnolUZnqep34hmxN00C2DOUSwK">
                            <Elements>
                              <AddCardForm {...this.props} />
                            </Elements>
                          </StripeProvider>
                        </div>
                      </div>
                      <div className="pay-det-block">
                        <div className="pay-det-group pay-method row">
                          {cardLoading
                            ? "Loading..."
                            : cardList.cards.length > 0
                            ? cardList.cards.map(card => (
                                <div
                                  className="col-md-6"
                                  key={card.user_card_id}
                                >
                                  <div className="form-check form-check-inline add-list-block m-0">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="card"
                                      value={card.user_card_id}
                                      id={card.user_card_id}
                                      defaultChecked={
                                        card.is_default == 1 ? true : false
                                      }
                                      onChange={this.changeCard}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={card.user_card_id}
                                    >
                                      XXXX...{card.last_four}
                                    </label>
                                  </div>
                                </div>
                              ))
                            : "Please add card to continue"}
                        </div>

                        <div className="pay-det-group">
                          <button
                            className="green-btn"
                            onClick={this.bookNow}
                            disabled={this.state.buttonDisable}
                          >
                            {this.state.loadingContent != null
                              ? this.state.loadingContent
                              : "Pay Now"}
                          </button>
                        </div>
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
}

export default withToastManager(PaymentPage);
