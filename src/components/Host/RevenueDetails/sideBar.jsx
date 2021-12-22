import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class SideBar extends Component {
    state = {};
    render() {
        return (
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3">
                <ul className="account-list">
                    <li>
                        <NavLink
                            activeClassName="active"
                            to={"/host/dashboard"}
                        >
                            dashboard
                        </NavLink>
                    </li>
                    <li className="active">
                        <NavLink
                            activeClassName="active"
                            to={"/host/transaction-history"}
                        >
                            Transactions History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName="active"
                            to={"/host/subscriptions"}
                        >
                            Subscriptions
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName="active"
                            to={"/host/subscription-history"}
                        >
                            Subscription History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName="active"
                            to={"/host/booking-management"}
                        >
                            Booking Management
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to={"/host/spaces"}>
                            Space Management
                        </NavLink>
                    </li>
                </ul>
                <Link
                    to={"/host/edit-profile"}
                    className="grey-outline-btn w-100 bottom btn-small"
                >
                    Account Settings
                </Link>
            </div>
        );
    }
}

export default SideBar;
