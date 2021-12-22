import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../../Environment";
import { apiConstants } from "../Constant/constants";
import StarRatingComponent from "react-star-rating-component";

class Helper extends Component {
  state = {
    first_block: null,
    mainData: null,
    userDetails: {},
    data: {},
    errors: {},
    isMapVisible: false,
    loading: true,
    loadingCategory: true,
    loadingProfile: true,
    profileError: null,
    skipCount: 0,
    loadingStatus: true,
    loadingContent: null,
    contentData: null,
    second_block: null,
    profileUpdateStatusContent: null,
    changeChat: false
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  homePageFirstSection = inputData => {
    api.postMethod("home_first_section", inputData).then(response => {
      this.setState({
        first_block: response.data.first_block,
        mainData: response.data.data,
        loading: false,
        second_block: response.data.second_block
      });
    });
  };

  seeAll = inputData => {
    let items;
    api.postMethod("see_all", inputData).then(response => {
      if (response.data.success) {
        if (this.state.contentData != null) {
          items = [...this.state.contentData, ...response.data.data[0].data];
        } else {
          items = [...response.data.data[0].data];
        }
        this.setState({
          contentData: items,
          mainData: response.data.data,
          loading: false,
          skipCount: response.data.data[0].data.length + this.state.skipCount,
          loadingStatus: true,
          first_block: response.data.first_block
        });
      }
    });
  };

  renderCategory(label) {
    return (
      <React.Fragment>
        {this.state.categories.map(category => (
          <Link
            key={category.category_id}
            // to={`/see_all/${category.name}/${category.api_page_type_id}/${
            //   this.props.categoryDetails.api_page_type
            // }`}
            to={`/category/${category.category_user_display_name}/${category.api_page_type_id}/${category.api_page_type}`}
            className={label}
          >
            {category.category_user_display_name}
          </Link>
        ))}
      </React.Fragment>
    );
  }

  renderPropsCategory(label) {
    return (
      <React.Fragment>
        {this.props.data.map(category => (
          <Link
            key={category.category_id}
            to={`/see_all/${category.name}/${category.api_page_type_id}/${this.props.api_page_type}`}
            className={label}
          >
            {category.name}
          </Link>
        ))}
      </React.Fragment>
    );
  }

  getUserDetails() {
    api.postMethod("profile").then(response => {
      if (response.data.success === true) {
        this.setState({ data: response.data.data, loading: false });
      } else {
        const check = this.checkLoginUser(response.data);
        if (check) {
          this.setState({ profileError: "Please login to continue" });
        } else {
          this.setState({ profileError: response.data.error });
        }
      }
    });
  }

  getProviderProfile(id) {
    api.postMethod("providers_view", { provider_id: id }).then(response => {
      if (response.data.success === true) {
        this.setState({ data: response.data.data, loading: false });
      } else {
        // Do nothing.
      }
    });
  }

  getOtherUserProfile(id) {
    api.postMethod("users_view", { user_id: id }).then(response => {
      if (response.data.success === true) {
        this.setState({ data: response.data.data, loading: false });
      } else {
        // Do nothing.
      }
    });
  }

  updateProfile() {
    let userDetails = { ...this.state.data };
    const data = {
      name: userDetails.name,
      description: userDetails.description,
      email: userDetails.email,
      mobile: userDetails.mobile
    };

    api.postMethod("update_profile", data).then(response => {
      if (response.data.success) {
        this.setState({
          profileUpdateStatusContent: response.data.message
        });
      } else {
        this.setState({
          profileUpdateStatusContent: response.data.error
        });
      }
    });
  }

  changePassword() {
    api.postMethod("change_password", this.state.data).then(response => {
      if (response.data.success) {
      }
    });
  }

  getMapVisible() {
    return this.state.isMapVisible;
  }

  getCategory() {
    api.getMethod("categories").then(response => {
      if (response.data.success === true) {
        let categories = response.data.data;
        this.setState({
          categories: categories,
          loadingCategory: false
        });
      }
    });
  }

  checkLoginUser(data) {
    return apiConstants.ERROR_CODE.includes(data.error_code);
  }

  priceCalculatorApiCall(inputData) {
    api.postMethod("host_price_calculator", inputData).then(response => {
      return response.data;
    });
  }
  searchApiCall(props, location_id) {
    api
      .postMethod("search_result", { service_location_id: location_id })
      .then(response => {
        if (response.data.success === true) {
          props.history.push("/search", response.data.data);
        } else {
          // ToastDemo(this.props.toastManager, response.data.error, "error");
        }
      })
      .catch(function(error) {});
  }

  starRatingHost(ratings, givenfontSize = 18) {
    return (
      <span style={{ fontSize: givenfontSize }}>
        <StarRatingComponent
          name="ratings"
          starCount={5}
          value={ratings}
          starColor={"#338837"}
          emptyStarColor={"#adadad"}
          editing={false}
        />
      </span>
    );
  }
}

export default Helper;
