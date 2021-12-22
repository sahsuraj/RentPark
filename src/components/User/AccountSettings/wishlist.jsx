import React, { Component } from "react";
import api from "../../../Environment";
import { Link } from "react-router-dom";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";

class WishList extends Component {
  state = {
    data: null,
    loading: true
  };

  componentDidMount() {
    // API call

    this.wishlistAPICall();
  }

  wishlistAPICall() {
    api.postMethod("wishlist").then(response => {
      if (response.data.success) {
        this.setState({ data: response.data.data, loading: false });
      }
    });
  }

  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    this.wishlistAPICall();
  }

  deleteWishlist = (event, wishlist) => {
    event.preventDefault();
    api
      .postMethod("wishlist_operations", {
        host_id: wishlist.host_id,
        clear_all_status: 0
      })
      .then(response => {
        if (response.data.success) {
          ToastDemo(this.props.toastManager, response.data.message, "success");
        } else {
          ToastDemo(this.props.toastManager, response.data.error, "error");
        }
      });
  };
  render() {
    return (
      <div className="main">
        <div className="site-content">
          <div className="top-bottom-spacing">
            <div>
              <h1 className="section-head">list</h1>

              <h4 className="top4 mb-0 captalize medium-cls">
                your lists({this.state.loading ? "0" : this.state.data.length})
              </h4>
              {this.state.loading ? (
                "Loading"
              ) : this.state.data.length > 0 ? (
                <div className="row">
                  {this.state.data.map(wishlist => (
                    <div
                      className="col-sm-6 col-md-4 col-lg-4 col-xl-4"
                      key={wishlist.wishlist_id}
                    >
                      <Link to={`/trip/${wishlist.host_id}`}>
                        <div className="relative">
                          <div className="wishlist-img-sec">
                            <img
                              src={wishlist.host_picture}
                              alt="image"
                              className="homes-img"
                            />
                            <div className="wishlist-text">
                              <h4 className="mt-0">{wishlist.host_name}</h4>
                            </div>
                          </div>
                          <div className="wishlist-icon-sec">
                            <div className="wishlist-icon">
                              <Link
                                to={"#"}
                                onClick={event =>
                                  this.deleteWishlist(event, wishlist)
                                }
                              >
                                <i className="fas fa-trash pink-clr" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data">
                  <img src="../assets/img/parking/no-data.svg" />
                  <h5>No Data Found</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(WishList);
