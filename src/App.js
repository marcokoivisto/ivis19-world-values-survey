import React, { Component } from 'react';
import { Container, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
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
        <div className="content text-center">
          <Container>
            <Spacer size="extra-large" />
            {this.renderToggles()}
            <Spacer />
            <h2>Discover processes of {!this.state.discoverProcessToShow ? 'World Values Survey' : 'my visualization'}</h2>
            <p>What country were prefeering the child qualities <b>obedience</b> and <b>hard work</b> the most in the time span of 2010-2014?</p>
            <Spacer size="small" />
            {this.renderSlider()}
          </Container>
          <Spacer size="extra-large" />
        </div>
      </div>
    );
  }
  setDiscoverProcessToShow(number) {
    this.setState({ discoverProcessToShow: number });
  }
  renderToggles() {
    return(
      <ToggleButtonGroup type="radio" name="options" defaultValue={0}>
        <ToggleButton variant="secondary" value={0} onClick={() => this.setDiscoverProcessToShow(0)}>World Values Survey</ToggleButton>
        <ToggleButton variant="secondary" value={1} onClick={() => this.setDiscoverProcessToShow(1)}>My visualization</ToggleButton>
      </ToggleButtonGroup>
    )
  }
  renderSlider() {
    if (!this.state.discoverProcessToShow) {
      return (
        <DiscoverSlider numOfSlides={8} imageEnding={''} key={0}>
          <Slide step="1" text="Firstly I'm selecting the time span 2010-2014." />
          <Slide step="2" text="I'm selecting all countries." />
          <Slide step="3" text="A single dimension of data can be selected, dimensions can’t be compared to each other. I start by selecting obedience." />
          <Slide step="4" text="The initial visualization offers a table. Making it very hard compairing all countries." />
          <Slide step="5" text="I find a bar diagram where I compare the values and see that India is prefeering obedience most of the countries." />
          <Slide step="6" text="I go back and select hard work." />
          <Slide step="7" text="By compairing the values in a bar diagram once again I see that India is also prefeering hard work most of the countries." />
          <Slide title="Summary" step="8" customClass="full" text="The selection through the step navigation makes the interaction with the final visualization inefficient, you need to step back and forth. The visualizations are poor, the initial presentation is a table which does not allow for comparison of many countries. Some of the main issues are that the data is poorly described and hard to interpret, secondly that only a single dimension of the data can be viewed at the same time and no filtering is provided." />
        </DiscoverSlider>
      )
    } else {
      return (
        <DiscoverSlider numOfSlides={6} imageEnding={'-my'} key={1}>
          <Slide step="1" text="Firstly I'm selecting the time span 2010-2014." />
          <Slide textPosition="right" step="2" text="I'm then choosing the qualities obedience and hard work." />
          <Slide step="3" text="I then filter out countries which see hard work as low and medium prefeered." />
          <Slide step="4" text="I pan the map in order too see I'm not missing any country results." />
          <Slide step="5" text="By hovering the remaining results I see that India prefers the child qualities obedience and hard work more than any country." />
          <Slide title="Learnings" step="6" customClass="full" text="From the process of creating this visualization I've mainly learnt that processing data takes lots of time. I have also seen the extreme value in proper visualizations with simple filtering options and more. I have also increased my knowledge of visualizing data in react. If I had more time I would like to add filtering for both variables instead of just one, add further data and possibly try to fit a third dimension in the visualization. It would also be nice to provide navigation where all the data of a specific country could be visualized." />
        </DiscoverSlider>
      )
    }
  }
}

export default App;
