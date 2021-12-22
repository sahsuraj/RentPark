import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../../Environment";
import { Redirect } from "react-router-dom";

class TripHistory extends Component {
  state = {
    histories: null,
    upcoming: null,
    loadingHistory: true,
    loadingUpcoming: true
  };

  componentDidMount() {
    // API call.

    api.postMethod("bookings_history").then(response => {
      if (response.data.success === true) {
        this.setState({ histories: response.data.data, loadingHistory: false });
      }
    });

    api.postMethod("bookings_upcoming").then(response => {
      if (response.data.success === true) {
        this.setState({ upcoming: response.data.data, loadingUpcoming: false });
      }
    });
  }

  handleClick = (event, data) => {
    event.preventDefault();

    // <Redirect to="/history-details/" />;
    this.props.history.push({
      pathname: "/history-details",
      state: { id: data.booking_id }
    });
    // this.props.history.push(/history-details:${data.booking_id});
  };

  render() {
    const { loadingHistory, loadingUpcoming, histories, upcoming } = this.state;

    return (
      <div className="main">
        <div className="site-content">
          <div className="top-bottom-spacing">
            <div>
              <h1 className="section-head">Bookings</h1>

              <ul className="nav nav-pills trips-pills" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="pill"
                    href="#history"
                  >
                    History
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" href="#upcoming">
                    Upcoming
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div id="history" className="tab-pane active">
                  {loadingHistory ? (
                    "Loading"
                  ) : histories.length > 0 ? (
                    <div className="row">
                      {histories.map(history => (
                        <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4">
                          <Link to={`/history-details/${history.booking_id}`}>
                            <div className="wishlist-img-sec">
                              <img
                                src={history.host_picture}
                                alt="image"
                                className="homes-img"
                              />
                              <div className="wishlist-text">
                                <h4 className="mt-0">{history.host_name}</h4>
                                <h5 className="m-0">{history.host_type}</h5>
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
                <div id="upcoming" className="tab-pane fade">
                  {loadingUpcoming ? (
                    "Loading"
                  ) : upcoming.length > 0 ? (
                    <div className="row">
                      {upcoming.map(upcome => (
                        <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4">
                          <Link to={`/history-details/${upcome.booking_id}`}>
                            <div className="wishlist-img-sec">
                              <img
                                src={upcome.host_picture}
                                alt="image"
                                className="homes-img"
                              />
                              <div className="wishlist-text">
                                <h4 className="mt-0">{upcome.host_name}</h4>
                                <h5 className="m-0">{upcome.host_type}</h5>
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
        </div>
      </div>
    );
  }
}

export default TripHistory;
