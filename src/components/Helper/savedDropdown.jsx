import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../Environment";

class SavedDropdown extends Component {
  state = {
    loadingWishlist: true,
    wishLists: null
  };
  componentDidMount() {
    api.postMethod("wishlist").then(response => {
      if (response.data.success === true) {
        this.setState({
          wishLists: response.data.data,
          loadingWishlist: false
        });
      }
    });
  }
  render() {
    const { loadingWishlist, wishLists } = this.state;
    return loadingWishlist ? (
      ""
    ) : (
      <div className="dropdown-menu saved">
        <div className="row m-0">
          <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 saved-head">
            <h5>list</h5>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 saved-head">
            <Link to={"/wishlist"}>
              <h5 className="text-right">view list</h5>
            </Link>
          </div>
        </div>

        <Link className="dropdown-item" to="../category/single.html">
          <div className="display-inline">
            <div className="drop-left">
              <h5 className="bold-cls">new home</h5>
              <h5>1 guests</h5>
              <h5>2 listings</h5>
            </div>
            <div className="drop-right">
              <img src="../../../assets/img/home1.jpg" />
            </div>
          </div>
        </Link>
        <p className="line m-0" />
        <Link className="dropdown-item" to="../category/single.html">
          <div className="display-inline">
            <div className="drop-left">
              <h5 className="bold-cls">new home</h5>
              <h5>1 guests</h5>
              <h5>2 listings</h5>
            </div>
            <div className="drop-right">
              <img src="../../../assets/img/home1.jpg" />
            </div>
          </div>
        </Link>
        <p className="line m-0" />
        <Link className="dropdown-item" to="../category/single.html">
          <div className="display-inline">
            <div className="drop-left">
              <h5 className="bold-cls">new home</h5>
              <h5>1 guests</h5>
              <h5>2 listings</h5>
            </div>
            <div className="drop-right">
              <img src="../../../assets/img/home1.jpg" />
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default SavedDropdown;
