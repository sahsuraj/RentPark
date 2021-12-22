import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../../Environment";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";
import Helper from "../../Helper/Helper";

class TripBanner extends Helper {
  state = {
    wishlistData: null,
    loading: true
  };

  favourite = (event, data) => {
    event.preventDefault();
    if (this.props.status == "host") {
      ToastDemo(
        this.props.toastManager,
        "You can't add to wishlist, login as User",
        "error"
      );
    } else {
      let addWishlist = {
        host_id: data.host_id,
        clear_all_status: 0
      };
      api.postMethod("wishlist_operations", addWishlist).then(response => {
        if (response.data.success) {
          this.setState({ wishlistData: response.data.data, loading: false });

          ToastDemo(this.props.toastManager, response.data.message, "success");
        } else {
          const check = this.checkLoginUser(response.data);
          if (check) {
            ToastDemo(
              this.props.toastManager,
              "Please login to save the details",
              "error"
            );
          } else {
            ToastDemo(this.props.toastManager, response.data.error, "error");
          }
        }
      });
    }
  };
  render() {
    return (
      <div className="singlehome-img-sec">
        <img
          src={this.props.basicDetails.host_picture}
          alt="image"
          className="homes-img br-0"
        />
        {/* <div className="top-right">
          <Link
            to="#"
            className="white-btn btn-small m-2"
            onClick={e => this.favourite(e, this.props.basicDetails)}
          >
            {this.props.basicDetails.wishlist_status ? (
              <div>
                <i className="fa fa-check" />
                &nbsp; saved
              </div>
            ) : (
              <div>
                <i className="far fa-heart" />
                &nbsp; save
              </div>
            )}
          </Link>
        </div> */}
        <div className="bottom-left">
          <a
            href="#"
            className="white-btn btn-small m-2"
            data-toggle="modal"
            data-target="#image-gal"
          >
            view photos
          </a>
        </div>
      </div>
    );
  }
}

export default withToastManager(TripBanner);
