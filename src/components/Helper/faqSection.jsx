import React, { Component } from "react";

class FaqSection extends Component {
  state = {};
  render() {
    return (
      <div className="site-content">
        <div className="host-top-bottom-spacing">
          <div className="host-section-head">
            <h1>Frequently asked questions</h1>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <h4 className="faq-text">Getting Started</h4>
              <div id="accordion-faq" className="faq">
                <div className="card">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#collapse1"
                    >
                      <span>
                        <i className="fas fa-chevron-down" />
                      </span>
                      How much does it cost to get started?
                    </a>
                  </div>
                  <div id="collapse1" className="collapse">
                    <div className="card-body">
                    It costs nothing to create your listing on sQemee. So really... what are you waiting for?
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#collapse2"
                    >
                      <span>
                        <i className="fas fa-chevron-down" />
                      </span>
                      What are the benefits of listing?
                    </a>
                  </div>
                  <div id="collapse2" className="collapse">
                    <div className="card-body">
                    It’s free and easy to list Start earning quickly You set the rules Trusted by over 50,000 people

                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#collapse3"
                    >
                      <span>
                        <i className="fas fa-chevron-down" />
                      </span>
                      Who can list their parking spot on sQemee?
                    </a>
                  </div>
                  <div id="collapse3" className="collapse">
                    <div className="card-body">
                    Anyone who has a spot can! Whether you have a garage, car port, driveway, allocated parking in
your apartment block, or even a front lawn, you can earn with sQemee.
Being OnDemand you can list only a few hours at a time, or all week, sQemee can connect you to someone who’s looking for parking. We ask that your spot is easy to access by a driver, safe and does not interfere with footpaths

                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#collapse7"
                    >
                      <span>
                        <i className="fas fa-chevron-down" />
                      </span>
                      How do I verify who has parked in my car space?
                    </a>
                  </div>
                  <div id="collapse7" className="collapse">
                    <div className="card-body">
                    All of the members of our community are verified. Further, when you receive a booking, you will be able to see the driver’s name, vehicle license plate and also be able to contact them if you need to.

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <h4 className="faq-text"></h4>
              <div id="accordion-faq" className="faq">
                <div className="card">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#collapse4"
                    >
                      <span>
                        <i className="fas fa-chevron-down" />
                      </span>
                      Is there a minimum time I can list my spot for?
                    </a>
                  </div>
                  <div id="collapse4" className="collapse">
                    <div className="card-body">
                    You can list for as little as 30 mins when you’re off for a meeting, heading out to get groceries or go for a coffee. sQemee is on-demand so allows you flexibility and we know that finding parking even for an hour can be a pain.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#collapse5"
                    >
                      <span>
                        <i className="fas fa-chevron-down" />
                      </span>
                      How do I get paid?
                    </a>
                  </div>
                  <div id="collapse5" className="collapse">
                    <div className="card-body">
                    sQemee takes care of the hassle of managing payments and will facilitate the transactions for you. You can see your earnings by going to your ‘Dashboard’.
sQemee will payout your earnings daily. The time it takes for you to receive the earnings may
depend on which bank you are with. sQemee takes 10% of the transaction to cover the running costs of the app.

                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#collapse6"
                    >
                      <span>
                        <i className="fas fa-chevron-down" />
                      </span>
                      How much can I list my spot for?
                    </a>
                  </div>
                  <div id="collapse6" className="collapse">
                    <div className="card-body">
                    The world is your oyster. You have the freedom to be able to set your own pricing. If you would like a recommendation on how to optimise the pricing of your parking spot, please send us an email at contact@sqemee.com
                    </div>
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

export default FaqSection;
