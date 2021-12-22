import React, { Component } from "react";
import TripBanner from "../../User/TripDetails/tripBanner";

import TripReviewSection from "../../User/TripDetails/tripReviewSection";
import TripHostSection from "../../User/TripDetails/tripHostSection";
import TripShowAllAmen from "../../User/TripDetails/tripShowAllAmen";
import api from "../../../HostEnvironment";
import TripLocation from "../../User/TripDetails/TripLocation";
import renderHTML from "react-render-html";

import Loader from "../../Helper/Loader";

import "@y0c/react-datepicker/assets/styles/calendar.scss";
import TripGallery from "../../User/TripDetails/tripGallery";

class HostSingleTripView extends Component {
  state = {
    singleTripDetails: null,
    loading: true,
    formData: {
      host_id: this.props.match.params.id
    }
  };

  componentDidMount() {
    const formData = {
      host_id: this.props.match.params.id
    };
    this.singleTripViewApiCall(formData);
  }

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    const formData = {
      host_id: nextProps.match.params.id
    };
    this.setState({ loading: true });
    this.singleTripViewApiCall(formData);
  }

  singleTripViewApiCall(formData) {
    api.postMethod("hosts_view", formData).then(response => {
      if (response.data.success === true) {
        this.setState({
          singleTripDetails: response.data.data,
          loading: false
        });
      }
    });
  }

  render() {
    let load = new Loader();
    var settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      adaptiveHeight: true
    };
    let { singleTripDetails, loading } = this.state;

    return loading ? (
      "Loading..."
    ) : (
      <div>
        <TripBanner
          basicDetails={singleTripDetails.basic_details}
          status="host"
        />

        <TripGallery details={singleTripDetails.basic_details} />

        <div className="main">
          <div className="site-content">
            <div className="top-bottom-spacing">
              <div className="row">
                <div className="col-xl-7 col-lg-10 col-md-10 auto-margin">
                  <div id="overview">
                    <div className="media">
                      <div className="media-body mr-3">
                        <a href="#">
                          <p className="red-text txt-overflow">
                            {singleTripDetails.basic_details.location}
                          </p>
                        </a>
                        <h1 className="category-section-head">
                          {singleTripDetails.basic_details.host_name}
                        </h1>
                        <h4 className="captalize section-subhead">
                          {singleTripDetails.basic_details.host_location}
                        </h4>
                      </div>
                      <div>
                        <img
                          src={singleTripDetails.provider_details.picture}
                          alt="John Doe"
                          className="mt-3 rounded-circle review-img"
                        />
                        <p className="text-center top3 mb-0">
                          <p className="other-proname">
                            {singleTripDetails.provider_details.provider_name}
                          </p>
                        </p>
                      </div>
                    </div>

                    <h4 className="single-cat-text">
                      {renderHTML(
                        singleTripDetails.basic_details.host_description
                      )}
                    </h4>

                    <p className="overview-line" />

                    <h4 className="single-cat-text medium-cls ">
                      {singleTripDetails.amenties.title}
                    </h4>
                    <ul className="amenties-list">
                      {singleTripDetails.amenties.data.length > 0 ? (
                        <div>
                          {singleTripDetails.amenties.data[0].answers_data.map(
                            amentie => (
                              <li className="">
                                <img
                                  src={amentie.picture}
                                  style={{ width: "20px", height: "16px" }}
                                />
                                &nbsp;{amentie.title}
                              </li>
                            )
                          )}
                          <div className="clearfix" />
                          <a
                            href="#"
                            data-toggle="modal"
                            data-target="#amenities"
                          >
                            <h4 className="amenities-head">
                              show all amenities
                            </h4>
                          </a>

                          <TripShowAllAmen
                            amenties={singleTripDetails.amenties}
                          />
                        </div>
                      ) : (
                        <div className="no-data">
                          <img
                            src={
                              window.location.origin +
                              "/assets/img/parking/no-data.svg"
                            }
                          />
                          <h5>No Data Found</h5>
                        </div>
                      )}
                    </ul>

                    <p className="overview-line" />
                  </div>

                  <TripReviewSection
                    details={singleTripDetails.basic_details}
                  />

                  <TripHostSection
                    providerDetails={singleTripDetails.provider_details}
                  />

                  <TripLocation location={singleTripDetails.basic_details} />
                  <div className="clearfix" />
                </div>
                {/* <TripBookingForm
                  basicDetails={singleTripDetails.basic_details}
                  providerDetails={singleTripDetails.provider_details}
                  status="host"
                  location={this.props.location}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HostSingleTripView;
