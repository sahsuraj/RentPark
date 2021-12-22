import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../../HostEnvironment";
import { apiConstants } from "../Constant/constants";
import StarRatingComponent from "react-star-rating-component";

class HostHelper extends Component {
  state = {
    categories: null,
    hostDetails: {},
    data: {},
    errors: {},
    loadingCategories: true,
    error: null,
    profileUpdateStatusContent: null
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  categoryApiCall = async () => {
    await api.postMethod("home_first_section").then(response => {
      this.setState({ categories: response.data.categories });
    });
  };

  getCategories = () => {
    api.getMethod("categories").then(response => {
      this.setState({
        categories: response.data.data,
        loadingCategories: false
      });
    });
  };

  getHostDetails() {
    api.postMethod("profile").then(response => {
      if (response.data.success) {
        this.setState({ data: response.data.data, loading: false });
      } else {
        this.checkLoginHost(response.data);
      }
    });
  }

  renderCategory(label) {
    return (
      <React.Fragment>
        {this.state.categories.map(category => (
          <Link
            key={category.category_id}
            to="/category/home"
            className={label}
          >
            {category.category_user_display_name}
          </Link>
        ))}
      </React.Fragment>
    );
  }

  updateProfile() {
    let hostDetails = { ...this.state.data };
    const data = {
      name: hostDetails.name,
      description: hostDetails.description,
      email: hostDetails.email,
      mobile: hostDetails.mobile
    };

    api.postMethod("update_profile", data).then(response => {
      if (response.data.success === true) {
        this.setState({ profileUpdateStatusContent: "Content" });
      } else {
        this.setState({
          profileUpdateStatusContent: response.data.error
        });
      }
    });
  }

  changePassword() {
    api.postMethod("change_password", this.state.data).then(response => {
      if (response.data.success === true) {
      }
    });
  }

  checkLoginHost(data) {
    const check = apiConstants.ERROR_CODE.includes(data.error_code);
    if (check) {
      this.setState({
        error: "Please login to continue",
        loginStatus: false
      });
    } else {
      this.setState({ error: data.error });
    }
  }

  rateTheTrip(ratings, givenfontSize = 18) {
    return (
      <span style={{ fontSize: givenfontSize }}>
        <StarRatingComponent
          name="ratings"
          starCount={5}
          value={ratings}
          starColor={"#338837"}
          emptyStarColor={"#adadad"}
          onStarClick={this.onStarClick.bind(this)}
        />
      </span>
    );
  }
}

export default HostHelper;
