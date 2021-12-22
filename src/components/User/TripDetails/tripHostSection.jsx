import React, { Component } from "react";
import { Link } from "react-router-dom";
import Helper from "../../Helper/Helper";

import configuration from "react-global-configuration";

class TripHostSection extends Helper {
    state = {};
    render() {
        const singleTripDetails = this.props;

        return (
            <div id="host">
                <div className="media">
                    <div className="media-body">
                        <h1 className="section-head host-bottom">
                            Hosted by {singleTripDetails.provider_name}
                        </h1>
                        <h4 className="host-text">
                            {singleTripDetails.full_address} Joined in{" "}
                            {singleTripDetails.joined}
                        </h4>
                        <h4 className="host-text mb-0">
                            <span>
                                {this.starRatingHost(
                                    singleTripDetails.overall_ratings
                                )}
                            </span>
                        </h4>
                        <h4 className="host-text mb-0">
                            <span>
                                {singleTripDetails.total_ratings
                                    ? singleTripDetails.total_ratings
                                    : 0}{" "}
                                Reviews
                            </span>
                            &nbsp;&nbsp;
                            {/* <span>
                                <i className="fas fa-male mr-05" />4 References
                            </span> */}
                        </h4>
                    </div>
                    <Link
                        to={`/provider-profile/${singleTripDetails.provider_id}`}
                        target="_blank"
                    >
                        <img
                            src={singleTripDetails.picture}
                            alt={singleTripDetails.provider_name}
                            className="ml-3 rounded-circle review-img"
                        />
                    </Link>
                </div>
                <p className="overview-line" />

                <h4 className="host-text">{singleTripDetails.description}</h4>

                <div className="host-details">
                    <h4>
                        Languages:
                        <span className="medium-cls">
                            {singleTripDetails.language}
                        </span>
                    </h4>
                </div>
                {localStorage.getItem("userLoginStatus") ? (
                    <Link
                        to={{
                            pathname: "/single-trip/chat",
                            state: {
                                host_details: singleTripDetails.basic_details,
                                provider_details:
                                    singleTripDetails.provider_details,
                                pricing_details:
                                    singleTripDetails.pricing_details,
                                page: "singletrip"
                            }
                        }}
                        className="green-outline-btn btn-small"
                    >
                        contact host
                    </Link>
                ) : (
                    ""
                )}

                <p className="overview-line" />
                <h4 className="host-text">
                    <span className="medium-cls">
                        Always communicate through{" "}
                        {configuration.get("configData.site_name")}
                    </span>{" "}
                    <span className="dot">
                        <i className="fas fa-circle" />
                    </span>{" "}
                    To protect your payment, never transfer money or communicate
                    outside of the {configuration.get("configData.site_name")}{" "}
                    website or app.
                </h4>
                <p className="overview-line" />
            </div>
        );
    }
}

export default TripHostSection;
