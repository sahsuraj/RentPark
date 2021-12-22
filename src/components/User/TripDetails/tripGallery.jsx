import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class TripGallery extends Component {
  state = {};
  render() {
    const { details } = this.props;
    return (
      <div className="modal fade" id="image-gal">
        <div className="modal-header">
          <button
            type="button"
            className="close"
            id="close-login"
            data-dismiss="modal"
          >
            <i className="material-icons">close</i>
          </button>
        </div>

        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <div id="" className="fullscreen">
                <Carousel
                  showThumbs={false}
                  infiniteLoop={true}
                  showStatus={false}
                >
                  {details.gallery.map(image => (
                    <div key={image.picture}>
                      <img
                        srcSet={image.picture}
                        src={image.picture}
                        alt="image"
                        className="homes-img"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TripGallery;
