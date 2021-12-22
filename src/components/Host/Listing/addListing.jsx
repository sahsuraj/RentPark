import React, { Component } from "react";
import api from "../../../HostEnvironment";
import Map, { GoogleApiWrapper, Marker } from "google-maps-react";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";

import configuration from "react-global-configuration";

import { apiConstants } from "../../../components/Constant/constants";

class AddListing extends Component {
  state = {
    formData: {
      service_location_id: 0,
      latitude: "",
      longitude: "",
      city: "",
      state: "",
      country: "",
      street_details: "",
      zipcode: "",
      host_type: "driveway",
      host_owner_type: "owner",
      length_of_space: 1,
      width_of_space: 1,
      height_of_space: 1
    },
    serviceLocations: null,
    loadingServiceLocation: true,
    spaceConfigurationAPI: null,
    loadingSpaceConfig: true,
    spaceConfiguration: null,
    loadingContent: null,
    buttonDisable: false
  };

  componentDidMount() {
    this.getServiceLocationAPI();
    this.getSpaceConfigurationAPI();
  }

  getServiceLocationAPI = () => {
    api.postMethod("service_locations").then(response => {
      if (response.data.success) {
        this.setState({
          serviceLocations: response.data.data,
          loadingServiceLocation: false
        });
      } else {
        // Do nothing
      }
    });
  };

  getSpaceConfigurationAPI = () => {
    api.postMethod("spaces_configurations").then(response => {
      if (response.data.success) {
        this.setState({
          spaceConfigurationAPI: response.data.data,
          loadingSpaceConfig: false,
          spaceConfiguration: response.data.data[0].features
        });
      } else {
        // Do nothing
      }
    });
  };

  renderAutoComplete = () => {
    const { google } = this.props;
    if (!google) {
      return;
    }
    const autocomplete = new google.maps.places.Autocomplete(
      this.autocomplete,
      { types: ["geocode"] }
    );

    autocomplete.setFields(["address_component", "geometry", "name"]);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log("Place", place);
      if (!place.geometry) return;
      this.setState({ position: place.geometry.location });
      const formData = { ...this.state.formData };
      formData["latitude"] = place.geometry.location.lat();
      formData["longitude"] = place.geometry.location.lng();
      let full_address = "";
      const addressOrder = place.address_components.reverse();
      addressOrder.map((address, index) => {
        if (index == 0) formData["country"] = address.long_name;
        if (index == 1) formData["state"] = address.long_name;
        if (index == 2) formData["city"] = address.long_name;
        if (index == 3) formData["street_details"] = address.long_name;
      });

      place.address_components.map(
        address =>
          (full_address =
            full_address == ""
              ? address.long_name
              : full_address + "," + address.long_name)
      );
      formData["full_address"] = full_address;

      this.setState({ formData });
    });
  };

  handleChangeFile = ({ currentTarget: input }) => {
    const formData = { ...this.state.formData };
    if (input.type == "file") {
      formData[input.name] = input.files[0];
      this.setState({ formData });
    }
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
      if (input.name == "host_type") {
        this.state.spaceConfigurationAPI.map(detail => {
          if (formData[input.name] == detail.host_type) {
            this.setState({ spaceConfiguration: detail.features });
            formData["amenities"] = [];
            this.setState({ formData });
          }
        });
      }
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loadingContent: "Loading... Please wait..",
      buttonDisable: true
    });
    api.postMethod("spaces_save", this.state.formData).then(response => {
      if (response.data.success) {
        this.setState({ loadingContent: null, buttonDisable: false });
        ToastDemo(this.props.toastManager, response.data.message, "success");
        this.props.history.push("/host/spaces");
      } else {
        this.setState({ loadingContent: null, buttonDisable: false });
        ToastDemo(this.props.toastManager, response.data.error, "error");
      }
    });
  };

  render() {
    const {
      formData,
      serviceLocations,
      loadingServiceLocation,
      loadingSpaceConfig,
      spaceConfiguration,
      loadingContent,
      buttonDisable
    } = this.state;
    return (
      <div className="main">
        <div className="site-content">
          <div className="top-bottom-spacing add-listings">
            <div className="row">
              <div className="col-12">
                <h2 className="text-uppercase">Rent out your space</h2>

                <h5 className="profile-note">
                  Fill in a few quick details and then sit back to watch the
                  money roll in!
                </h5>

                <p className="overview-line-1"></p>
              </div>

              <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-8">
                <form>
                  <div className="host-section row">
                    <div className="col-12">
                      <h5 className="m-0 text-uppercase lh-1-4">
                        WHERE IS YOUR PARKING SPACE?
                      </h5>

                      <p className="overview-line-1"></p>
                    </div>

                    <div className="form-group col-6">
                      <label>Choose Service Location</label>

                      <select
                        className="form-control custom-select"
                        name="service_location_id"
                        onChange={this.handleChange}
                        value={formData.service_location_id}
                      >
                        <option>Select Service Location</option>
                        {loadingServiceLocation
                          ? ""
                          : serviceLocations.length > 0
                          ? serviceLocations.map(location => (
                              <option
                                key={location.service_location_id}
                                value={location.service_location_id}
                              >
                                {location.service_location_name}
                              </option>
                            ))
                          : ""}
                      </select>

                      <h5 className="profile-note">
                        We use this data for analysis and never share it with
                        other users.
                      </h5>
                    </div>

                    <div className="form-group col-6">
                      <label>Enter Your Space Address</label>

                      <input
                        type="text"
                        className="form-control"
                        id="full_address"
                        placeholder='Type "UK"'
                        onFocus={this.renderAutoComplete}
                        ref={ref => (this.autocomplete = ref)}
                        name="full_address"
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group col-6">
                      <label>Street Details</label>

                      <input
                        type="text"
                        className="form-control"
                        id="street_details"
                        name="street_details"
                        value={formData.street_details}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group col-3">
                      <label>City</label>

                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group col-3">
                      <label>State</label>

                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group col-3">
                      <label>Country</label>

                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group col-3">
                      <label>Postal Code</label>

                      <input
                        type="text"
                        className="form-control"
                        id="zip_code"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="host-section row">
                    <div className="col-12">
                      <h5 className="m-0 captalize lh-1-4">ABOUT YOUR SPACE</h5>

                      <p className="overview-line-1"></p>
                    </div>

                    <div className="form-group col-9">
                      <label>Type of space</label>

                      <div className="switch-field">
                        <input
                          type="radio"
                          id="driveway"
                          name="host_type"
                          value="driveway"
                          onChange={this.handleChange}
                          defaultChecked
                        />
                        <label htmlFor="driveway">Driveway</label>

                        <input
                          type="radio"
                          id="garage"
                          name="host_type"
                          value="garage"
                          onChange={this.handleChange}
                        />
                        <label htmlFor="garage">Garage</label>

                        <input
                          type="radio"
                          id="carpark"
                          name="host_type"
                          value="carpark"
                          onChange={this.handleChange}
                        />
                        <label htmlFor="carpark">Car Park</label>
                      </div>
                    </div>
                    <div className="form-group col-8">
                      <label>{formData.host_type}</label>

                      <div className="switch-field">
                        {loadingSpaceConfig
                          ? ""
                          : spaceConfiguration.length > 0
                          ? spaceConfiguration.map((details, index) => (
                              <div key={details.key}>
                                <input
                                  type="checkbox"
                                  id={details.key}
                                  name="amenities"
                                  value={details.key}
                                  onChange={this.handleChange}
                                />
                                <label htmlFor={details.key}>
                                  {details.value}
                                </label>
                              </div>
                            ))
                          : "No amenities found"}
                      </div>
                    </div>

                    <div className="form-group col-4">
                      <label>Number of spaces</label>

                      <input
                        type="text"
                        className="form-control"
                        id="total_spaces"
                        name="total_spaces"
                        value={formData.total_spaces}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group col-12">
                        <h5>Parking slot dimensions</h5>
                    </div>

                    <div className="form-group col-4">
                      <label>Width</label>

                      <input
                        type="number"
                        className="form-control"
                        id="width_of_space"
                        name="width_of_space"
                        min="1"
                        value={formData.width_of_space}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group col-4">
                      <label>Height</label>

                      <input
                        type="number"
                        className="form-control"
                        id="height_of_space"
                        name="height_of_space"
                        min="1"
                        value={formData.height_of_space}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group col-4">
                      <label>Length</label>

                      <input
                        type="number"
                        className="form-control"
                        id="length_of_space"
                        name="length_of_space"
                        min="1"
                        value={formData.length_of_space}
                        onChange={this.handleChange}
                      />
                    </div>

                    

                    <div className="form-group col-12">
                      <label>I am a..</label>

                      <div className="switch-field">
                        <input
                          type="radio"
                          id="radio-one"
                          name="host_owner_type"
                          value="owner"
                          onChange={this.handleChange}
                          defaultChecked
                        />
                        <label htmlFor="radio-one">Individual Owner</label>
                        <input
                          type="radio"
                          id="radio-two"
                          name="host_owner_type"
                          onChange={this.handleChange}
                          value="business"
                        />
                        <label htmlFor="radio-two">
                          Business / Organization
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="host-section row">
                    <div className="col-12">
                      <h5 className="m-0 text-uppercase lh-1-4">
                        Name and Description
                      </h5>

                      <p className="overview-line-1"></p>
                    </div>

                    <div className="form-group col-12">
                      <label>Name</label>

                      <input
                        type="text"
                        className="form-control"
                        id="host_name"
                        name="host_name"
                        value={formData.host_name}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group col-12">
                      <label>Description</label>
                      <textarea
                        type="text"
                        className="form-control"
                        rows="4"
                        cols="5"
                        name="description"
                        value={formData.description}
                        onChange={this.handleChange}
                        placeholder="This is the description that will be shown on your parking space's page. For your own security, do not include your email or phone number."
                      ></textarea>

                      <h5 className="profile-note">
                        Any other selling points? e.g. local knowledge,
                        transport links...
                      </h5>
                    </div>
                    <div className="form-group col-12">
                      <label>Picture</label>

                      <input
                        type="file"
                        name="picture"
                        className="form-control"
                        onChange={this.handleChangeFile}
                      />
                    </div>
                  </div>

                  <div className="host-section row">
                    <div className="col-12">
                      <h5 className="m-0 text-uppercase lh-1-4">
                        Pricing Details
                      </h5>

                      <p className="overview-line-1"></p>
                    </div>

                    <div className="form-group col-6">
                      <label>Per Hour</label>

                      <input
                        type="text"
                        className="form-control"
                        id="per_hour"
                        name="per_hour"
                        value={formData.per_hour}
                        onChange={this.handleChange}
                      />
                    </div>

                    <div className="form-group col-6">
                      <label>Per Day</label>

                      <input
                        type="text"
                        className="form-control"
                        id="per_day"
                        name="per_day"
                        value={formData.per_day}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Per Week</label>

                      <input
                        type="text"
                        className="form-control"
                        id="per_week"
                        name="per_week"
                        value={formData.per_week}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Per Month</label>

                      <input
                        type="text"
                        className="form-control"
                        id="per_month"
                        name="per_month"
                        value={formData.per_month}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="host-section row">
                    <div className="col-12">
                      <h5 className="m-0 text-uppercase lh-1-4">
                        ACCESS INSTRUCTIONS
                      </h5>

                      <p className="overview-line-1"></p>
                    </div>

                    <div className="form-group col-12">
                      <textarea
                        type="text"
                        className="form-control"
                        rows="4"
                        cols="10"
                        name="access_note"
                        value={formData.access_note}
                        onChange={this.handleChange}
                      ></textarea>

                      <h5 className="profile-note">
                        These details are only sent to drivers after they have
                        booked your space.
                      </h5>
                    </div>

                    <div className="form-group col-12">
                      <label>Access methods ?</label>

                      <input
                        type="text"
                        className="form-control"
                        id="access_method"
                        name="access_method"
                        value={formData.access_method}
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
                      {loadingContent != null
                        ? loadingContent
                        : "Add Your Space"}
                    </button>

                    <p>
                      <small className="text-gray mb-5">
                        By proceeding to add your space, you agree that this
                        parking space listing is advertised in accordance with
                        JustPark's Terms & Conditions, you have the legal right
                        to list this parking location for rent, and that you
                        agree with the JustPark Privacy Policy.
                      </small>
                    </p>
                  </div>
                </form>
              </div>

              <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-4">
                <div className="box outer-box length">
                  <div className="inner content">
                    <img
                      src="../assets/img/parking/add-list.jpg"
                      className="listing-img"
                    />
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

export default GoogleApiWrapper({
  apiKey: apiConstants.google_api_key
})(withToastManager(AddListing));
