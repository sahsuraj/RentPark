import React, { Component } from "react";
import SingleTripPageMap from "../../Helper/singleTripPageMap";

class TripLocation extends Component {
  state = {};
  render() {
    const { location } = this.props;
    return (
      <div id="location">
        <h4 className="collapse-head captalize">
          {location.host_location}'s Guidebook
        </h4>
        <div className="map-section top" style={{
          position: "relative",
          height: "400px"
        }}>
          <SingleTripPageMap location={location} />
        </div>
        <h4 className="map-text">
          exact location information is provided after a booking is confirmed.
        </h4>
      </div>
    );
  }
}

export default TripLocation;
