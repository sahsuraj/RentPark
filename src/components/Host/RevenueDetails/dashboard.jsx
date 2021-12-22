import React, { Component } from "react";
import api from "../../../HostEnvironment";
import Loader from "../../Helper/Loader";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "../../Helper/toaster";
import HostHelper from "../../Helper/hostHelper";
import { Redirect } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

let last_x_days_labels = [];
let last_x_days_data = [];
let items;
class HostDashbaord extends HostHelper {
    state = {
        datas: null,
        loading: true,
        error: null,
        loginStatus: true,
        isMonthlyRevenueChart: false
    };

    componentDidMount() {
        api.postMethod("dashboard").then(response => {
            if (response.data.success) {
                this.setState({ datas: response.data.data, loading: false });
                let totalDaysEarnings = 10;
                items = [];
                last_x_days_data = [];
                last_x_days_labels = [];
                items = this.state.datas.last_x_days_earnings.map(earn => {
                    console.log(earn.total);
                    if (earn.total > 0.0) {
                    } else {
                        totalDaysEarnings--;
                    }

                    last_x_days_labels.push(earn.date);
                    last_x_days_data.push(earn.total);
                });

                if (totalDaysEarnings > 0) {
                    // if (totalDaysEarnings == 1) {
                    //     last_x_days_labels.push("07 Aug 2019");
                    //     last_x_days_data.push("10.00");
                    // }
                    this.setState({ isMonthlyRevenueChart: true });
                }
                // alert(totalDaysEarnings);
            } else {
                this.checkLoginHost(response.data);
                ToastDemo(
                    this.props.toastManager,
                    response.data.error,
                    "error"
                );
            }
        });
    }

    render() {
        const { loading, datas, error, loginStatus } = this.state;

        const data = {
            labels: last_x_days_labels,
            datasets: [
                {
                    label: "Last 10 days",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    borderWidth: 2,
                    lineTension: 0.1,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: last_x_days_data
                }
            ]
        };

        if (!loginStatus) {
            return (
                <Redirect
                    to={{
                        pathname: "/host/login",
                        state: { error: error }
                    }}
                />
            );
        }
        // let load = new Loader();
        return (
            <div className="main">
                <div className="container">
                    <div className="top-bottom-spacing">
                        <div className="row">
                            {loading ? (
                                ""
                            ) : (
                                <div className="provider-right col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                    <h2 className="sec-tit">Dashboard</h2>
                                    <div className="widget dashboard-block row mb-30">
                                        <div className="col-md-3">
                                            <div className="widget-card border-success">
                                                <h6 className="widget-tit success-txt">
                                                    <span>
                                                        {datas.currency}
                                                    </span>
                                                    {datas.total_earnings}
                                                </h6>
                                                <p className="widget-txt">
                                                    Total Earnings
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="widget-card border-primary card-shadow-primary">
                                                <h6 className="widget-tit primary-txt">
                                                    <span>
                                                        {datas.currency}
                                                    </span>
                                                    {
                                                        datas.current_month_earnings
                                                    }
                                                </h6>
                                                <p className="widget-txt">
                                                    Current Month Earning
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="widget-card border-warning card-shadow-warning">
                                                <h6 className="widget-tit warning-txt">
                                                    <span>
                                                        {datas.currency}
                                                    </span>
                                                    {datas.today_earnings}
                                                </h6>
                                                <p className="widget-txt">
                                                    Today Earnings
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="widget-card border-danger card-shadow-danger">
                                                <h6 className="widget-tit danger-txt">
                                                    <span>
                                                        {datas.currency}
                                                    </span>
                                                    {datas.total_bookings}
                                                </h6>
                                                <p className="widget-txt">
                                                    Total Bookings
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="report-sec row dashboard-block ">
                                        <div className="col-md-6">
                                            <div className="dashboard-card">
                                                <h3 className="dashboard-tit">
                                                    Monthly Revenues{" "}
                                                </h3>
                                                {this.state
                                                    .isMonthlyRevenueChart ? (
                                                    <Bar
                                                        data={data}
                                                        width={500}
                                                        height={350}
                                                        options={{
                                                            maintainAspectRatio: true,
                                                            responsive: true,
                                                            scales: {
                                                                xAxes: [
                                                                    {
                                                                        gridLines: {
                                                                            display: true
                                                                        }
                                                                    }
                                                                ],
                                                                yAxes: [
                                                                    {
                                                                        gridLines: {
                                                                            display: true
                                                                        },
                                                                        ticks: {
                                                                            beginAtZero: true
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="no-data">
                                                        <img src="../assets/img/parking/no-data.svg" />
                                                        <h5>
                                                            Sorry. Your earnings
                                                            are empty.
                                                        </h5>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="dashboard-card">
                                                <h3 className="dashboard-tit">
                                                    Highlights
                                                </h3>

                                                {loading ? (
                                                    "Loading..."
                                                ) : datas
                                                      .current_month_highlights
                                                      .length > 0 ? (
                                                    datas.current_month_highlights.map(
                                                        (
                                                            current_month_highlight,
                                                            index
                                                        ) => (
                                                            <Link
                                                                to={`/host/booking-details/${current_month_highlight.booking_id}`}
                                                            >
                                                                <div className="highlight-box-wrap">
                                                                    {" "}
                                                                    <div className="highlight-box">
                                                                        <div className="highlight-img">
                                                                            <img
                                                                                src={
                                                                                    current_month_highlight.user_picture
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="highlight-content">
                                                                            <h5 className="highlight-tit">
                                                                                {
                                                                                    current_month_highlight.user_name
                                                                                }
                                                                            </h5>
                                                                            <span className="badge badge-success dashboard-high-price">
                                                                                {
                                                                                    current_month_highlight.provider_amount_formatted
                                                                                }
                                                                            </span>
                                                                            <p>
                                                                                {
                                                                                    current_month_highlight.paid_date
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="clear-both" />
                                                                </div>
                                                            </Link>
                                                        )
                                                    )
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withToastManager(HostDashbaord);
// export default App;
