import React, { Component } from "react";

import { Link } from "react-router-dom";

import configuration from "react-global-configuration";

class HelpSection extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Call api function
    }

    render() {
        return (
            <div className="help-section" id="help-sec">
                <div className="help-head">
                    <h4>
                        {configuration.get("configData.site_name")} Help{" "}
                        <span id="help-close">
                            <i className="material-icons">close</i>
                        </span>
                    </h4>
                </div>
                <div className="help-body">
                    <form className="form-inline justify-content-start">
                        <div className="input-group dropdown">
                            <div className="input-group-append">
                                <span
                                    className="input-group-text"
                                    id="basic-addon"
                                >
                                    <i className="fas fa-search" />
                                </span>
                            </div>
                            <input
                                type="text"
                                className="form-control form-control-lg dropdown-toggle"
                                data-toggle="dropdown"
                                placeholder="try 'london'"
                            />
                        </div>
                    </form>
                    <h5 className="help-body-head">suggested topics</h5>
                    <div id="accordion">
                        <div className="card">
                            <div className="card-header">
                                <Link
                                    className="card-link"
                                    data-toggle="collapse"
                                    to="#collapseOne"
                                >
                                    reservation request{" "}
                                    <span className="float-right">
                                        <i className="fas fa-chevron-down" />
                                    </span>
                                </Link>
                            </div>
                            <div
                                id="collapseOne"
                                className="collapse"
                                data-parent="#accordion"
                            >
                                <div className="card-body">
                                    <Link to="#">
                                        can I book on behalf of Link friend or
                                        family member?
                                    </Link>
                                    <Link to="#">
                                        can I view Link listing before I book?
                                    </Link>
                                    <Link to="#">
                                        how much time does Link host have to
                                        respond to my reservation request?
                                    </Link>
                                    <Link to="#">
                                        how do I submit Link reservation
                                        request?
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <Link
                                    className="card-link"
                                    data-toggle="collapse"
                                    to="#collapseTwo"
                                >
                                    Prices & fees{" "}
                                    <span className="float-right">
                                        <i className="fas fa-chevron-down" />
                                    </span>
                                </Link>
                            </div>
                            <div
                                id="collapseTwo"
                                className="collapse"
                                data-parent="#accordion"
                            >
                                <div className="card-body">
                                    <Link to="#">
                                        how is the price determined for my
                                        reservation?
                                    </Link>
                                    <Link to="#">
                                        Can I pay with any currency?
                                    </Link>
                                    <Link to="#">
                                        Where can I find check-in information
                                        for my trip?
                                    </Link>
                                    <Link to="#">
                                        How do I pay for my long-term
                                        reservation?
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <Link
                                    className="card-link"
                                    data-toggle="collapse"
                                    to="#collapseThree"
                                >
                                    Preparing for your trip
                                    <span className="float-right">
                                        <i className="fas fa-chevron-down" />
                                    </span>
                                </Link>
                            </div>
                            <div
                                id="collapseThree"
                                className="collapse"
                                data-parent="#accordion"
                            >
                                <div className="card-body">
                                    <Link to="#">
                                        How can I be Link considerate guest?
                                    </Link>
                                    <Link to="#">
                                        How do I coordinate check-in details
                                        with my host?
                                    </Link>
                                    <Link to="#">
                                        I can’t get in touch with my host
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="help-footer">
                    <Link to="#" className="green-btn btn-block">
                        visit the help center
                    </Link>
                    <Link to="#" className="btn-link mt-3">
                        give feedback
                    </Link>
                </div>
            </div>
        );
    }
}

export default HelpSection;
