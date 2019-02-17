import React, { Component } from 'react';
import Slider from "react-slick";

class DiscoverSlider extends Component {
  render() {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0
    };
    return (
      <Slider {...settings}>
        {this.props.children}
      </Slider>
    );
  }
}

export default DiscoverSlider;
