import React, { Component } from "react";
import Helper from "../Helper/Helper";

class SingleParkingDetailHelper extends Helper {
  state = {};

  render() {
    const { single } = this.props;
    return (
      <div>
        <div className="parklist-img">
          <img src={single.host_picture} />
        </div>
        <div className="parklist-sec">
          <h5 className="park-tit">{single.host_name}</h5>
          <div className="rating-sec">
            <span className="rating-star">
              {this.starRatingHost(single.overall_ratings, 12)}
            </span>
            <span className="rating-sec-reviews">{single.total_ratings}</span>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <h4 className="park-sub-tit">{single.per_hour_formatted}</h4>
              <p className="park-txt">Per hour Price</p>
            </div>
            <div className="col-sm-6">
              <h4 className="park-sub-tit">{single.total_distance} Miles</h4>
              <p className="park-txt">Total Distance</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleParkingDetailHelper;
