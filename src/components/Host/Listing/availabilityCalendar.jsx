import React, { Component } from "react";
import api from "../../../HostEnvironment";
import { Link } from "react-router-dom";
import Loader from "../../Helper/Loader";
import HostHelper from "../../Helper/hostHelper";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";
import { DatePicker } from "@y0c/react-datepicker";
import dayjs from "dayjs";
import "../../../../src/calendar.scss";

const onlyMonth = {
  month: "numeric"
};
const onlyYear = {
  year: "numeric"
};

class HostAvailability extends Component {
  state = {
    selected: [],
    num: 1,
    availabilities: null,
    loading: true,
    removed: true,
    formData: {},
    loadingContent: null,
    buttonDisable: false,
    availability_lists: null,
    skipCount: 0,
    loadingStatus: true,
    loadingButtonContent: null
  };
  componentDidMount() {
    this.getAvailabilityListApiCall();
  }

  handleDelete = (event, available_days) => {
    event.preventDefault();
    api
      .postMethod("host_availability_list_delete", {
        host_availability_id: available_days.host_availability_id
      })
      .then(response => {
        if (response.data.success) {
          ToastDemo(this.props.toastManager, response.data.message, "success");
          this.setState({
            availability_lists: null,
            skipCount: 0,
            loading: true
          });
          this.getAvailabilityListApiCall();
        } else {
          ToastDemo(this.props.toastManager, response.data.error, "error");
        }
      });
  };

  getAvailabilityListApiCall() {
    let items;
    api
      .postMethod("host_availability_lists", {
        skip: this.state.skipCount,
        host_id: this.props.match.params.id
      })
      .then(response => {
        if (response.data.success) {
          if (this.state.availability_lists != null) {
            items = [...this.state.availability_lists, ...response.data.data];
          } else {
            items = [...response.data.data];
          }
          this.setState({
            availability_lists: items,
            loading: false,
            skipCount: response.data.data.length + this.state.skipCount,
            loadingStatus: true
          });
        }
      });
  }

  loadMore = event => {
    event.preventDefault();
    this.setState({ loadingStatus: false, loadingContent: "Loading..." });
    this.getAvailabilityListApiCall();
  };

  getArrivingDateandTime = title => (...args) => {
    console.log("arg", args);
    const formData = { ...this.state.formData };
    const datess = dayjs(args[0]).format("YYYY-MM-DD HH:mm:ss");
    formData["from_date"] = datess;
    this.setState({ formData });
  };

  getOutDateandTime = title => (...args) => {
    console.log("arg", args);
    const formData = { ...this.state.formData };
    const datess = dayjs(args[0]).format("YYYY-MM-DD HH:mm:ss");
    formData["to_date"] = datess;
    this.setState({ formData });
  };

  handleChange = ({ currentTarget: input }) => {
    const formData = { ...this.state.formData };

    if (input.type == "checkbox") {
      if (input.checked) {
        if (formData[input.name] === undefined) {
          let array = [];
          array.push(input.value);
          formData[input.name] = array;
          console.log("Array", array);
          this.setState({ formData });
        } else {
          formData[input.name].push(input.value);
          this.setState({ formData });
        }
      } else {
        let index = formData[input.name].indexOf(input.value);

        if (index !== -1) {
          formData[input.name].splice(index, 1);
          this.setState({ formData });
        }
      }
    } else {
      formData[input.name] = input.value;
      this.setState({ formData });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loadingButtonContent: "Loading... Please wait..",
      buttonDisable: true
    });
    if (this.state.formData.available_days == undefined) {
      ToastDemo(
        this.props.toastManager,
        "Please fill the required data",
        "error"
      );
      this.setState({ loadingButtonContent: null, buttonDisable: false });
    } else {
      const formData = { ...this.state.formData };
      formData[
        "available_days"
      ] = this.state.formData.available_days.toString();
      formData["type"] = 1;
      formData["host_id"] = this.props.match.params.id;
      this.setState({ formData });

      console.log("formdate", formData);
      api.postMethod("host_availability_list_save", formData).then(response => {
        if (response.data.success) {
          ToastDemo(this.props.toastManager, response.data.message, "success");
          this.setState({
            loadingButtonContent: null,
            buttonDisable: false
          });
          this.setState({
            availability_lists: null,
            skipCount: 0,
            loading: true
          });
          this.getAvailabilityListApiCall();
          console.log("It is Done. ", response);
        } else {
          ToastDemo(this.props.toastManager, response.data.error, "error");
          this.setState({
            loadingButtonContent: null,
            buttonDisable: false
          });
          console.log("whar", response);
        }
      });
    }
  };

  render() {
    const {
      formData,
      buttonDisable,
      loadingButtonContent,
      loadingContent,
      loading,
      availability_lists,
      loadingStatus
    } = this.state;

    return (
      <div className="main">
        <div className="site-content">
          <div className="top-bottom-spacing add-listings">
            <div className="row">
              <div className="col-12">
                <h2 className="text-uppercase">Set your Availability</h2>

                <h5 className="profile-note">
                  Fill in a few quick details and then sit back to watch the
                  money roll in!
                </h5>

                <p className="overview-line-1"></p>
              </div>

              <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-8">
                <div className="host-section row">
                  <div className="col-12">
                    <h5 className="m-0 text-uppercase lh-1-4">
                      CHOOSE AVAILABLE DAYS
                    </h5>

                    <p className="overview-line-1"></p>
                  </div>

                  <div className="form-group col-12">
                    {/* <label>Type of space</label> */}

                    <div className="switch-field">
                      <input
                        type="checkbox"
                        id="sunday"
                        name="available_days"
                        value={1}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="sunday">Sunday</label>
                      <input
                        type="checkbox"
                        id="Monday"
                        name="available_days"
                        value={2}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="Monday">Monday</label>
                      <input
                        type="checkbox"
                        id="Tuesday"
                        name="available_days"
                        value={3}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="Tuesday">Tuesday</label>
                      <input
                        type="checkbox"
                        id="Wednesday"
                        name="available_days"
                        value={4}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="Wednesday">Wednesday</label>
                      <input
                        type="checkbox"
                        id="Thursday"
                        name="available_days"
                        value={5}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="Thursday">Thursday</label>
                      <input
                        type="checkbox"
                        id="Friday"
                        name="available_days"
                        value={6}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="Friday">Friday</label>
                      <input
                        type="checkbox"
                        id="Saturday"
                        name="available_days"
                        value={7}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="Saturday">Saturday</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <h5 className="m-0 text-uppercase lh-1-4">
                      CHOOSE AVAILABLE SPACES
                    </h5>
                    <p>
                      Increase or decreas the number of parking spaces available
                      over a selected period
                    </p>
                    <p className="overview-line-1"></p>
                  </div>

                  <div className="form-group col-6">
                    <label>Choose From Date</label>

                    <DatePicker
                      onChange={this.getArrivingDateandTime("Range DatePicker")}
                      includeTime
                      className="form-control"
                    />
                  </div>

                  <div className="form-group col-6">
                    <label>Choose To Date</label>

                    <DatePicker
                      onChange={this.getOutDateandTime("Range DatePicker")}
                      includeTime
                    />
                  </div>

                  <div className="form-group col-6">
                    <label>Number of space</label>

                    <input
                      type="text"
                      className="form-control"
                      id="spaces"
                      name="spaces"
                      value={formData.spaces}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <button
                    type="button"
                    className="green-btn mb-3"
                    onClick={this.handleSubmit}
                    disabled={buttonDisable}
                  >
                    {loadingButtonContent != null
                      ? loadingButtonContent
                      : "Submit"}
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
                <div className="transactions">
                  <h2 className="sec-tit">Availability Lists</h2>
                  <div className="tab-content prov-tab-content">
                    <div className="tab-pane active" id="home" role="tabpanel">
                      <div className="clear-both" />

                      <div className="trans-table table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">S.No</th>
                              <th scope="col">From Date</th>
                              <th scope="col">To Date</th>
                              <th scope="col">Spaces</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              ""
                            ) : availability_lists.length > 0 ? (
                              availability_lists.map(
                                (availability_list, index) => (
                                  <tr key={availability_list.from_date}>
                                    <td>{index + 1}</td>
                                    <td>{availability_list.from_date}</td>
                                    <td scope="row">
                                      {availability_list.to_date}
                                    </td>
                                    <td>{availability_list.spaces}</td>
                                    <td>
                                      <Link
                                        to={"#"}
                                        onClick={event =>
                                          this.handleDelete(
                                            event,
                                            availability_list
                                          )
                                        }
                                      >
                                        <i className="fas fa-trash pink-clr" />
                                      </Link>
                                    </td>
                                  </tr>
                                )
                              )
                            ) : (
                              <tr className="no-data">
                                <td colspan="5">
                                  <img
                                    src={
                                      window.location.origin +
                                      "/assets/img/parking/no-data.svg"
                                    }
                                  />
                                  <h5>No Data Found</h5>
                                </td>
                              </tr>
                            )}
                            {loadingStatus ? "" : loadingContent}
                          </tbody>
                        </table>
                        {loading ? (
                          ""
                        ) : availability_lists.length > 0 ? (
                          <Link to={"#"} onClick={this.loadMore}>
                            Load More
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div
                      className="tab-pane"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      ...
                    </div>
                    <div
                      className="tab-pane"
                      id="contact"
                      role="tabpanel"
                      aria-labelledby="contact-tab"
                    >
                      ...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(HostAvailability);
