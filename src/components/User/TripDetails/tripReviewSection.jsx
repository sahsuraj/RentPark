import React, { Component } from "react";
import api from "../../../Environment";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";

class TripReviewSection extends Component {
  state = {
    reviews: null,
    loading: true,
    skipCount: 0,
    loadingStatus: true,
    loadingContent: null,
    contentData: null
  };
  componentDidMount() {
    this.reviewsApiCall();
  }
  reviewsApiCall() {
    let items;
    api
      .postMethod("reviews", {
        host_id: this.props.details.host_id,
        skip: this.state.skipCount
      })
      .then(response => {
        if (response.data.success) {
          if (this.state.reviews != null) {
            items = [...this.state.reviews, ...response.data.data];
          } else {
            items = [...response.data.data];
          }
          this.setState({
            reviews: items,
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

    this.reviewsApiCall();
  };
  render() {
    const { reviews, loading, loadingContent, loadingStatus } = this.state;

    return (
      <div>
        {loading ? (
          "Loading..."
        ) : reviews.length > 0 ? (
          <div id="reviews">
            <div className="row">
              <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7">
                <h1 className="section-head">
                  {this.props.details.total_ratings} Reviews
                  <span className="theme-green-clr small align-middle">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </span>
                </h1>
              </div>
            </div>
            <p className="overview-line" />

            {reviews.map((review, index) => (
              <div>
                <div className="media top1">
                  <img
                    src={review.user_picture}
                    className="align-self-center mr-3 rounded-circle review-img1"
                  />
                  <div className="media-body">
                    <h4 className="reviewer-name">{review.user_name}</h4>
                    <p className="review-date">{review.created_at}</p>
                  </div>
                </div>
                <h4 className="comment-text top">{review.review}</h4>
                {loadingStatus ? "" : loadingContent}
                {reviews.length == index + 1 ? (
                  <Link to="#" className="show-all" onClick={this.loadMore}>
                    show more
                  </Link>
                ) : (
                  ""
                )}

                <p className="overview-line" />
              </div>
            ))}

            {/* <div className="media">
          <img
            src="../assets/img/profile1.jpg"
            className="align-self-center mr-3 rounded-circle review-img1"
          />
          <div className="media-body">
            <a
              href="#"
              className="float-right grey-clr"
              data-toggle="modal"
              data-target="#report"
            >
              <i className="fas fa-flag" />
            </a>
            <h4 className="reviewer-name">Andrew</h4>
            <p className="review-date">May 2018</p>
          </div>
        </div>
        <h4 className="comment-text">
          The location is good. There are three major problems, despite many
          outstanding reviews: 1) The host is extremely strict about the
          check-in and check-out time. There is zero flexibility whatsoever 2)
          The shower temperature control needs to be fixed. I ignored one recent
          review th
        </h4> */}

            {/* <div className="media review-reply">
          <img
            src="../assets/img/profile1.jpg"
            alt="Jane Doe"
            className="mr-3 rounded-circle review-img2"
          />
          <div className="media-body">
            <h4 className="reviewer-name">response from Francesco:</h4>
            <p className="review-date">May 2018</p>
            <h4 className="comment-text">Thanks so much!</h4>
          </div>
        </div>
        
        <p className="overview-line" /> */}

            <div className="modal fade" id="report">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <h1 className="section-head">
                      Do you want to anonymously report this review?
                    </h1>

                    <h4 className="captalize  amenities-modal-head">
                      If so, please choose one of the following reasons
                    </h4>
                    <form>
                      <div className="form-check radio-green top">
                        <input
                          className="form-check-input"
                          name="group101"
                          type="radio"
                          id="radio103"
                        />
                        <label className="form-check-label" htmlFor="radio103">
                          Inappropriate content
                        </label>
                        <p className="m-l-2 bottom">
                          This review contains violent, graphic, promotional, or
                          otherwise offensive content.
                        </p>
                      </div>
                      <div className="form-check radio-green top">
                        <input
                          className="form-check-input"
                          name="group101"
                          type="radio"
                          id="radio104"
                          checked
                        />
                        <label className="form-check-label" htmlFor="radio104">
                          Dishonest or hateful content
                        </label>
                        <p className="m-l-2 bottom">
                          This review is purposefully malicious and assaulting.
                        </p>
                      </div>
                      <div className="form-check radio-green top">
                        <input
                          className="form-check-input"
                          name="group101"
                          type="radio"
                          id="radio105"
                        />
                        <label className="form-check-label" htmlFor="radio105">
                          Fake content
                        </label>
                        <p className="m-l-2 bottom">
                          This review contains false information or may be fake.
                        </p>
                      </div>
                      <button className="green-btn top1">submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* <ul className="pagination top1">
          <li className="page-item">
            <a className="page-link" href="#">
              <i className="fas fa-caret-left" />
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              <i className="fas fa-caret-right" />
            </a>
          </li>
        </ul>
       */}
          </div>
        ) : (
          "No Review found"
        )}
      </div>
    );
  }
}

export default TripReviewSection;
