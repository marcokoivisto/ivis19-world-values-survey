import React, { Component } from 'react';
import './Spacer.css';

class Spacer extends Component {
  render() {
    var className = "spacer " + this.props.size;
    return (
      <div className={className}></div>
    );
  }
}

export default Spacer;
