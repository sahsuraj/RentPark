import React, { Component } from "react";
import { DatePicker, RangeDatePicker } from "@y0c/react-datepicker";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import { Link } from "react-router-dom";
import Helper from "../../Helper/Helper";
import api from "../../../Environment";
import ToastDemo from "../../Helper/toaster";
import { withToastManager } from "react-toast-notifications";

import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import "react-dates/initialize";

const $ = window.$;

class TripBookingForm extends Helper {
  state = {
    adults: 0,
    children: 0,
    infants: 0,
    checkin: null,
    checkout: null,
    host_id: null,
    loading: true,
    total_days_price: null,
    basicDetails: null,
    apiResponse: null,
    apiCallStatus: false,
    providerDetails: null
  };

  componentDidMount() {
    this.setState({
      host_id: this.props.basicDetails.host_id,
      basicDetails: this.props.basicDetails,
      adults: this.props.basicDetails.min_guests,
      providerDetails: this.props.providerDetails
    });
  }

  priceCalcultor = event => {
    event.preventDefault();
    console.log("inputDat", this.state);
    // const response = this.priceCalculatorApiCall(inputDate);
    // console.log("REposne from call", response);
    console.log($("#guest-mobile-btn").dropdown("toggle"));
    this.priceCal();
  };

  priceCal = async () => {
    await api.postMethod("host_price_calculator", this.state).then(response => {
      console.log("response", response);
      if (response.data.success) {
        this.setState({
          loading: false,
          total_days_price: response.data.data.total_days_price,
          apiResponse: response.data.data,
          apiCallStatus: true
        });
      } else {
        ToastDemo(this.props.toastManager, response.data.error, "error");
        return false;
      }
    });
  };

  bookNow = async event => {
    event.preventDefault();
    if (!localStorage.getItem("userLoginStatus")) {
      ToastDemo(
        this.props.toastManager,
        "Please login and book your trip",
        "error"
      );
    } else {
      await this.priceCal();
      if (this.state.apiCallStatus) {
        if (
          this.state.adults != 0 &&
          this.state.checkin != null &&
          this.state.apiResponse != null
        ) {
          console.log("After API reponse");
          this.props.history.push("/checkout", this.state);
        } else {
          ToastDemo(
            this.props.toastManager,
            "Please select Guest and Date, Try again",
            "error"
          );
        }
      } else {
        // Do nothing
        console.log("Else ");
      }
    }
    console.log("Book now Clicked");
  };

  increament = value => {
    // console.log("Increamenting", value);
    $("#guest-mobile-btn").dropdown("toggle");

    if (value == "adults") {
      this.setState({
        adults: this.state.adults + 1
      });
    }
    if (value == "children") {
      console.log("check child");
      this.setState({
        children: this.state.children + 1
      });
    }
    if (value == "infants") {
      this.setState({
        infants: this.state.infants + 1
      });
    }
  };

  decreament = value => {
    $("#guest-mobile-btn").dropdown("toggle");

    if (value == "adults") {
      this.setState({
        adults: this.state.adults - 1
      });
    }
    if (value == "children") {
      this.setState({
        children: this.state.children - 1
      });
    }
    if (value == "infants") {
      this.setState({
        infants: this.state.infants - 1
      });
    }
  };

  convert(str) {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return "Date", [date.getFullYear(), mnth, day].join("-");
  }

  onChangeDate = title => (...args) => {
    console.log(title, args);
    console.log(args[0]);
    const checkin = this.convert(args[0]);
    const checkout = this.convert(args[1]);
    this.setState({ checkin: checkin, checkout: checkout });
    console.log("State", this.state);
  };

  render() {
    const { basicDetails, status, providerDetails } = this.props;

    return (
      <div className="col-xl-5 pl-5 relative dis-lg-none dis-md-none dis-sm-none dis-xs-none">
        <div className="pricedetails-box">
          <h3 className="home-price-details">
            {this.state.loading
              ? basicDetails.per_day_formatted
              : this.state.total_days_price}
            <small> per night</small>
          </h3>
          <h5 className="rating-sec">
            <span className="rating-star">
              {this.starRatingHost(basicDetails.overall_ratings)}
            </span>
            <span>&nbsp;{basicDetails.total_ratings} reviews</span>
          </h5>

          <p className="overview-line1" />

          <div className="form-group">
            <label className="medium-cls">dates</label>
            <div className="input-group">
              {/* <DateRangePicker /> */}
              <RangeDatePicker
                onChange={this.onChangeDate("Range DatePicker")}
                className="form-control form-control-lg"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="medium-cls">guests</label>
            <input
              type="text"
              id="guest-mobile-btn"
              data-toggle="dropdown"
              value={
                "Adult:" +
                this.state.adults +
                ", Children: " +
                this.state.children +
                ", Infants: " +
                this.state.infants
              }
              className="form-control form-control-lg"
            />
            <div className="dropdown-menu guest">
              <form className="inc-dec-count">
                <div className="row">
                  <div className="col-6 col-sm-6">
                    <label htmlFor="name">adults</label>
                  </div>
                  <div className="col-6 col-sm-6 text-right">
                    <div className="float-right">
                      <div
                        className="decrement-btn"
                        onClick={() => this.decreament("adults")}
                      >
                        <div className="dec button">
                          <i className="fas fa-minus" />
                        </div>
                      </div>
                      <input
                        type="text"
                        value={this.state.adults}
                        name="adults"
                      />
                      <div
                        className="increment-btn"
                        onClick={() => this.increament("adults")}
                      >
                        <div className="inc button">
                          <i className="fas fa-plus" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6 col-sm-6">
                    <label htmlFor="name">children</label>
                  </div>
                  <div className="col-6 col-sm-6 text-right">
                    <div className="float-right">
                      <div
                        className="decrement-btn"
                        onClick={() => this.decreament("children")}
                      >
                        <div className="dec button">
                          <i className="fas fa-minus" />
                        </div>
                      </div>
                      <input
                        type="text"
                        value={this.state.children}
                        name="children"
                      />
                      <div
                        className="increment-btn"
                        onClick={() => this.increament("children")}
                      >
                        <div className="inc button">
                          <i className="fas fa-plus" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6 col-sm-6">
                    <label htmlFor="name">infants</label>
                  </div>
                  <div className="col-6 col-sm-6 text-right">
                    <div className="float-right">
                      <div
                        className="decrement-btn"
                        onClick={() => this.decreament("infants")}
                      >
                        <div className="dec button">
                          <i className="fas fa-minus" />
                        </div>
                      </div>
                      <input
                        type="text"
                        value={this.state.infants}
                        name="infants"
                      />
                      <div
                        className="increment-btn"
                        onClick={() => this.increament("infants")}
                      >
                        <div className="inc button">
                          <i className="fas fa-plus" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <button
            className="pink-btn btn-block book-btn"
            disabled={status == "host" ? true : false}
            onClick={this.bookNow}
          >
            {status == "host" ? "You can't Book" : "Book"}
          </button>

          <h5 className="small-text">you won’t be charged yet</h5>
          <p className="overview-line" />
          <div className="media top1">
            <div className="media-body">
              <h4 className="home-info">This home is on people’s minds.</h4>
              <p className="home-info-text">
                It’s been viewed 500+ times in the past week.
              </p>
            </div>
            <img
              src={window.location.origin + "/assets/img/light.gif"}
              className="align-self-center ml-3 rounded-circle review-img1"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(TripBookingForm);
