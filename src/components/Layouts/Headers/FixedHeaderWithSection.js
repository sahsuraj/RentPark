import React, { Component } from "react";

import { Link } from "react-router-dom";

import Helper from "../../Helper/Helper";
import Login from "../../Auth/Login";

import Register from "../../Auth/Register";
import $ from "jquery";
import api from "../../../Environment";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";
import configuration from "react-global-configuration";

class FixedHeaderWithSection extends Helper {
    constructor(props) {
        super(props);
        this.state = {
            categories: null,
            loadingCategory: true,
            data: {},
            isMapVisible: false,
            searchInput: null,
            searchResult: null,
            searchSuggesstionResult: null
        };
    }

    componentDidMount() {
        // Call api function
        // this.getCategory();
    }

    render() {
        const { loadingCategory } = this.state;

        // const count = Object.keys(this.state.data).length;
        let renderDetails;
        if (!localStorage.getItem("userLoginStatus")) {
            renderDetails = (
                <React.Fragment>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to={"/host"}>
                            become A host
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="#"
                            data-toggle="modal"
                            data-target="#signup"
                        >
                            signup
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="#"
                            data-toggle="modal"
                            data-target="#login"
                        >
                            Login
                        </Link>
                    </li>
                </React.Fragment>
            );
        } else {
            renderDetails = (
                <React.Fragment>
                    <li className="nav-item dropdown">
                        <Link
                            className="nav-link dropdown-toggle"
                            to={"/wishlist"}
                            id="navbardrop"
                        >
                            saved
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link
                            to={"/history"}
                            className="nav-link dropdown-toggle"
                            id="navbardrop"
                        >
                            Bookings
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link
                            className="nav-link dropdown-toggle"
                            to={"/inbox"}
                            id="navbardrop"
                        >
                            Inbox{" "}
                            <span className="messages">
                                <i className="fas fa-circle" />
                            </span>
                        </Link>
                    </li>
                    {/* <li className="nav-item dropdown">
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              id="navbardrop"
              data-toggle="dropdown"
            >
              credits
            </Link>
            <div className="dropdown-menu become-host">
              <h5 className="captalize medium-cls">
                Get $1,100 for every friend you invite to SITENAME.{" "}
                <Link to="#"> See terms.</Link>
              </h5>
              <Link to="#" className="green-btn-small top">
                invite friend
              </Link>
            </div>
          </li> */}

                    <li className="nav-item dropdown">
                        <Link
                            to="#"
                            className="nav-link1 dropdown-toggle"
                            id="navbardrop"
                            data-toggle="dropdown"
                        >
                            <img
                                src={
                                    localStorage.getItem("user_picture") ===
                                    null
                                        ? "../assets/img/user-pic.png"
                                        : localStorage.getItem("user_picture")
                                }
                                className="profile-img"
                            />
                        </Link>
                        <div className="dropdown-menu profile-drop">
                            <Link to={"/edit-profile"} className="item">
                                <div className="msg-head">
                                    <h5>edit profile</h5>
                                </div>
                            </Link>
                            <Link to={"/notification"} className="item">
                                <div className="msg-head">
                                    <h5>account settings</h5>
                                </div>
                            </Link>
                            <Link to={"/logout"} className="item">
                                <div className="msg-head">
                                    <h5>logout</h5>
                                </div>
                            </Link>
                        </div>
                    </li>
                </React.Fragment>
            );
        }

        return (
            <div className="sticky-top">
                <header id="navbar" className="">
                    <nav className="navbar navbar-expand-xl bg-light navbar-light white-header">
                        <Link
                            className="navbar-brand"
                            to={
                                localStorage.getItem("userLoginStatus")
                                    ? "/search"
                                    : "/"
                            }
                        >
                            <img
                                data-src={configuration.get(
                                    "configData.site_logo"
                                )}
                                width="150px"
                                src={configuration.get("configData.site_logo")}
                            />
                        </Link>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapsibleNavbar"
                        >
                            <i className="fas fa-chevron-down" />
                        </button>
                        <div
                            className="collapse navbar-collapse justify-content-end"
                            id="collapsibleNavbar"
                        >
                            <ul className="navbar-nav">{renderDetails} </ul>
                        </div>
                    </nav>
                </header>

                <div className="header-height" />

                <Login {...this.props.props} />
                <Register {...this.props.props} />
            </div>
        );
    }
}

export default withToastManager(FixedHeaderWithSection);
