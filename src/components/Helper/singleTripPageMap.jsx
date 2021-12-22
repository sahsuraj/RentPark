import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Marker, Map } from "google-maps-react";
import { apiConstants } from "../../components/Constant/constants";

const mapStyles = {
    width: "100%",
    height: "400px"
};

export class SingleTripPageMap extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        content: {},
        loading: true
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

    render() {
        const data = "";
        const price = "234";
        const rate = "as";
        const { loading } = this.state;
        const { location } = this.props;
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                    lat: location.latitude,
                    lng: location.longitude
                }}
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={"Spome"}
                    title={"titile"}
                    //   label={{
                    //     text: "soem",
                    //     fontSize: "16px",
                    //     fontWeight: "bold",
                    //     color: "#fff"
                    //   }}
                    //   icon={{
                    //     url: window.location.origin + "/assets/mapicons/black-map.svg"
                    //   }}
                    position={{
                        lat: location.latitude,
                        lng: location.longitude
                    }}
                />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: apiConstants.google_api_key
})(SingleTripPageMap);
