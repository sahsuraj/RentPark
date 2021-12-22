import React, { Component } from "react";
import api from "../../../Environment";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";
import ProfileSideBar from "../../Helper/profileSideBar";
import ProfileInput from "../../Helper/profileInput";
import Helper from "../../Helper/Helper";
import { Link } from "react-router-dom";

class Vehicle extends Helper {
  state = {
    data: {},
    loadingContent: null,
    buttonDisable: false,
    getVehicleDetails: null,
    getVehicleList: null,
    loadingVehicle: true
  };

  componentDidMount() {
    this.getVehicleListApiCall();
  }

  getVehicleListApiCall = () => {
    api.postMethod("vehicles", this.state.data).then(response => {
      if (response.data.success) {
        this.setState({
          getVehicleList: response.data.data,
          loadingVehicle: false
        });
      } else {
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loadingContent: "Loading... Please wait..",
      buttonDisable: true
    });
    this.addVehicleApi();
  };

  addVehicleApi = () => {
    api.postMethod("vehicles_save", this.state.data).then(response => {
      if (response.data.success) {
        ToastDemo(this.props.toastManager, response.data.message, "success");
        this.setState({
          loadingContent: null,
          buttonDisable: false
        });
        this.getVehicleListApiCall();
      } else {
        ToastDemo(this.props.toastManager, response.data.error, "error");
        this.setState({
          loadingContent: null,
          buttonDisable: false
        });
      }
    });
  };

  deleteVehicle = (event, vehicle) => {
    event.preventDefault();
    api
      .postMethod("vehicles_delete", {
        user_vehicle_id: vehicle.user_vehicle_id
      })
      .then(response => {
        if (response.data.success) {
          ToastDemo(this.props.toastManager, response.data.message, "success");
          this.getVehicleListApiCall();
        } else {
          ToastDemo(this.props.toastManager, response.data.error, "error");
        }
      });
  };
  render() {
    const {
      data,
      loadingContent,
      buttonDisable,
      loadingVehicle,
      getVehicleDetails,
      getVehicleList
    } = this.state;

    return (
      <div className="main">
        <div className="site-content">
          <div className="top-bottom-spacing">
            <div className="row">
              <ProfileSideBar />
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
                <div className="panel">
                  <div className="panel-heading">Vehicle Details </div>
                  <div className="panel-body account pt-3">
                    <div className="row">
                      {loadingVehicle
                        ? ""
                        : getVehicleList.length > 0
                        ? getVehicleList.map(vehicle => (
                            <div
                              className="col-sm-12 col-md-6 col-lg-6 col-xl-4 top"
                              key={vehicle.user_vehicle_id}
                            >
                              <div>
                                <div className="payment-box text-center">
                                  <Link
                                    to={"#"}
                                    style={{ float: "right" }}
                                    onClick={event =>
                                      this.deleteVehicle(event, vehicle)
                                    }
                                  >
                                    <i className="fas fa-trash pink-clr" />
                                  </Link>
                                  <i className="material-icons big-icon">
                                    directions_car
                                  </i>
                                  <h4 className="captalize ">
                                    {vehicle.vehicle_model}
                                  </h4>
                                  <p className="captalize top">
                                    {vehicle.vehicle_number}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        : ""}
                    </div>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="panel-body account">
                      <ProfileInput
                        label="Vehicle type"
                        type="text"
                        placeholder="Car"
                        id="vehicle-type"
                        name="vehicle_type"
                        description=""
                        value={data.vehicle_type}
                        onChange={this.handleChange}
                      />

                      <ProfileInput
                        label="Vehicle brand"
                        type="text"
                        placeholder="Audi"
                        id="vehicle_brand"
                        name="vehicle_brand"
                        value={data.vehicle_brand}
                        description=""
                        onChange={this.handleChange}
                      />
                      <ProfileInput
                        label="Vehicle model"
                        type="text"
                        placeholder="Q7"
                        id="vehicle_model"
                        name="vehicle_model"
                        value={data.vehicle_model}
                        description=""
                        onChange={this.handleChange}
                      />
                      <ProfileInput
                        label="Vehicle number"
                        type="text"
                        placeholder="Jo 7651"
                        id="vehicle_number"
                        name="vehicle_number"
                        value={data.vehicle_number}
                        description=""
                        onChange={this.handleChange}
                      />

                      <div className="row">
                        <div className="col-9 offset-3 text-center">
                          <button
                            className="green-btn btn-block"
                            disabled={this.state.buttonDisable}
                          >
                            {this.state.loadingContent != null
                              ? this.state.loadingContent
                              : "Submit"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(Vehicle);
