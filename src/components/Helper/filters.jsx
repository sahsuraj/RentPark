import React, { Component } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { DatePicker, RangeDatePicker } from "@y0c/react-datepicker";
import api from "../../Environment";

class Filters extends Component {
  state = {
    value: { min: 0, max: 10000 },
    adults: 0,
    children: 0,
    infants: 0,
    from_date: null,
    to_date: null,
    host_id: null,
    loading: true,
    mapView: true,
    hostTypeData: {},
    priceChange: false,
    total_guest: 0,
    total_home_type: 0
  };
  componentDidMount() {}

  searchResultApiCall = () => {
    const {
      adults,
      children,
      infants,
      from_date,
      to_date,
      hostTypeData,
      priceChange
    } = this.state;

    let formData;

    if (adults != 0) {
      formData = {
        adults: adults
      };
    }
    if (children != 0) {
      formData = {
        ...formData,
        children: children
      };
    }
    if (infants != 0) {
      formData = {
        ...formData,
        infants: infants
      };
    }

    if (from_date != null) {
      formData = {
        ...formData,
        from_date: from_date
      };
    }

    if (to_date != null) {
      formData = {
        ...formData,
        to_date: to_date
      };
    }
    if (hostTypeData != {}) {
      formData = {
        ...formData,
        ...hostTypeData
      };
    }

    if (priceChange) {
      const price = {
        min_input: this.state.value.min,
        max_input: this.state.value.max
      };
      const inputData = {
        price: JSON.stringify(price)
      };
      formData = {
        ...formData,
        ...inputData
      };
    }

    api
      .postMethod("search_result", formData)
      .then(response => {
        if (response.data.success === true) {
          this.props.props.history.push("/search", response.data.data);
        } else {
          // ToastDemo(this.props.toastManager, response.data.error, "error");
        }
      })
      .catch(function(error) {});
  };
  convert(str) {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return "Date", [date.getFullYear(), mnth, day].join("-");
  }

  onChangeDate = title => (...args) => {
    const from_date = this.convert(args[0]);
    const to_date = this.convert(args[1]);

    if (to_date == "NaN-aN-aN") {
      this.setState({ from_date: from_date });
    } else {
      this.setState({ from_date: from_date, to_date: to_date });
    }

    if (this.state.from_date != null && this.state.to_date != null) {
      this.searchResultApiCall();
    }
  };
  increament = value => {
    //
    // $("#guest-mobile-btn").dropdown("toggle");

    if (value == "adults") {
      this.setState({
        adults: this.state.adults + 1,
        total_guest: this.state.total_guest + 1
      });
    }
    if (value == "children") {
      this.setState({
        children: this.state.children + 1,
        total_guest: this.state.total_guest + 1
      });
    }
    if (value == "infants") {
      this.setState({
        infants: this.state.infants + 1,
        total_guest: this.state.total_guest + 1
      });
    }
  };

  decreament = value => {
    if (value == "adults") {
      this.setState({
        adults: this.state.adults - 1,
        total_guest: this.state.total_guest - 1
      });
    }
    if (value == "children") {
      this.setState({
        children: this.state.children - 1,
        total_guest: this.state.total_guest - 1
      });
    }
    if (value == "infants") {
      this.setState({
        infants: this.state.infants - 1,
        total_guest: this.state.total_guest - 1
      });
    }
  };

  handleMap = event => {
    event.preventDefault();
    this.setState({ mapView: !this.state.mapView });
    if (this.props.toggleMap) {
      this.props.toggleMap(!this.state.mapView);
    }
  };
  displayMoreFilter = event => {
    event.preventDefault();
    $("#more-filters-content").toggleClass("dis-block");
  };

  closeFilterView = event => {
    event.preventDefault();
    $("#mobile-guest-content").slideUp();
  };

  handlChange = ({ currentTarget: input }) => {
    const hostTypeData = { ...this.state.hostTypeData };
    if (input.checked) {
      if (hostTypeData[input.name] === undefined) {
        let array = [];
        array.push(input.value);
        hostTypeData[input.name] = array;
        this.setState({ hostTypeData });
        this.setState({ total_home_type: this.state.total_home_type + 1 });
      } else {
        hostTypeData[input.name].push(input.value);
        this.setState({ hostTypeData });
        this.setState({ total_home_type: this.state.total_home_type + 1 });
      }
    } else {
      let index = hostTypeData[input.name].indexOf(input.value);
      if (index !== -1) {
        hostTypeData[input.name].splice(index, 1);
        this.setState({ hostTypeData });
        this.setState({ total_home_type: this.state.total_home_type - 1 });
      }
    }
  };

  handleGuest = event => {
    event.preventDefault();
    this.searchResultApiCall();
  };

  handleCancelButton = event => {
    event.preventDefault();
    this.setState({
      adults: 0,
      children: 0,
      infants: 0,
      formData: {}
    });
  };

  handleHomeType = event => {
    event.preventDefault();
    this.searchResultApiCall();
  };

  handlePrice = () => {
    this.setState({ priceChange: true });
    this.searchResultApiCall();
  };

  render() {
    return (
      <div>
        <div className="section-spacing sub-nav">
          <ul className="filters">
            <li className="dropdown">
              <button className="dropdown-toggle" data-toggle="dropdown">
                {this.state.from_date != null
                  ? this.state.from_date + " - "
                  : "Dates"}
                {this.state.to_date != null ? this.state.to_date : ""}
              </button>
              <div className="dropdown-menu">
                <RangeDatePicker
                  onChange={this.onChangeDate("Range DatePicker")}
                  className="form-control form-control-lg"
                />
              </div>
            </li>
            <li className="dropdown">
              <button
                className="dropdown-toggle"
                id="guest-mobile-btn"
                data-toggle="dropdown"
              >
                {this.state.total_guest != 0 ? this.state.total_guest : ""}
                guests
              </button>
              <div className="dropdown-menu guest">
                <form className="inc-dec-count">
                  <div className="row">
                    <div className="col-6 col-sm-6">
                      <label htmlFor="name">adults</label>
                    </div>
                    <div className="col-6 col-sm-6 text-right">
                      <div className="float-right">
                        <div
                          className="decrement-btn"
                          onClick={() => this.decreament("adults")}
                        >
                          <div className="dec button">
                            <i className="fas fa-minus" />
                          </div>
                        </div>
                        <input
                          type="text"
                          value={this.state.adults}
                          name="adults"
                        />
                        <div
                          className="increment-btn"
                          onClick={() => this.increament("adults")}
                        >
                          <div className="inc button">
                            <i className="fas fa-plus" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6 col-sm-6">
                      <label htmlFor="name">children</label>
                    </div>
                    <div className="col-6 col-sm-6 text-right">
                      <div className="float-right">
                        <div
                          className="decrement-btn"
                          onClick={() => this.decreament("children")}
                        >
                          <div className="dec button">
                            <i className="fas fa-minus" />
                          </div>
                        </div>
                        <input
                          type="text"
                          value={this.state.children}
                          name="children"
                        />
                        <div
                          className="increment-btn"
                          onClick={() => this.increament("children")}
                        >
                          <div className="inc button">
                            <i className="fas fa-plus" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6 col-sm-6">
                      <label htmlFor="name">infants</label>
                    </div>
                    <div className="col-6 col-sm-6 text-right">
                      <div className="float-right">
                        <div
                          className="decrement-btn"
                          onClick={() => this.decreament("infants")}
                        >
                          <div className="dec button">
                            <i className="fas fa-minus" />
                          </div>
                        </div>
                        <input
                          type="text"
                          value={this.state.infants}
                          name="infants"
                        />
                        <div
                          className="increment-btn"
                          onClick={() => this.increament("infants")}
                        >
                          <div className="inc button">
                            <i className="fas fa-plus" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6">
                      <Link
                        to="#"
                        className="cancel-link"
                        onClick={this.handleCancelButton}
                      >
                        cancel
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        to="#"
                        className="submit-link"
                        onClick={this.handleGuest}
                      >
                        submit
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            <li className="dis-xs-none dropdown">
              <button className="dropdown-toggle" data-toggle="dropdown">
                {this.state.total_home_type != 0
                  ? "Home Type - " + this.state.total_home_type
                  : "Type Of Place"}
              </button>
              <div className="dropdown-menu guest account">
                <form>
                  <div>
                    <label className="form-checkbox mb-0">
                      Entire place
                      <input
                        type="checkbox"
                        name="host_type"
                        onChange={this.handlChange}
                        value="Entire Room"
                      />
                      <span className="checkmark" />
                    </label>
                    <h5 className="profile-note ml-35 mt-0">
                      Have Link place to yourself
                    </h5>
                  </div>

                  <label className="form-checkbox mb-0">
                    Private place
                    <input
                      type="checkbox"
                      name="host_type"
                      onChange={this.handlChange}
                      value="Private Room"
                    />
                    <span className="checkmark" />
                  </label>
                  <h5 className="profile-note ml-35 mt-0">
                    Have your own room and share some common spaces
                  </h5>

                  <label className="form-checkbox mb-0">
                    shared room
                    <input
                      type="checkbox"
                      name="host_type"
                      onChange={this.handlChange}
                      value="Shared Room"
                    />
                    <span className="checkmark" />
                  </label>
                  <h5 className="profile-note ml-35 mt-0">
                    Stay in Link shared space, like Link common room
                  </h5>

                  <div className="row">
                    <div className="col-6 mt-3">
                      <button
                        className="cancel-link"
                        onClick={this.handleCancelButton}
                      >
                        cancel
                      </button>
                    </div>
                    <div className="col-6 mt-3">
                      <button
                        className="submit-link"
                        onClick={this.handleHomeType}
                      >
                        submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            <li className="dis-xs-none dropdown">
              <button className="dropdown-toggle" data-toggle="dropdown">
                {this.state.value.min != 0
                  ? this.state.value.min + " - " + this.state.value.max
                  : "price"}
              </button>
              <div className="dropdown-menu  guest">
                <p className="mt-0 bottom" />
                <p className="bottom" />

                <InputRange
                  maxValue={10000}
                  minValue={0}
                  formatLabel={value => `${value} $`}
                  value={this.state.value}
                  onChange={value => this.setState({ value: value })}
                  onChangeComplete={this.handlePrice}
                />
              </div>
            </li>
            {this.props.match.path == "/see_all/:name/:id/:url_type" ||
            this.props.match.path == "/search" ? (
              <li
                className="toggle-btn dis-xs-none dis-sm-none dis-md-none"
                id="map-toggle-btn"
                onClick={this.handleMap}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.mapView}
                    className="ios-switch"
                  />
                  <div>
                    <div />
                  </div>
                </label>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>

        <div className="mobile-guest-dropdown" id="mobile-guest-content">
          <div className="mobile-guest-dropdown-head">
            <h4>
              <span>
                <i
                  className="material-icons"
                  id="guest-mobile-closebtn"
                  onClick={this.closeFilterView}
                >
                  close
                </i>
              </span>
              <span className="submit-link mt-1">clear</span>
            </h4>
          </div>
          <div className="mobile-guest-dropdown-content">
            <li className="dropdown">
              <button
                className="dropdown-toggle"
                id="guest-mobile-btn"
                data-toggle="dropdown"
              >
                guests
              </button>
              <div className="dropdown-menu guest">
                <form className="inc-dec-count">
                  <div className="row">
                    <div className="col-6 col-sm-6">
                      <label htmlFor="name">adults</label>
                    </div>
                    <div className="col-6 col-sm-6 text-right">
                      <div className="float-right">
                        <div className="decrement-btn">
                          <div className="dec button">
                            <i className="fas fa-minus" />
                          </div>
                        </div>
                        <input type="text" defaultValue="3" />
                        <div className="increment-btn">
                          <div className="inc button">
                            <i className="fas fa-plus" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6 col-sm-6">
                      <label htmlFor="name">children</label>
                    </div>
                    <div className="col-6 col-sm-6 text-right">
                      <div className="float-right">
                        <div className="decrement-btn">
                          <div className="dec button">
                            <i className="fas fa-minus" />
                          </div>
                        </div>
                        <input type="text" defaultValue="3" />
                        <div className="increment-btn">
                          <div className="inc button">
                            <i className="fas fa-plus" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6 col-sm-6">
                      <label htmlFor="name">infants</label>
                    </div>
                    <div className="col-6 col-sm-6 text-right">
                      <div className="float-right">
                        <div className="decrement-btn">
                          <div className="dec button">
                            <i className="fas fa-minus" />
                          </div>
                        </div>
                        <input type="text" defaultValue="3" />
                        <div className="increment-btn">
                          <div className="inc button">
                            <i className="fas fa-plus" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6">
                      <Link to="#" className="cancel-link">
                        cancel
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link to="#" className="submit-link">
                        submit
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            <form className="inc-dec-count">
              <div className="row">
                <div className="col-6 col-sm-6">
                  <label htmlFor="name">adults</label>
                </div>
                <div className="col-6 col-sm-6 text-right">
                  <div className="float-right">
                    <div className="decrement-btn">
                      <div className="dec button">
                        <i className="fas fa-minus" />
                      </div>
                    </div>
                    <input type="text" defaultValue="3" />
                    <div className="increment-btn">
                      <div className="inc button">
                        <i className="fas fa-plus" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-6 col-sm-6">
                  <label htmlFor="name">children</label>
                </div>
                <div className="col-6 col-sm-6 text-right">
                  <div className="float-right">
                    <div className="decrement-btn">
                      <div className="dec button">
                        <i className="fas fa-minus" />
                      </div>
                    </div>
                    <input type="text" defaultValue="3" />
                    <div className="increment-btn">
                      <div className="inc button">
                        <i className="fas fa-plus" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-6 col-sm-6">
                  <label htmlFor="name">infants</label>
                </div>
                <div className="col-6 col-sm-6 text-right">
                  <div className="float-right">
                    <div className="decrement-btn">
                      <div className="dec button">
                        <i className="fas fa-minus" />
                      </div>
                    </div>
                    <input type="text" defaultValue="3" />
                    <div className="increment-btn">
                      <div className="inc button">
                        <i className="fas fa-plus" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="mobile-guest-dropdown-footer">
            <button className="green-btn btn-block btn-lg">show results</button>
          </div>
        </div>

        <div className="more-filters" id="more-filters-content">
          <form className="inc-dec-count">
            <div>
              <h4 className="more-filters-head">Rooms and beds</h4>
              <div className="row">
                <div className="col-6 col-sm-6">
                  <label htmlFor="name">beds</label>
                </div>
                <div className="col-6 col-sm-6 text-right">
                  <div className="float-right">
                    <div className="decrement-btn">
                      <div className="dec button">
                        <i className="fas fa-minus" />
                      </div>
                    </div>
                    <input type="text" defaultValue="3" />
                    <div className="increment-btn">
                      <div className="inc button">
                        <i className="fas fa-plus" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-6 col-sm-6">
                  <label htmlFor="name">bedrooms</label>
                </div>
                <div className="col-6 col-sm-6 text-right">
                  <div className="float-right">
                    <div className="decrement-btn">
                      <div className="dec button">
                        <i className="fas fa-minus" />
                      </div>
                    </div>
                    <input type="text" defaultValue="3" />
                    <div className="increment-btn">
                      <div className="inc button">
                        <i className="fas fa-plus" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-6 col-sm-6">
                  <label htmlFor="name">bathrooms</label>
                </div>
                <div className="col-6 col-sm-6 text-right">
                  <div className="float-right">
                    <div className="decrement-btn">
                      <div className="dec button">
                        <i className="fas fa-minus" />
                      </div>
                    </div>
                    <input type="text" defaultValue="3" />
                    <div className="increment-btn">
                      <div className="inc button">
                        <i className="fas fa-plus" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="overview-line" />

            <div className="show-mob">
              <h4 className="more-filters-head">home type</h4>
              <div className="account">
                <label className="form-checkbox mb-0 mt-3">
                  entrire place
                  <input type="checkbox" />
                  <span className="checkmark" />
                </label>
                <h5 className="profile-note ml-35 mt-0">
                  have Link place to yourself
                </h5>

                <label className="form-checkbox mb-0 mt-3">
                  private place
                  <input type="checkbox" defaultChecked="checked" />
                  <span className="checkmark" />
                </label>
                <h5 className="profile-note ml-35 mt-0">
                  Have your own room and share some common spaces
                </h5>

                <label className="form-checkbox mb-0 mt-3">
                  shared room
                  <input type="checkbox" defaultChecked="checked" />
                  <span className="checkmark" />
                </label>
                <h5 className="profile-note ml-35 mt-0">
                  Stay in Link shared space, like Link common room
                </h5>
              </div>
              <p className="overview-line" />
            </div>

            <div className="show-mob">
              <h4 className="more-filters-head">price details</h4>
              <div className="guest">
                <p className="mt-0 bottom">₹680 - ₹50000+</p>
                <p className="bottom">The average nightly price is ₹5465.</p>
                <input
                  data-addui="slider"
                  data-min="-5"
                  data-max="5"
                  data-range="true"
                  defaultValue="-2,2"
                />
              </div>
              <p className="overview-line" />
            </div>

            <div>
              <h4 className="more-filters-head">Amenities</h4>
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="mb-3">
                    <label className="form-checkbox mb-0">
                      kitchen
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="mb-3">
                    <label className="form-checkbox mb-0">
                      heating
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="mb-3">
                    <label className="form-checkbox mb-0">
                      shampoo
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="mb-3">
                    <label className="form-checkbox mb-0">
                      air conditioning
                      <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="collapse-content">
                <h4
                  className="collapse-head captalize show"
                  data-toggle="collapse"
                  data-target="#rules"
                >
                  show all aminities <i className="fas fa-chevron-down" />{" "}
                </h4>
                <div id="rules" className="collapse">
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="mb-3">
                        <label className="form-checkbox mb-0">
                          kitchen
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="mb-3">
                        <label className="form-checkbox mb-0">
                          heating
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="mb-3">
                        <label className="form-checkbox mb-0">
                          shampoo
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="mb-3">
                        <label className="form-checkbox mb-0">
                          air conditioning
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <h4
                    className="collapse-foot captalize hide"
                    data-toggle="collapse"
                    data-target="#rules"
                  >
                    hide <i className="fas fa-chevron-up" />
                  </h4>
                </div>
              </div>
            </div>
            <p className="overview-line" />

            <div className="more-filters-footer">
              <div className="text-right">
                <button className="cancel-link mr-3">cancel</button>
                <button className="green-btn">show 300+ homes</button>
              </div>
            </div>
          </form>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

export default Filters;
