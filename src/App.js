import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import DiscoverSlider from './components/discover-slider/DiscoverSlider';
import Slide from './components/slide/Slide';
import Map from './components/map/Map';
import Spacer from './components/spacer/Spacer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      discoverProcessToShow: 0,
    }
  }
  render() {
    return (
      <div className="App">
        <Map></Map>
        <Container>
          <Spacer size="extra-large" />
          <h2>Discover process of WVS</h2>
          <Spacer size="small" />
          <DiscoverSlider>
            <Slide step="1" text="Lets you select a time span which then can not be changed without going back." />
            <Slide step="2" text="Countries you want to compare can be filtered. These settings can not be changed without going back here." />
            <Slide step="3" text="A single dimension of data can be selected, dimensions can’t be compared to each other." />
            <Slide step="4" text="The initial visualization offers a table. The values of the table can be presented in percentage, count etc." />
            <Slide step="5" text="Some different diagram visualizations are available, which makes it a bit easier to compare countries." />
            <Slide step="6" text="A map visualization is available but visualizing multiple dimensions to compare different data is still not available here." />
            <Slide step="7" customClass="full" text="The selection through the step navigation makes the interaction with the final visualization inefficient, you need to step back and forth. The visualizations are poor, the initial presentation is a table which does not allow for comparison of many countries. The map and diagrams are a bit better for comparison among countries. The largest issue is that only a single dimension of the data can be compared at the same time." />
          </DiscoverSlider>

          <Spacer size="extra-large" />

          <h2>Discover process of my visualization</h2>
          <Spacer size="small" />
          <DiscoverSlider>
            <Slide step="1" text="Lets you select a time span which then can not be changed without going back." />
            <Slide step="2" text="Countries you want to compare can be filtered. These settings can not be changed without going back here." />
            <Slide step="3" text="A single dimension of data can be selected, dimensions can’t be compared to each other." />
            <Slide step="4" text="The initial visualization offers a table. The values of the table can be presented in percentage, count etc." />
            <Slide step="5" text="Some different diagram visualizations are available, which makes it a bit easier to compare countries." />
            <Slide step="6" text="A map visualization is available but visualizing multiple dimensions to compare different data is still not available here." />
            <Slide step="7" customClass="full" text="The selection through the step navigation makes the interaction with the final visualization inefficient, you need to step back and forth. The visualizations are poor, the initial presentation is a table which does not allow for comparison of many countries. The map and diagrams are a bit better for comparison among countries. The largest issue is that only a single dimension of the data can be compared at the same time." />
          </DiscoverSlider>
        </Container>
        <Spacer size="extra-large" />
      </div>
    );
  }
  setDiscoverProcessToShow(number) {
    this.setState({ discoverProcessToShow: number });
  }
  renderToggles() {
    return(
      <div>
        <Button onClick={() => this.setDiscoverProcessToShow(0)} className={!this.state.discoverProcessToShow ? 'toggle active' : 'toggle'}>WVS</Button>
        <Button onClick={() => this.setDiscoverProcessToShow(1)} className={this.state.discoverProcessToShow ? 'toggle active' : 'toggle'}>My visualization</Button>
      </div>
    )
  }
}

export default App;
