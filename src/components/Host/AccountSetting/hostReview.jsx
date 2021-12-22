import React, { Component } from "react";
import HostProfileSideBar from "./hostProfileSideBar";
import api from "../../../HostEnvironment";

class HostReview extends Component {
  state = {
    reviewByYou: null,
    reviewAboutYou: null,
    loadingReviewByYou: true,
    loadingReviewAboutYou: true
  };
  componentDidMount() {
    api.postMethod("reviews_for_you").then(response => {
      if (response.data.success === true) {
        this.setState({
          reviewAboutYou: response.data.data,
          loadingReviewAboutYou: false
        });
      }
    });
    api.postMethod("reviews_for_users").then(response => {
      if (response.data.success === true) {
        this.setState({
          reviewByYou: response.data.data,
          loadingReviewByYou: false
        });
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
              <HostProfileSideBar />
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
                      {loadingReviewAboutYou
                        ? ""
                        : reviewAboutYou.map(review => (
                            <div
                              key={review.booking_user_review_id}
                              className="panel-body account"
                            >
                              <div className="media">
                                <img
                                  src={review.user_picture}
                                  className="align-self-center mr-3 rounded-circle review-img1"
                                />
                                <div className="media-body">
                                  <h4 className="medium-cls mb-0">
                                    {review.user_name}
                                  </h4>
                                  <p className="m-0">{review.created_at}</p>
                                </div>
                              </div>
                              <h4 className="captalize mt-2 mb-0 lh-1-4">
                                {review.review}
                              </h4>
                            </div>
                          ))}
                    </div>
                  </div>
                  <div id="menu1" className="tab-pane fade">
                    <br />
                    <div className="panel">
                      <div className="panel-heading">Reviews to Write </div>
                      {loadingReviewByYou
                        ? ""
                        : reviewByYou.map(review => (
                            <div
                              key={review.booking_provider_review_id}
                              className="panel-body account"
                            >
                              <div className="media">
                                <img
                                  src={review.user_picture}
                                  className="align-self-center mr-3 rounded-circle review-img1"
                                />
                                <div className="media-body">
                                  <h4 className="medium-cls mb-0">
                                    {review.user_name}
                                  </h4>
                                  <p className="m-0">{review.created_at}</p>
                                </div>
                              </div>
                              <h4 className="captalize mt-2 mb-0 lh-1-4">
                                {review.review}
                              </h4>
                            </div>
                          ))}
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

export default HostReview;
