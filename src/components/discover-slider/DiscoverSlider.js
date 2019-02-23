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
    const childWithProp = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { numOfSlides: this.props.numOfSlides, imageEnding: this.props.imageEnding });
    });
    return (
      <Slider {...settings}>
        {childWithProp}
      </Slider>
    );
  }
}

export default DiscoverSlider;
