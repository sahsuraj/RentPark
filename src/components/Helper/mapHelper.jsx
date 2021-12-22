import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Marker, Map } from "google-maps-react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Helper from "./Helper";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ReactDOM from "react-dom";
import { withToastManager } from "react-toast-notifications";
import ToastDemo from "./toaster";
import { apiConstants } from "../../components/Constant/constants";

const mapStyles = {
    width: "100%",
    height: "100%"
};

export class MapContainer extends Helper {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        content: {},
        loading: true,
        currentLocation: {
            lat: 12.9121,
            lng: 77.6446
        }
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
            loading: false
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
                loading: true
            });
        }
    };

    showParkingDetails = (event, content) => {
        event.preventDefault();
        if (localStorage.getItem("userLoginStatus"))
            this.props.history.push("/payment", content);
        else
            ToastDemo(
                this.props.toastManager,
                "Please login to continue",
                "error"
            );
    };

    onInfoWindowOpen(props, e) {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true
        };
        const button = (
            <div className="row">
                <div className="subcategory-card">
                    <div className="relative">
                        <section className="">
                            <Slider {...settings}>
                                <div>
                                    <div className="homes-img-sec1">
                                        <img
                                            src={
                                                this.state.activeMarker.content
                                                    .host_picture
                                            }
                                            alt="image"
                                            className="homes-img"
                                        />
                                    </div>
                                </div>
                            </Slider>
                        </section>
                    </div>

                    <a
                        href="#"
                        onClick={event =>
                            this.showParkingDetails(
                                event,
                                this.state.activeMarker.content
                            )
                        }
                    >
                        <div
                            className="homes-text-sec"
                            // onClick={this.showParkingDetails}
                        >
                            <p className="red-text">
                                {this.state.activeMarker.content.host_location}{" "}
                            </p>
                            <h4 className="homes-title">
                                {this.state.activeMarker.content.host_name}
                            </h4>
                            <h5 className="homes-price ">
                                <span>
                                    {
                                        this.state.activeMarker.content
                                            .per_hour_formatted
                                    }{" "}
                                    {
                                        this.state.activeMarker.content
                                            .per_hour_symbol
                                    }
                                </span>{" "}
                            </h5>
                            <h5 className="rating-sec">
                                <span className="rating-star">
                                    {this.starRatingHost(
                                        this.state.activeMarker.overall_ratings,
                                        12
                                    )}
                                </span>
                                <span>
                                    &nbsp;(
                                    {
                                        this.state.activeMarker.content
                                            .total_ratings
                                    }
                                    )
                                </span>
                            </h5>
                        </div>
                    </a>
                </div>
            </div>
        );
        ReactDOM.render(
            React.Children.only(button),
            document.getElementById("displayParking")
        );
    }

    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true
        };
        const data = "";
        const price = "234";
        const rate = "as";
        const { loading } = this.state;

        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={this.props.currentLocation}
                centerAroundCurrentLocation={false}
            >
                {this.props.data.map(content => (
                    <Marker
                        key={content.host_id}
                        onClick={this.onMarkerClick}
                        name={content.host_name}
                        title={content.host_name}
                        content={content}
                        label={{
                            text: content.per_hour_formatted,
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#fff"
                        }}
                        icon={{
                            url:
                                window.location.origin +
                                "/assets/mapicons/black-map.svg"
                        }}
                        // icon={{
                        //   url:
                        //     'data:image/svg+xml;utf-8, \
                        //               <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"> \
                        //               <g fill-rule="evenodd"> \
                        //       <text font-size="8.276" font-weight="bold"> \
                        //           <tspan x="4" y="13"> \
                        //           </tspan> \
                        //       </text> \
                        //       <text font-size="8.276" font-weight="bold">\
                        //           <tspan x=".37" y="8"></tspan>\
                        //       </text>\
                        //   </g>\
                        //               </svg>'
                        // }}
                        position={{
                            lat: content.latitude,
                            lng: content.longitude
                        }}
                    />
                ))}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                    onOpen={e => {
                        this.onInfoWindowOpen(this.props, e);
                    }}
                >
                    {loading ? "" : <div id="displayParking" />}
                </InfoWindow>
            </Map>
        );
    }
}

export default withToastManager(
    GoogleApiWrapper({
        apiKey: apiConstants.google_api_key
    })(MapContainer)
);
