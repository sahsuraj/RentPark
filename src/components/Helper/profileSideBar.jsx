import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class ProfileSideBar extends Component {
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
            <NavLink activeClassName="active" to={"/edit-profile"}>
              edit profile
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={"/photo"}>
              photos
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={"/notification"}>
              notifications
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={"/vehicles"}>
              Vehicle
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={"/user-payment"}>
              payment method
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={"/change-password"}>
              change password
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={"/user-review"}>
              reviews
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to={"/delete-account"}>
              delete account
            </NavLink>
          </li>
        </ul>
        <Link
          to={"/user-profile"}
          className="grey-outline-btn w-100 bottom btn-small"
        >
          view profile
        </Link>
      </div>
    );
  }
}

export default ProfileSideBar;
