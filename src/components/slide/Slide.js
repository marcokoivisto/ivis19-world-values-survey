import React, { Component } from 'react';
import './Slide.css';

class Slide extends Component {
  render() {
    var slideStyle = {
      backgroundImage: "url(./images/" + this.props.step + this.props.imageEnding + ".png)"
    };
    var className = "slide " + this.props.customClass;
    return (
      <div style={slideStyle} className={className}>
        <div className={this.props.textPosition === 'right' ? 'description right' : 'description'}>
          <div className="title">{this.props.step == this.props.numOfSlides ? this.props.title : 'Step'} {this.props.step} / {this.props.numOfSlides}</div>
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default Slide;
