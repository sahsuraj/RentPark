import React, { Component } from "react";

import { Link } from "react-router-dom";

import HostHelper from "../../Helper/hostHelper";

import configuration from "react-global-configuration";

class HostHeader extends HostHelper {
    constructor(props) {
        super(props);
    }

    state = {
        data: {}
    };

    componentDidMount() {
        // Call api function
        // this.getCategories();
    }

    render() {
        let renderDetails;
        if (!localStorage.getItem("hostLoginStatus")) {
            renderDetails = (
                <React.Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" to={"#"}>
                            Help
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/host/register"}>
                            signup
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/host/login"}>
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
                            to={"/host/add-space"}
                            id="navbardrop"
                        >
                            Add Space
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link
                            className="nav-link dropdown-toggle"
                            to={"/host/spaces"}
                            id="navbardrop"
                        >
                            Spaces
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link
                            to={"/host/transaction-history"}
                            className="nav-link dropdown-toggle"
                            id="navbardrop"
                        >
                            History
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link
                            className="nav-link dropdown-toggle"
                            to={"/host/inbox"}
                            id="navbardrop"
                        >
                            messages{" "}
                            <span className="messages">
                                <i className="fas fa-circle" />
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <div className="dropdown-menu become-host">
                            <h5 className="captalize medium-cls">
                                Get $1,100 for every friend you invite to
                                {configuration.get(
                                    "configData.site_name"
                                )}. <Link to="#"> See terms.</Link>
                            </h5>
                            <Link to="#" className="green-btn-small top">
                                invite friend
                            </Link>
                        </div>
                    </li>

                    <li className="nav-item dropdown">
                        <Link
                            to="#"
                            className="nav-link1 dropdown-toggle"
                            id="navbardrop"
                            data-toggle="dropdown"
                        >
                            <img
                                src={
                                    localStorage.getItem("host_picture") ===
                                    null
                                        ? "../assets/img/user-pic.png"
                                        : localStorage.getItem("host_picture")
                                }
                                className="profile-img"
                            />
                        </Link>
                        <div className="dropdown-menu profile-drop">
                            <Link to={"/host/edit-profile"} className="item">
                                <div className="msg-head">
                                    <h5>edit profile</h5>
                                </div>
                            </Link>
                            <Link
                                to={"/host/transaction-history"}
                                className="item"
                            >
                                <div className="msg-head">
                                    <h5>Revenue Details</h5>
                                </div>
                            </Link>
                            <Link to={"/host/logout"} className="item">
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
                <nav
                    className="navbar navbar-expand-xl bg-light navbar-light white-header "
                    id="navbar"
                >
                    <Link className="navbar-brand" to={"/host/dashboard"}>
                        <img
                            data-src={configuration.get("configData.site_logo")}
                            src={configuration.get("configData.site_logo")}
                        />
                    </Link>
                    {/* <form className="form-inline justify-content-start">
                        <div className="input-group dropdown">
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon">
                            <i className="fas fa-search" />
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control form-control-lg dropdown-toggle"
                            data-toggle="dropdown"
                            placeholder="try 'london'"
                        />

                        <div className="dropdown-menu nav-dropdown-menu">
                            <h5 className="dropdown-title">explore SITENAME</h5>
                            <Link to="#" className="grey-outline-btn">
                            all
                            </Link>
                            {this.renderCategory("grey-outline-btn")}
                            <h5 className="dropdown-title top">recent searches</h5>
                            <Link to="#">
                            <div className="recent-search display-inline">
                                <div className="recent-search-left">
                                <div>
                                    <i className="far fa-clock" />
                                </div>
                                </div>
                                <div className="recent-search-right">
                                <h5 className="medium-cls mt-0">India</h5>
                                <h5 className="mb-0">
                                    <span className="captalize">7 jun - 14 jun</span>
                                    <span className="dot">
                                    <i className="fas fa-circle" />
                                    </span>
                                    <span>2 guests, 1 infant</span>
                                </h5>
                                </div>
                            </div>
                            </Link>
                        </div>
                        </div>
                    </form> */}
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
                        <ul className="navbar-nav">{renderDetails}</ul>
                    </div>
                </nav>

                <div className="header-height" />
            </div>
        );
    }
}

export default HostHeader;
