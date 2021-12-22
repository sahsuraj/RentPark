import React, { Component } from "react";
import InputField from "../Helper/inputfield";
import Helper from "../Helper/Helper";
import api from "../../HostEnvironment";
import { apiConstants } from "../Constant/constants";

class CalForm extends Helper {
  state = {
    data: {
      email: "",
      password: ""
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { state } = this.props.location;

    await api
      .postMethod("provider/login", this.state.data)
      .then(function(response) {
        if (response.data.success === true) {
          localStorage.setItem("hostId", response.data.data.provider_id);
          localStorage.setItem("accessToken", response.data.data.token);
          localStorage.setItem("hostLoginStatus", true);

          window.location = state ? state.from.pathname : "/host/dashboard";
        }
      })
      .catch(function(error) {});
  };

  render() {
    const { data } = this.state;
    return (
      <div className="col-md-6 col-lg-6 col-xl-5 offset-xl-2 host-banner-aligncenter dis-xs-none dis-sm-none">
        <div>
          <div className="host-details-sec">
            <div className="host-details-head">
              <h2>Find out what top hosts earn in your area</h2>
            </div>
            <form className="host" onSubmit={this.handleSubmit}>
              <InputField
                type="text"
                name="email"
                onChange={this.handleChange}
                placeholder="email"
                iconClassName="fas fa-lock"
                value={data.email}
              />

              <InputField
                type="password"
                name="password"
                onChange={this.handleChange}
                placeholder="password"
                iconClassName="fas fa-lock"
                value={data.password}
              />

              <p className="show-pass">show password</p>

              <button className="pink-btn bottom1">login</button>
              <a
                href="#"
                className="forgot-pass close-login"
                data-toggle="modal"
                data-target="#forgot-password"
              >
                forgot password?
              </a>
            </form>

            {/* <form className="host">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="bangaluru"
                />
              </div>
              <div className="select">
                <select>
                  <option>4 guests</option>
                  <option>1 guests</option>
                  <option>2 guests</option>
                  <option>3 guests</option>
                  <option>4 guests</option>
                </select>
              </div>
              <div className="clearfix" />
              <div className="select">
                <select>
                  <option>Entire palce</option>
                  <option>Private room</option>
                  <option>shared room</option>
                </select>
              </div>
              <div className="clearfix" />
              <div>
                <h1 className="amount">₹18,296</h1>
                <h4 className="amount-subhead">per month</h4>
              </div>
              <div className="mt-4">
                <button className="pink-btn">get started</button>
              </div>
            </form> */}
          </div>
        </div>
      </div>
    );
  }
}

export default CalForm;
