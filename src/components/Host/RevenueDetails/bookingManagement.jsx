import React, { Component } from "react";
import SideBar from "./sideBar";
import api from "../../../HostEnvironment";
import { Link } from "react-router-dom";
import Loader from "../../Helper/Loader";
import HostHelper from "../../Helper/hostHelper";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";

class HostBookingManagement extends HostHelper {
    state = {
        loading: true,
        bookings: null,
        skipCount: 0,
        loadingStatus: true,
        loadingContent: null
    };
    componentDidMount() {
        this.boookingManagementApiCall();
    }

    boookingManagementApiCall() {
        let items;
        api.postMethod("bookings_history", { skip: this.state.skipCount }).then(
            response => {
                if (response.data.success === true) {
                    if (this.state.bookings != null) {
                        items = [...this.state.bookings, ...response.data.data];
                    } else {
                        items = [...response.data.data];
                    }
                    this.setState({
                        bookings: items,
                        loading: false,
                        skipCount:
                            response.data.data.length + this.state.skipCount,
                        loadingStatus: true
                    });
                }
            }
        );
    }

    loadMore = event => {
        this.setState({ loadingStatus: false, loadingContent: "Loading..." });
        event.preventDefault();

        this.boookingManagementApiCall();
    };

    handleCancel = async (event, booking) => {
        event.preventDefault();
        api.postMethod("bookings_cancel", {
            booking_id: booking.booking_id
        }).then(response => {
            if (response.data.success) {
                ToastDemo(
                    this.props.toastManager,
                    response.data.message,
                    "success"
                );
            } else {
                ToastDemo(
                    this.props.toastManager,
                    response.data.error,
                    "error"
                );
            }
        });
    };

    render() {
        let load = new Loader();
        const { loading, bookings, loadingContent, loadingStatus } = this.state;
        return (
            <div className="main">
                <div className="site-content">
                    <div
                        className="top-bottom-spacing booking-list"
                        style={{ padding: "50px 0px" }}
                    >
                        <div className="row">
                            <SideBar />

                            <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
                                <h2 className="sec-tit">Booking Management</h2>

                                <div className="table-responsive">
                                    <table className="cmn-table table booking-table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">User</th>
                                                <th scope="col">
                                                    Space / CheckIn
                                                </th>
                                                <th scope="col">Duration</th>
                                                <th scope="col">Total</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                load.propertyLoader()
                                            ) : bookings.length > 0 ? (
                                                bookings.map(
                                                    (booking, index) => (
                                                        <tr
                                                            key={
                                                                booking.booking_id
                                                            }
                                                        >
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                <div>
                                                                    <div className="book-img">
                                                                        <Link
                                                                            to={`/profile/${booking.user_id}`}
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    booking.user_picture
                                                                                }
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                    <div className="book-prof-name">
                                                                        {
                                                                            booking.user_name
                                                                        }

                                                                        <Link
                                                                            to={`/host/booking-details/${booking.booking_id}`}
                                                                        >
                                                                            <p>
                                                                                #
                                                                                {
                                                                                    booking.booking_unique_id
                                                                                }
                                                                            </p>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    {/* <div className="tour-list-img">
                                    <img src={booking.host_picture} />
                                  </div> */}
                                                                    <div className="">
                                                                        <h6 className="host-tit">
                                                                            {
                                                                                booking.host_name
                                                                            }
                                                                        </h6>
                                                                        <p>
                                                                            {
                                                                                booking.checkin
                                                                            }{" "}
                                                                            -{" "}
                                                                            {
                                                                                booking.checkout
                                                                            }
                                                                        </p>
                                                                        {/* <p className="host-txt">Japan</p> */}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {/* <td>{booking.checkin} - {booking.checkout}</td> */}
                                                            <td>
                                                                {
                                                                    booking.duration
                                                                }
                                                            </td>

                                                            <td>
                                                                <span>
                                                                    {
                                                                        booking.total_formatted
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span className="badge status-btn badge-success">
                                                                    {
                                                                        booking.status_text
                                                                    }
                                                                </span>
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
                                                                                to={`/host/booking-details/${booking.booking_id}`}
                                                                            >
                                                                                <i className="fas fa-eye" />{" "}
                                                                                View
                                                                                Booking
                                                                            </Link>
                                                                            {/* <a className="dropdown-item" href="#">
                                        <i className="fas fa-check-circle" />{" "}
                                        Accept
                                      </a> */}
                                                                            {booking
                                                                                .buttons
                                                                                .cancel_btn_status ? (
                                                                                <Link
                                                                                    className="dropdown-item"
                                                                                    to="#"
                                                                                    onClick={e =>
                                                                                        this.handleCancel(
                                                                                            e,
                                                                                            booking
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <i className="fas fa-trash-alt" />{" "}
                                                                                    Cancel
                                                                                </Link>
                                                                            ) : (
                                                                                ""
                                                                            )}
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr className="no-data">
                                                    <td colspan="8">
                                                        <img src="../assets/img/parking/no-data.svg" />
                                                        <h5>No Data Found</h5>
                                                    </td>
                                                </tr>
                                            )}
                                            {loadingStatus
                                                ? ""
                                                : loadingContent}
                                        </tbody>
                                    </table>
                                    {loading ? (
                                        ""
                                    ) : bookings.length > 0 ? (
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
            </div>
        );
    }
}

export default withToastManager(HostBookingManagement);
