import React, { Component } from "react";
import { Link } from "react-router-dom";

class HostSubPaySuccess extends Component {
    state = {};
    render() {
        return (
            <div className="main">
                <div className="container">
                    <div className="top-bottom-spacing">
                        <div className="payment-status text-center">
                            <img
                                src="../../../assets/img/money.png"
                                className="pay-money"
                            />
                            <h3 className="pay-modal-tit">Thank You!</h3>
                            <p className="pay-modal-txt">
                                Your Payment is received successfully !!
                            </p>
                            {/* <p className="pay-modal-sub-txt">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p> */}
                            <Link
                                to={"/host/subscription-history"}
                                className="green-btn invoice-pay-btn small-btn"
                            >
                                View History
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HostSubPaySuccess;
