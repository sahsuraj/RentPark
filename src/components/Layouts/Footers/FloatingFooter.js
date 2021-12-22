import React, { Component } from "react";

import { Link } from "react-router-dom";

import configuration from "react-global-configuration";

import $ from "jquery";

class FloatingFooter extends Component {
    state = {
        footer_first_section: [],
        footer_second_section: [],
        footer_third_section: [],
        footer_fourth_section: []
    };
    constructor(props) {
        super(props);

        // States and props usage
    }

    componentDidMount() {
        // Call api function

        if (configuration.get("configData.footer_first_section")) {
            this.setState({
                footer_first_section: configuration.get(
                    "configData.footer_first_section"
                )
            });
        }

        if (configuration.get("configData.footer_second_section")) {
            this.setState({
                footer_second_section: configuration.get(
                    "configData.footer_second_section"
                )
            });
        }

        if (configuration.get("configData.footer_third_section")) {
            this.setState({
                footer_third_section: configuration.get(
                    "configData.footer_third_section"
                )
            });
        }

        if (configuration.get("configData.footer_fourth_section")) {
            this.setState({
                footer_fourth_section: configuration.get(
                    "configData.footer_fourth_section"
                )
            });
        }
    }

    handleFooterClick = event => {
        event.preventDefault();
        $("#terms-btn").toggleClass("terms-btn");
        $(".floating-footer").slideToggle();
    };

    render() {
        return (
            <div>
                <div className="footer-height" />
                <div className="footer row">
                    <div className="site-content">
                        <div className="home-footer-section">
                            <div className="row m-0">
                                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 p-0">
                                    <div className="home-footer-spacing footer-border">
                                        <div className="display-inline">
                                            <div className="footer-leftside">
                                                <i
                                                    className="fas fa-phone fa-lg"
                                                    data-fa-transform="rotate-90"
                                                />
                                            </div>
                                            <div className="footer-rightside">
                                                <ul className="footer-content-list">
                                                    <li className="bold-cls mbs-5">
                                                        24/7 customer support
                                                    </li>
                                                    <li className="grey-clr">
                                                        if you need help while
                                                        travelling or hosting,
                                                        contact us at our toll
                                                        free number: 000 800
                                                        4405 103
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="clearfix" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 p-0">
                                    <div className="home-footer-spacing footer-border">
                                        <div className="display-inline">
                                            <div className="footer-leftside">
                                                <i className="fas fa-address-book fa-lg" />
                                            </div>
                                            <div className="footer-rightside">
                                                <ul className="footer-content-list">
                                                    <li className="bold-cls mbs-5">
                                                        $6,00,00,000 host
                                                        gurantee
                                                    </li>
                                                    <li className="grey-clr">
                                                        hosts are protected
                                                        against property damages
                                                        up to $6,00,00,000.{" "}
                                                        <Link
                                                            to="#"
                                                            className="captalize"
                                                        >
                                                            learn more
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="clearfix" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 p-0">
                                    <div className="home-footer-spacing">
                                        <div className="display-inline">
                                            <div className="footer-leftside">
                                                <i className="far fa-id-card fa-lg" />
                                            </div>
                                            <div className="footer-rightside">
                                                <ul className="footer-content-list">
                                                    <li className="bold-cls mbs-5">
                                                        verified ID
                                                    </li>
                                                    <li className="grey-clr">
                                                        we aim to build a
                                                        trusted comunity by
                                                        giving you more info
                                                        when you are deciding
                                                        who to host or stay
                                                        with.
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="clearfix" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="floating-button">
                        <button
                            className="white-btn btn-small high-shadow"
                            id="terms-btn"
                            onClick={this.handleFooterClick}
                        >
                            <span className="terms-txt">
                                <i className="fas fa-globe" /> terms, privacy,
                                currency & more
                            </span>
                            <span className="close-txt">
                                <i className="fas fa-times" /> close
                            </span>
                        </button>
                    </div>
                    <div className="floating-footer">
                        <div className="site-content">
                            <div className="home-footer-section  top-bottom-spacing top-1">
                                <div className="row m-0">
                                    <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 p-0">
                                        <div>
                                            <h5 className="bold-cls m-0 captalize">
                                                {configuration.get(
                                                    "configData.site_name"
                                                )}
                                            </h5>
                                            <ul className="footer-listings">
                                                {this.state.footer_first_section
                                                    .length > 0
                                                    ? this.state.footer_first_section.map(
                                                          (
                                                              static_page,
                                                              index
                                                          ) => (
                                                              <li>
                                                                  <Link
                                                                      to={`/page/${
                                                                          static_page.unique_id
                                                                      }`}
                                                                      target="_blank"
                                                                  >
                                                                      {
                                                                          static_page.title
                                                                      }
                                                                  </Link>
                                                              </li>
                                                          )
                                                      )
                                                    : ""}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 p-0">
                                        <div>
                                            <h5 className="bold-cls m-0 captalize">
                                                Discover
                                            </h5>
                                            <ul className="footer-listings">
                                                {this.state
                                                    .footer_second_section
                                                    .length > 0
                                                    ? this.state.footer_second_section.map(
                                                          (
                                                              static_page,
                                                              index
                                                          ) => (
                                                              <li>
                                                                  <Link
                                                                      to={`/page/${
                                                                          static_page.unique_id
                                                                      }`}
                                                                      target="_blank"
                                                                  >
                                                                      {
                                                                          static_page.title
                                                                      }
                                                                  </Link>
                                                              </li>
                                                          )
                                                      )
                                                    : ""}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 p-0">
                                        <div>
                                            <h5 className="bold-cls m-0 captalize">
                                                Hosting
                                            </h5>
                                            <ul className="footer-listings">
                                                {this.state.footer_third_section
                                                    .length > 0
                                                    ? this.state.footer_third_section.map(
                                                          (
                                                              static_page,
                                                              index
                                                          ) => (
                                                              <li>
                                                                  <Link
                                                                      to={`/page/${
                                                                          static_page.unique_id
                                                                      }`}
                                                                      target="_blank"
                                                                  >
                                                                      {
                                                                          static_page.title
                                                                      }
                                                                  </Link>
                                                              </li>
                                                          )
                                                      )
                                                    : ""}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 p-0">
                                        <div>
                                            <h5 className="m-0 footer-icons">
                                                {configuration.get(
                                                    "configData.facebook_link"
                                                ) ? (
                                                    <span>
                                                        <a
                                                            target="_blank"
                                                            href={configuration.get(
                                                                "configData.facebook_link"
                                                            )}
                                                        >
                                                            <i className="fab fa-facebook-f" />
                                                        </a>
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                                {configuration.get(
                                                    "configData.twitter_link"
                                                ) ? (
                                                    <span>
                                                        <a
                                                            target="_blank"
                                                            href={configuration.get(
                                                                "configData.twitter_link"
                                                            )}
                                                        >
                                                            <i className="fab fa-twitter" />
                                                        </a>
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                                <span>
                                                    {configuration.get(
                                                        "configData.instagram_link"
                                                    ) ? (
                                                        <a
                                                            target="_blank"
                                                            href={configuration.get(
                                                                "configData.instagram_link"
                                                            )}
                                                        >
                                                            <i className="fab fa-instagram" />
                                                        </a>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {configuration.get(
                                                        "configData.linkedin_link"
                                                    ) ? (
                                                        <a
                                                            target="_blank"
                                                            href={configuration.get(
                                                                "configData.linkedin_link"
                                                            )}
                                                        >
                                                            <i className="fab fa-linkedin" />
                                                        </a>
                                                    ) : (
                                                        ""
                                                    )}
                                                </span>
                                            </h5>
                                            <ul className="footer-listings">
                                                {this.state
                                                    .footer_fourth_section
                                                    .length > 0
                                                    ? this.state.footer_fourth_section.map(
                                                          (
                                                              static_page,
                                                              index
                                                          ) => (
                                                              <li>
                                                                  <Link
                                                                      to={`/page/${
                                                                          static_page.unique_id
                                                                      }`}
                                                                      target="_blank"
                                                                  >
                                                                      {
                                                                          static_page.title
                                                                      }
                                                                  </Link>
                                                              </li>
                                                          )
                                                      )
                                                    : ""}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p className="overview-line" />
                                <h5 className="captalize m-0">
                                    <i className="far fa-copyright small1" />{" "}
                                    {configuration.get("configData.site_name")}.
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FloatingFooter;
