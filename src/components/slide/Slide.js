import React, { Component } from 'react';
import './Slide.css';

class Slide extends Component {
  render() {
    var slideStyle = {
      backgroundImage: "url(./images/" + this.props.step + ".png)"
    };
    var className = "slide " + this.props.customClass;
    return (
      <div style={slideStyle} className={className}>
        <div className="description">
          <div className="title">{this.props.step < 7 ? 'Step' : 'Summary'} {this.props.step} / 7</div>
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default Slide;
