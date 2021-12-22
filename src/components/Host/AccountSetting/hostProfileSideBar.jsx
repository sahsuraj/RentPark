import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class HostProfileSideBar extends Component {
  constructor(props) {
    super(props);

    // States and props usage
  }
  state = {};

  render() {
    return (
      <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3">
        <ul className="account-list">
          <li>
            <NavLink activeClassName="active" to={"/host/edit-profile"}>
              edit profile
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={"/host/photo"}>
              photos
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="active"
              to={"/host/document-verification"}
            >
              Document Verificaiton
            </NavLink>
          </li>

          <li>
            <NavLink activeClassName="active" to={"/host/payment"}>
              payment method
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={"/host/notification"}>
              notifications
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={"/host/change-password"}>
              change password
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={"/host/review"}>
              reviews
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={"/host/delete-account"}>
              delete account
            </NavLink>
          </li>
        </ul>
        <Link
          to={"/host/profile"}
          className="grey-outline-btn w-100 bottom btn-small"
        >
          view profile
        </Link>
      </div>
    );
  }
}

export default HostProfileSideBar;
