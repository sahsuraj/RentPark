import React, { Component } from "react";
import Helper from "../Helper/Helper";
import Loader from "../Helper/Loader";
import ToastDemo from "../Helper/toaster";
import { withToastManager } from "react-toast-notifications";
import { Link } from "react-router-dom";
import Map, { GoogleApiWrapper, Marker } from "google-maps-react";
import { DatePicker } from "@y0c/react-datepicker";
import dayjs from "dayjs";
import { apiConstants } from "../../components/Constant/constants";

import configuration from "react-global-configuration";

class LandingPage extends Helper {
  state = {
    first_block: null,
    mainData: null,
    loading: true,
    second_block: null,
    formData: {
      checkin: "",
      checkout: "",
      latitude: "",
      longitude: ""
    }
  };
  constructor(props) {
    super(props);

    // States and props usage
  }

  componentDidMount() {
    // Call api function
    this.getDefaultLeavingTime();
  }

  renderAutoComplete = () => {
    const { google } = this.props;
    if (!google) {
      return;
    }
    const autocomplete = new google.maps.places.Autocomplete(
      this.autocomplete,
      { types: ["geocode"] }
    );

    autocomplete.setFields(["address_component", "geometry", "name"]);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log("Place", place);
      if (!place.geometry) return;
      this.setState({ position: place.geometry.location });
      const formData = { ...this.state.formData };
      formData["latitude"] = place.geometry.location.lat();
      formData["longitude"] = place.geometry.location.lng();
      let full_address = "";
      place.address_components.map(
        address =>
          (full_address =
            full_address == ""
              ? address.long_name
              : full_address + "," + address.long_name)
      );
      formData["full_address"] = full_address;

      this.setState({ formData });
    });
  };

  showParking = event => {
    event.preventDefault();

    if (!this.state.formData.full_address) {
      ToastDemo(this.props.toastManager, "Enter the location", "error");
      return false;
    }
    if (!this.state.formData.checkin) {
      ToastDemo(this.props.toastManager, "Choose Arriving date", "error");
      return false;
    }

    if (!this.state.formData.checkout) {
      ToastDemo(this.props.toastManager, "Choose Leaving date", "error");
      return false;
    }

    this.props.history.push("/search", this.state.formData);
  };

  getArrivingDateandTime = title => (...args) => {
    const formData = { ...this.state.formData };
    const datess = dayjs(args[0]).format("YYYY-MM-DD HH:mm:ss");
    formData["checkin"] = datess;
    this.setState({ formData });
  };

  getOutDateandTime = title => (...args) => {
    const formData = { ...this.state.formData };
    const datess = dayjs(args[0]).format("YYYY-MM-DD HH:mm:ss");
    formData["checkout"] = datess;
    this.setState({ formData });
  };

  getDefaultLeavingTime = () => {
    var oldDateObj = new Date();
    var newDateObj = new Date();
    newDateObj.setTime(oldDateObj.getTime() + 60 * 60 * 1000);

    return dayjs(newDateObj).format("YYYY-MM-DD HH:mm");
  };
  getDefaultArravingTime = () => {
    return dayjs(new Date()).format("YYYY-MM-DD HH:mm");
  };

  render() {
    let load = new Loader();
    const { loading, mainData, second_block } = this.state;
    let renderSearch = (
      <div className="jumbotron main-section">
    <div className="container text-center">
      <h1 className="display-4"><img src="../assets/img/logo-2.png" className="main-section-logo" /></h1>
      <h2 className="home_heading">On Demand Parking, Anywhere, Anytime</h2>
     
        <div className="row">
          <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2"></div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text"><i className="fa fa-search"></i></span>
              </div>
              <input
            type="text"
            className="form-control"
            placeholder="Address, Place or city search"
            onFocus={this.renderAutoComplete}
            ref={ref => (this.autocomplete = ref)}
          />
              <div className="input-group-append">
                <a href="#" className="btn btn-primary" role="button"  onClick={this.showParking}>Search</a>
              </div>
            </div>
          </div>
          <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2"></div>
        </div>

        <div className="row">
          <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2"></div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            

            <div className="row datepicker-row">

              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className="input-group date-box"> <label className="home_heading">ARRIVING ON</label></div>
                <div className="input-group date-box">  
                <DatePicker
                    // initialDate={this.getDefaultArravingTime()}
                    className
                    onChange={this.getArrivingDateandTime("Range DatePicker")}
                    includeTime
                    showDefaultIcon
                    placeholder
                    
                  />

                </div>
              </div>

              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className="input-group date-box"> <label className="home_heading">LEAVING ON</label></div>
                <div className="input-group">
                <DatePicker
                  // initialDate={this.getDefaultLeavingTime()}
                  onChange={this.getOutDateandTime("Range DatePicker")}
                  includeTime
                  Placeholder="Select Date & Time"
                  showDefaultIcon
                />
                </div>
              </div>

            </div>

          </div>
          <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2"></div>
        </div>

       <br /> <br />

        <a className=" btn-primary btn-lg btn-parking" href="#" role="button" onClick={this.showParking}><i className="fa fa-paper-plane"></i> Find Parking Near Me</a>

    </div>
</div>
    );
    return (
      <div className="main">
        <div
          className="contentnew"
         
        >
          {renderSearch}
        </div>
        <div className="container parking_top_img">
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
            <img src="../assets/img/Sydney_MAP.jpeg"  />
            </div>
            <div className="col-md-3"></div>
        </div>
        </div>
        <section className="process-section park-section">
          <div className="container">
            <div className="sec-head text-center">
              <div className="title-line"></div>
              <h2>Parking Made Easy</h2>
            
            </div>
            <div className="sec-content row">
              <div className="col-md-4">
                <div className="features-box text-center">
                  <img src="../assets/img/svg/parking.svg" />
                  <h3>Save Money</h3>
                  <p>You can easily find a spot when and where you want and at a price you can afford</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="features-box text-center">
                  <img src="../assets/img/svg/bill.svg" />
                  <h3>Save Time</h3>
                  <p>Be on time to events or meetings instead of wasting time circling around streets</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="features-box text-center">
                  <img src="../assets/img/svg/parking-sign.svg" />
                  <h3>On Demand Parking</h3>
                  <p>Flexibility to either choose or rent out your car spot whether be an hour, days or months.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container youtube_div">
        <iframe width="100%" height="500" src="https://www.youtube.com/embed/PM4C5F14T9Q"  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>
        </div>
        <section
          className="rent-section cross-shape p-70 bg-img"
          style={{
            backgroundImage: `url('../assets/img/parking/parking_1.jpg')`
          }}
        >
          {/* <div className="rent-shape">
            <img src="../assets/img/parking/shape-1.png" />
          </div> */}
          <div className="container">
            <div className="rent-inner row pos-rel">
              <div className="col-md-6">
                <div className="rent-left">
                  <h3 className="white-color rent-tit">
                    sQemee is solving parking problems effectively
                  </h3>
                 
                  <a href="#" className="green-btn">
                    Learn how to earn today
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="download-section p-70">
          <div className="container">
            <div className="sec-head mb-20">
              <div className="title-line m-l"></div>
              <h2>
                Download the{" "}
                <span className="green-color"> sQemee </span> parking
                app
              </h2>
              <h3>
                Find parking anywhere, anytime 
              </h3>
            </div>
            <div className="sec-content">
              <div className="row">
                <div className="col-md-5">
                  <p className="sec-txt mb-20">
                  Rated 5 stars with an average satisfaction rating of 96%, sQemee is the peoples favourite parking service. Enter your mobile number below to receive a one-time text message with a link to download the free sQemee app.
                  </p>
                  <p className="sec-txt mb-20">
                    Enter your mobile number below to receive a one-time text
                    message with a link to download the free sQemee app.
                  </p>
                  {/* <div className="send-link-wrap mb-20">
                    <div className="input-group dropdown">
                      <input
                        type="text"
                        className="form-control form-control-lg dropdown-toggle"
                        data-toggle="dropdown"
                        placeholder="try 'london'"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon">
                          Send Link
                        </span>
                      </div>
                    </div>
                  </div> */}
                  <div className="download-icon-wrap">
                    <h4 className="download-icon-tit">OR DOWNLOAD FROM:</h4>

                    <a
                      href={configuration.get("configData.playstore_user")}
                      className="download-icon"
                    >
                      <img src="../assets/img/parking/googleplay.svg" />
                    </a>

                    <a
                      href={configuration.get("configData.appstore_user")}
                      className="download-icon"
                    >
                      <img src="../assets/img/parking/appstore.svg" />
                    </a>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="download-img">
                    <img src="../assets/img/parking/mobile-app9ready1.png" />
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

export default GoogleApiWrapper({
  apiKey: apiConstants.google_api_key
})(withToastManager(LandingPage));
