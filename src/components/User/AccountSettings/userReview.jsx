import React, { Component } from "react";
import ProfileSideBar from "../../Helper/profileSideBar";
import api from "../../../Environment";
import ToastDemo from "../../Helper/toaster";
import { withToastManager } from "react-toast-notifications";
import Helper from "../../Helper/Helper";

class UserReview extends Helper {
  state = {
    reviewByYou: null,
    reviewAboutYou: null,
    loadingReviewByYou: true,
    loadingReviewAboutYou: true
  };
  componentDidMount() {
    api.postMethod("reviews_for_you").then(response => {
      if (response.data.success) {
        this.setState({
          reviewAboutYou: response.data.data,
          loadingReviewAboutYou: false
        });
      } else {
        ToastDemo(this.props.toastManager, response.data.error, "error");
      }
    });
    api.postMethod("reviews_for_providers").then(response => {
      if (response.data.success) {
        this.setState({
          reviewByYou: response.data.data,
          loadingReviewByYou: false
        });
      } else {
        ToastDemo(this.props.toastManager, response.data.error, "error");
      }
    });
  }
  render() {
    const {
      loadingReviewAboutYou,
      loadingReviewByYou,
      reviewAboutYou,
      reviewByYou
    } = this.state;
    return (
      <div className="main">
        <div className="site-content">
          <div className="top-bottom-spacing">
            <div className="row">
              <ProfileSideBar />
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#home"
                    >
                      reviews about you
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#menu1">
                      reviews by you
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div id="home" className="tab-pane active">
                    <br />
                    <div className="panel">
                      <div className="panel-heading">Past Reviews </div>
                      {loadingReviewAboutYou ? (
                        ""
                      ) : reviewAboutYou != "" ? (
                        <div>
                          {reviewAboutYou.map(review => (
                            <div className="panel-body account">
                              <div className="media">
                                <img
                                  src={review.provider_picture}
                                  className="align-self-center mr-3 rounded-circle review-img1"
                                />
                                <div className="media-body">
                                  <h4 className="medium-cls mb-0">
                                    {review.provider_name}
                                  </h4>
                                  <h5 className="rating-sec">
                                    <span className="rating-star">
                                      {this.starRatingHost(review.ratings)}
                                    </span>
                                  </h5>
                                  <p className="m-0">{review.created_at}</p>
                                </div>
                              </div>
                              <h4 className="captalize mt-2 mb-0 lh-1-4">
                                {review.review}
                              </h4>
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
                  <div id="menu1" className="tab-pane fade">
                    <br />
                    <div className="panel">
                      <div className="panel-heading">Reviews to Write </div>

                      {loadingReviewByYou ? (
                        ""
                      ) : reviewByYou != "" ? (
                        <div>
                          {" "}
                          {reviewByYou.map(review => (
                            <div className="panel-body account">
                              <div className="media">
                                <img
                                  src={review.provider_picture}
                                  className="align-self-center mr-3 rounded-circle review-img1"
                                />
                                <div className="media-body">
                                  <h4 className="medium-cls mb-0">
                                    {review.provider_name}
                                  </h4>
                                  <h5 className="rating-sec">
                                    <span className="rating-star">
                                      {this.starRatingHost(review.ratings)}
                                    </span>
                                  </h5>
                                  <p className="m-0">{review.created_at}</p>
                                </div>
                              </div>
                              <h4 className="captalize mt-2 mb-0 lh-1-4">
                                {review.review}
                              </h4>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserReview;
