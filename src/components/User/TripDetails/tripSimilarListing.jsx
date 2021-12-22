import React, { Component } from "react";
import Slider from "react-slick";
import api from "../../../Environment";

import { Link } from "react-router-dom";
import Helper from "../../Helper/Helper";

class TripSimilarListing extends Helper {
    state = {
        suggestions: null,
        loading: true
    };
    componentDidMount() {
        api.postMethod("suggestions", { host_id: this.props.host_id }).then(
            response => {
                this.setState({
                    suggestions: response.data.data,
                    loading: false
                });
            }
        );
    }
    render() {
        var settings = {
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: true
        };
        const { loading, suggestions } = this.state;
        return (
            <div className="row">
                <div className="col-xl-12 col-lg-10 col-md-10 auto-margin">
                    <div className="similar-listing-sec">
                        <h2 className="similar-listing-head">
                            Similar listings
                        </h2>
                        <section className="similar-listings slider">
                            <Slider {...settings}>
                                {loading
                                    ? ""
                                    : suggestions.length > 0
                                    ? suggestions.map(suggestion => (
                                          <div key={suggestion.host_id}>
                                              <Link
                                                  to={`/trip/${
                                                      suggestion.host_id
                                                  }`}
                                              >
                                                  <div className="similar-img-sec">
                                                      <img
                                                          src={
                                                              suggestion.host_picture
                                                          }
                                                          alt="image"
                                                          className="homes-img"
                                                      />
                                                  </div>
                                                  <div className="homes-text-sec">
                                                      <p className="red-text txt-overflow">
                                                          {
                                                              suggestion.host_location
                                                          }{" "}
                                                      </p>
                                                      <h4 className="homes-title txt-overflow">
                                                          {suggestion.host_name}
                                                      </h4>
                                                      <h5 className="homes-price txt-overflow">
                                                          <span>
                                                              {
                                                                  suggestion.per_day_formatted
                                                              }{" "}
                                                              {
                                                                  suggestion.per_day_symbol
                                                              }
                                                          </span>{" "}
                                                      </h5>

                                                      <h5 className="rating-sec">
                                                          <span className="rating-star">
                                                              {this.starRatingHost(
                                                                  suggestion.overall_ratings
                                                              )}
                                                          </span>
                                                          <span>
                                                              &nbsp;(
                                                              {
                                                                  suggestion.total_ratings
                                                              }
                                                              )
                                                          </span>
                                                      </h5>
                                                  </div>
                                              </Link>
                                          </div>
                                      ))
                                    : "No suggestion found"}
                                <div>
                                    <Link to="#">
                                        <div className="similar-img-sec">
                                            <img
                                                srcset="../assets/img/home2.jpg,
										             ../assets/img/home2.jpg 1.5x,
										             ../assets/img/home2.jpg 2x"
                                                src="../assets/img/home2.jpg"
                                                alt="image"
                                                className="homes-img"
                                            />
                                        </div>
                                        <div className="homes-text-sec">
                                            <p className="red-text txt-overflow">
                                                Entire cottage{" "}
                                                <span className="dot">
                                                    <i className="fas fa-circle" />
                                                </span>{" "}
                                                Makawao
                                            </p>
                                            <h4 className="homes-title txt-overflow">
                                                adorable garden gingerbread
                                                house
                                            </h4>
                                            <h5 className="homes-price txt-overflow">
                                                <span>$11,651 per night</span>{" "}
                                                <span className="dot">
                                                    <i className="fas fa-circle" />
                                                </span>{" "}
                                                <span>Free cancellation</span>
                                            </h5>
                                            <p className="txt-overflow m-0">
                                                <span className="homes-ratings">
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                </span>
                                                <span className="medium-cls">
                                                    222
                                                </span>
                                                <span className="medium-cls">
                                                    Superhost
                                                </span>
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </Slider>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default TripSimilarListing;
