import React, { Component } from "react";
import api from "../../../HostEnvironment";
import { Link } from "react-router-dom";
import ToastDemo from "../../Helper/toaster";
import { withToastManager } from "react-toast-notifications";
import { Search, Grid, Header, Segment } from "semantic-ui-react";
import _ from "lodash";
const DATE_OPTIONS = {
  year: "numeric",
  month: "short",
  day: "numeric"
};

class HostListingManagement extends Component {
  state = {
    listings: null,
    loading: true,
    skipCount: 0,
    loadingStatus: true,
    loadingContent: null,
    isLoading: false,
    results: [],
    value: ""
  };
  componentDidMount() {
    this.listingApiCall();
    if (this.props.location.state != null) {
      ToastDemo(
        this.props.toastManager,
        this.props.location.state.message,
        "success"
      );
    }
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.host_name });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1)
        return this.setState({
          isLoading: false,
          results: [],
          value: ""
        });

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.host_name);

      this.setState({
        isLoading: false,
        results: _.filter(this.state.listings, isMatch)
      });
    }, 300);
  };

  hostStatusChange = (event, host_id) => {
    event.preventDefault();

    api.postMethod("hosts_status", { host_id: host_id }).then(response => {
      if (response.data.success) {
        this.setState({ loading: true, skipCount: 0, listings: null });
        this.listingApiCall();
        ToastDemo(this.props.toastManager, response.data.message, "success");
      }
    });
  };

  deleteHost = (event, host_id) => {
    event.preventDefault();
    api.postMethod("hosts_delete", { host_id: host_id }).then(response => {
      if (response.data.success) {
        this.setState({ loading: true, skipCount: 0, listings: null });
        this.listingApiCall();
        ToastDemo(this.props.toastManager, response.data.message, "success");
      }
    });
  };

  listingApiCall() {
    let items;
    api
      .postMethod("hosts_index", { skip: this.state.skipCount })
      .then(response => {
        if (response.data.success) {
          if (this.state.listings != null) {
            items = [...this.state.listings, ...response.data.data];
          } else {
            items = [...response.data.data];
          }
          this.setState({
            listings: items,
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

    this.listingApiCall();
  };

  render() {
    const { loading, loadingContent, loadingStatus } = this.state;
    let listings;
    const { isLoading, value, results } = this.state;
    if (results.length > 0) {
      listings = results;
    } else {
      listings = this.state.listings;
    }
    return (
      <div className="main">
        <div className="container-fluid">
          <div className="rooms top-bottom-spacing">
            <div className="rooms-head">
              <div className="room-filter input-group mb-3">
                <Grid>
                  <Grid.Column width={6}>
                    <Search
                      loading={isLoading}
                      onResultSelect={this.handleResultSelect}
                      onSearchChange={_.debounce(this.handleSearchChange, 500, {
                        leading: true
                      })}
                      results={results}
                      value={value}
                      {...this.props}
                    />
                  </Grid.Column>
                </Grid>
              </div>
            </div>
            <div className="room-content">
              <div className="rooms-table table-responsive">
                <table className="cmn-table table">
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Name</th>
                      {/* <th scope="col">
                        Instant Book <i className="fas fa-chevron-down" />
                      </th> */}
                      <th scope="col">
                        Space Type <i className="fas fa-chevron-down" />
                      </th>

                      <th scope="col">
                        Location <i className="fas fa-chevron-down" />
                      </th>
                      <th scope="col">
                        Status <i className="fas fa-chevron-down" />
                      </th>
                      <th scope="col">
                        Last Modified <i className="fas fa-chevron-down" />
                      </th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      ""
                    ) : listings.length > 0 ? (
                      listings.map((listing, index) => (
                        <tr key={listing.host_id}>
                          <td>{index + 1}</td>
                          <td>
                            <div>
                              <a href="#" className="room-list-img">
                                <img src={listing.host_picture} />
                              </a>
                              <div className="room-list-content">
                                <p className="room-list-tit">
                                  {listing.host_name}
                                </p>
                              </div>
                            </div>
                          </td>
                          {/* <td className="text-center">
                              <a
                                href="#"
                                className="light-img"
                                title="Instant Book"
                              >
                                <img src="../assets/img/light.svg" />
                              </a>
                            </td> */}

                          <td className="text-center">{listing.host_type}</td>
                          <td>{listing.host_location}</td>
                          <td>
                            {listing.admin_host_status ? (
                              <small className="text-success">
                                <i className="fas fa-thumbs-up" /> Admin
                                Approved
                              </small>
                            ) : (
                              <small className="text-danger">
                                <i className="fas fa-thumbs-down" /> Waiting for
                                Approval
                              </small>
                            )}

                            <div className="clearfix" />

                            {listing.provider_host_status ? (
                              <small className="text-success">
                                <i className="fas fa-check" /> Visible for User
                              </small>
                            ) : (
                              <small className="text-danger">
                                <i className="far fa-times-circle" /> Hided From
                                User
                              </small>
                            )}

                            <div className="clearfix" />

                            {listing.provider_host_status ? (
                              <small className="text-success">
                                <i className="fa fa-eye" /> Details verified
                              </small>
                            ) : (
                              <small className="text-danger">
                                <i className="far fa-eye-slash" /> Waiting for
                                Verification
                              </small>
                            )}
                          </td>
                          <td>
                            {listing.updated_at
                              ? new Date(listing.updated_at).toLocaleDateString(
                                  "en-US",
                                  DATE_OPTIONS
                                )
                              : "-"}
                          </td>
                          <td>
                            <ul className="action-menu nav">
                              <li className="nav-item dropdown">
                                <a
                                  className="dropdown-toggle action-menu-icon"
                                  href="#"
                                  id="navbarDropdown"
                                  role="button"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <img src="../assets/img/menu.svg" />
                                </a>
                                <div
                                  className="dropdown-menu dropdown-menu-right animate slideIn"
                                  aria-labelledby="navbarDropdown"
                                >
                                  <Link
                                    className="dropdown-item"
                                    to={`/host/edit-space/${listing.host_id}`}
                                  >
                                    <i className="far fa-edit" /> Edit
                                  </Link>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={event =>
                                      window.confirm("Are you sure?") &&
                                      this.hostStatusChange(
                                        event,
                                        listing.host_id
                                      )
                                    }
                                  >
                                    <i className="far fa-copy" />{" "}
                                    {listing.provider_host_status != 1
                                      ? "Enable Visibility"
                                      : "Disable Visibility"}{" "}
                                  </a>

                                  <Link
                                    className="dropdown-item"
                                    to={`/host/gallery/${listing.host_id}`}
                                  >
                                    <i className="far fa-image" /> Gallery
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to={`/host/availability/${listing.host_id}`}
                                  >
                                    <i className="far fa-image" /> Availability
                                  </Link>
                                  <a
                                    className="dropdown-item"
                                    href="#"
                                    onClick={event =>
                                      window.confirm("Are you sure?") &&
                                      this.deleteHost(event, listing.host_id)
                                    }
                                  >
                                    <i className="fas fa-trash-alt" /> Delete
                                  </a>
                                  {listing.complete_percentage >= 75 ? (
                                    <Link
                                      className="dropdown-item"
                                      to={`/host/single/${listing.host_id}`}
                                    >
                                      <i className="fas fa-eye" /> Preview
                                    </Link>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="no-data">
                        <td colspan="7">
                          <img src="../assets/img/parking/no-data.svg" />
                          <h5>No Data Found</h5>
                        </td>
                      </tr>
                    )}
                    {loadingStatus ? "" : loadingContent}
                  </tbody>
                </table>
                {loading ? (
                  ""
                ) : listings.length > 0 ? (
                  <Link to={"#"} onClick={this.loadMore}>
                    Load More
                  </Link>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(HostListingManagement);
