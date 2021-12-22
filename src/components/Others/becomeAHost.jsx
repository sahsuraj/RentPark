import React, { Component } from "react";
import CalForm from "../Helper/calForm";
import FaqSection from "../Helper/faqSection";
import ToastDemo from "../Helper/toaster";
import { withToastManager } from "react-toast-notifications";
import { Link } from "react-router-dom";

import configuration from "react-global-configuration";

class BecomeAHost extends Component {
  state = {};
  componentDidMount() {
    if (this.props.location.state != null) {
      ToastDemo(
        this.props.toastManager,
        this.props.location.state.error,
        "error"
      );
    }
  }
  render() {
    return (
      <div>
        <div
          className="host-banner-sec"
          style={{
            backgroundImage: `url('../../../assets/img/parking/Ground_parking.jpg')`
          }}
        >
          <div className="host-banner-sec-overlay">
            <div className="site-content">
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-5 host-banner-aligncenter">
                  <div className="">
                    <h2 className="host-banner-subhead">
                      host on {configuration.get("configData.site_name")}
                    </h2>
                    <h1 className="host-banner-head white-color rent-tit sqme_hosth1">
                      Earn money as an 
                      sQemee host
                    </h1>
                    <Link to={"/host/register"} className="green-btn">
                      get started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="site-content">
          <div className="host-top-bottom-spacing">
            <div className="host-section-head">
              <h3 className="host_section_h3">
              <img
                      src="../assets/img/create_listing.png"
                      className="create_listing_img"
                    />
              </h3>
			  
            </div>
            <div className="row listings">
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 mob-listing-view">
                <div className="box outer-box">
                  <div className="inner content">
                    <img
                      src="../assets/img/5.png"
                      className="listing-img"
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div className="media">
                  <h1 className="count">1</h1>
                  <div className="media-body">
                    <div className="listings-head">
                      <h3>Create your listing</h3>
                    </div>
                    <div className="listings-para">
                      <p>
                        It’s free and easy to create a listing on{" "}
                        {configuration.get("configData.site_name")}. and takes less than 10 minutes.
                      </p>
                    </div>
                    <div className="listings-para">
                      <p>
                        Our pricing tool can recommend competitive rates, but
                        what you charge is always up to you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 listing-view text-right">
                <div className="box outer-box">
                  <div className="inner content">
                    <img
                      src="../assets/img/5.png"
                      className="listing-img"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row listings">
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div className="box outer-box">
                  <div className="inner content">
                    <img
                      src="../assets/img/6.png"
                      className="listing-img"
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div className="media">
                  <h1 className="count">2</h1>
                  <div className="media-body">
                    <div className="listings-head">
                      <h3>Accept Your Booking</h3>
                    </div>
                    <div className="listings-para">
                      <p>
                        Accept a booking request that suits you
                      </p>
                    </div>
                 
                  </div>
                </div>
              </div>
            </div>
            <div className="row listings">
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 mob-listing-view">
                <div className="box outer-box">
                  <div className="inner content">
                    <img
                      src="../assets/img/2.png"
                      className="listing-img"
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div className="media">
                  <h1 className="count">3</h1>
                  <div className="media-body">
                    <div className="listings-head">
                      <h3 >Earn up to $4,000/year</h3>
                    </div>
                    <div className="listings-para">
                      <p>
                       We'll deposit your monthly earning direct into your bank account
                      </p>
                    </div>
                   
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 listing-view text-right">
                <div className="box outer-box">
                  <div className="inner content">
                    <img
                      src="../assets/img/2.png"
                      className="listing-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-contentd whyHost">
          <div className="host-top-bottom-spacing">
            <div className="host-section-head remove_div">
            
            </div>

            <div className="row ">
              <div className="col-sm-12 hostdiv">
             <section className="section hostdiv">
		<div className="container whyHost">
			<h3>Why Host on sQemee?</h3>
			<p className="subtitle">sQemee is the easiest and safest way to make money from your spare parking space.</p>
			<hr />	
			
			<ul>
				<li>
					
					
					<div className="caption">
						<img src="../assets/img/img1.JPG" className="imgl" />
						<h5>It’s FREE and Easy to List</h5>
						<p>It takes less than 10 minutes to list your space and best of all it;s FREE! sQemee takes a small fee from Hosts for each successful transaction.</p>
					</div>
				</li>
				<li>
					<div className="caption">
						<img src="../assets/img/img2.JPG" className="imgl" />
						<h5>Start Earning Quickly</h5>
						<p>sQemee is the largest parking marketplace in Australia. On average, Hosts receive a booking within 10 days of signing up.</p>
					</div>
				</li>
				<li>
					<div className="caption">
						<img src="../assets/img/img3.JPG" className="imgl" />
						<h5>You Set the Rules</h5>
						<p>You accept the booking, accessibility, how you interact with the Host and the availability of your space.</p>
					</div>
				</li>
				<li>
					<div className="caption last_column">
						<img src="../assets/img/img4.JPG" className="imgl" />
						<h5>Trusted by Over 50,000 People</h5>
						
					</div>
				</li>
			</ul>
		</div>
	</section>
              </div>
              
            </div>
          </div>
        </div>
        <FaqSection />

        <div
          className="host-footer-img"
          style={{
            backgroundImage: `url('../../../assets/img/parking/car-parking-lot-5.jpg')`
          }}
        >
          <div className="site-content">
            <div className="row">
              <div className="col-sm-8 col-md-7 col-lg-6 col-xl-5">
                <div className="host-footer-content">
                  <div>
                    <div className="host-footer-content-head">
                      <h1>Start creating your listing</h1>
                    </div>
                    <a href="#" className="green-btn">
                      get started
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withToastManager(BecomeAHost);
