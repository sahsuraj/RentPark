import React, { Component } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
//import { url } from "inspector";

class Categories extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      adaptiveHeight: true,
      draggable: true
    };
    const { length: count } = this.props.categoryDetails;

    if (count === 0) {
      return <p />;
    }

    return (
      <div>
        <h1 className="section-head">{this.props.categoryDetails.title}</h1>
        <section>
          <Slider className="category" {...settings}>
            {this.props.categoryDetails.data.map(category => (
              <div key={category.category_id}>
                {this.props.categoryDetails.is_see_all == 1 ? (
                  <Link
                    to={`/see_all/${category.name}/${
                      category.api_page_type_id
                    }/${this.props.categoryDetails.api_page_type}`}
                  >
                    <div className="display-inline home-explore-card">
                      <div className="home-explore-left">
                        <div
                          className="home-explore-img"
                          style={{
                            backgroundImage: `url(${category.picture})`
                          }}
                        />
                      </div>
                      <div className="home-explore-right">
                        <p className="">{category.name}</p>
                      </div>
                    </div>
                    <div className="clearfix" />
                  </Link>
                ) : (
                  <Link
                    to={`/category/${category.name}/${
                      category.api_page_type_id
                    }/${this.props.categoryDetails.api_page_type}`}
                  >
                    <div className="display-inline home-explore-card">
                      <div className="home-explore-left">
                        <div
                          className="home-explore-img"
                          style={{
                            backgroundImage: `url(${category.picture})`
                          }}
                        />
                      </div>
                      <div className="home-explore-right">
                        <p className="">{category.name}</p>
                      </div>
                    </div>
                    <div className="clearfix" />
                  </Link>
                )}
              </div>
            ))}
            <div>
              <Link to="#">
                <div className="display-inline home-explore-card">
                  <div className="home-explore-left">
                    <div
                      className="home-explore-img"
                      style={{
                        backgroundImage: ``
                      }}
                    />
                  </div>
                  <div className="home-explore-right">
                    <p className="">ABC</p>
                  </div>
                </div>
                <div className="clearfix" />
              </Link>
            </div>
          </Slider>
        </section>
      </div>
    );
  }
}

export default Categories;
