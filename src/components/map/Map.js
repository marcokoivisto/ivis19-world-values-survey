import React, { Component } from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import { from2010to2014, from2005to2009, from1999to2004, from1995to1998, from1990to1994 } from '../../data/wvs_data_sets.js';
import { Container, Row, Col, ToggleButtonGroup, ToggleButton, Form } from 'react-bootstrap';
import Spacer from '../spacer/Spacer';
import dimensionNames from '../../data/wvs_data_strings.js';
import './Map.css';

const wrapperStyles = {
  width: '100%',
  height: '100vh',
  overflow: 'hidden'
}

const colorScale = scaleLinear()
  .domain([0, 2250, 4500])
  .range(["#dc3545", "#ffc107", "#28a745"])

const independenceScale = scaleLinear()
  .domain([0, 4500])
  .range([3, 40])

class Map extends Component {
  constructor() {
    super()
    this.state = {
      center: [0, 20],
      zoom: 0.9,
      countries: from2010to2014,
      sizeVariable: 'independence',
      colorVariable: 'hard_work',
      showSetsLow: true,
      showSetsMedium: true,
      showSetsHigh: true,
      unfilteredCountries: from2010to2014,
    }
    this.handleSelectVariableChange = this.handleSelectVariableChange.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100)
  }
  handleYearChange(year) {
    this.setState({ showSetsLow: true, showSetsMedium: true, showSetsHigh: true });
    this.setState({currentYear: year});
    var dataSet = null;
    switch (year) {
      case 2014:
        dataSet = from2010to2014;
        break;
      case 2009:
        dataSet = from2005to2009;
        break;
      case 2004:
        dataSet = from1999to2004;
        break;
      case 1998:
        dataSet = from1995to1998;
        break;
      case 1994:
        dataSet = from1990to1994;
        break;
    
      default:
        break;
    }
    this.setState({ countries: dataSet, unfilteredCountries: dataSet });
  }
  handleSelectVariableChange(event) {
    if (event.target.name !== 'color') {
      this.setState({ sizeVariable: event.target.value });
    } else {
      this.setState({ colorVariable: event.target.value });
    }
  }
  handleFilterCountries(filter) {
    if (filter === 0) {
      this.setState({ showSetsLow: !this.state.showSetsLow }, (filter) => this.filterCountries(filter));
    } else if (filter === 1) {
      this.setState({ showSetsMedium: !this.state.showSetsMedium }, (filter) => this.filterCountries(filter));
    } else if (filter === 2) {
      this.setState({ showSetsHigh: !this.state.showSetsHigh }, (filter) => this.filterCountries(filter));
    }
  }
  filterCountries(filter) {
    this.setState({ countries: this.state.unfilteredCountries });
    var filtered = this.state.unfilteredCountries;

    if ((filter === 0 && this.state.showSetsLow) || !this.state.showSetsLow) {
      filtered = filtered.filter((country) => {
        return country[this.state.colorVariable] > 1500;
      });
    }
    if ((filter === 1 && this.state.showSetsMedium) || !this.state.showSetsMedium) {
      filtered = filtered.filter((country) => {
        return country[this.state.colorVariable] < 1500 || country[this.state.colorVariable] > 3000;
      });
    }
    if ((filter === 2 && this.state.showSetsHigh) || !this.state.showSetsHigh) {
      filtered = filtered.filter((country) => {
        return country[this.state.colorVariable] < 3000;
      });
    }

    this.setState({countries: filtered});
  }
  render() {
    return (
      <div style={wrapperStyles}>
        {this.renderTopBar()}
        <ComposableMap
          projectionConfig={{ scale: 205 }}
          width={980}
          height={551}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
        <ZoomableGroup center={this.state.center} zoom={this.state.zoom}>
          <Geographies geography="/static/world-50m-with-population.json">
            {(geographies, projection) =>
              geographies.map((geography, i) =>
                geography.id !== "ATA" && (
                  <Geography
                    key={i}
                    data-tiip={"<p class='tool-tip-title'>" + geography.properties.name + "</p> <b>Population:</b> " + geography.properties.pop_est + ""}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: '#ddd',
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      hover: {
                        fill: "#ECEFF1",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#ECEFF1",
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                    }}
                  />
                ))}
          </Geographies>
          <Markers>
            {this.state.countries.length &&
              this.state.countries.map((country, i) => (
                <Marker key={i} marker={country}>
                  <circle
                    cx={0}
                    cy={0}
                    r={independenceScale(country['' + this.state.sizeVariable])}
                    data-tip={"<p class='tool-tip-title'><i class='fas fa-flag'></i> " + country.name + "</p><div class='flex align-items-center'><div class='circle size'><i class='fal fa-arrows-h'></i></div><span><b>" + dimensionNames(this.state.sizeVariable) + "</b><br>" + country['' + this.state.sizeVariable] + " mentioned</span></div><div class='flex align-items-center'><div class='circle color gradient-color'><i class='fal fa-palette'></i></div><span><b>" + dimensionNames(this.state.colorVariable) + "</b><br>" + country['' + this.state.colorVariable] + " mentioned</span></div>"}
                    fill={colorScale(country['' + this.state.colorVariable])}
                    stroke="#607D8B"
                    strokeWidth="2"
                  />
                </Marker>
              ))
            }
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
        <ReactTooltip html={true} className="tool-tip" />
      {this.renderBottomBar()}
    </div>
    )
  }
  renderTopBar() {
    return (
      <div className="bar top">
        <Spacer />
        <Container>
          <Row bsPrefix="row justify-content-between align-items-center">
            <Col md="auto">
              <div className="flex align-items-center">
                <h1><i className="fas fa-child"></i></h1>
                <div className="h-spacing-small"></div>
                <span>
                  <h1>Important child qualities</h1>
                  <p className="no-margin">Visualizes prefeered child qualities worldwide</p>
                </span>
              </div>
            </Col>
            <Col md="auto">
              <Form.Label><b>Year</b></Form.Label>
              <ToggleButtonGroup type="radio" name="options" defaultValue={2014}>
                <ToggleButton variant="secondary" value={1994} onClick={() => this.handleYearChange(1994)}>1990-1994</ToggleButton>
                <ToggleButton variant="secondary" value={1998} onClick={() => this.handleYearChange(1998)}>1995-1998</ToggleButton>
                <ToggleButton variant="secondary" value={2004} onClick={() => this.handleYearChange(2004)}>1999-2004</ToggleButton>
                <ToggleButton variant="secondary" value={2009} onClick={() => this.handleYearChange(2009)}>2005-2009</ToggleButton>
                <ToggleButton variant="secondary" value={2014} onClick={() => this.handleYearChange(2014)}>2010-2014</ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Row>
        </Container>
        <Spacer />
      </div>
    )
  }
  renderBottomBar() {
    return (
      <div className="bar bottom">
        <Spacer />
        <Container>
          <Row bsPrefix="row justify-content-between align-items-center">
            <Col md="auto">
              <div className="flex align-items-center">
                <div className="circle size"><i class="fal fa-arrows-h"></i></div>
                <div className="h-spacing-small"></div>
                <Form.Group className="no-margin" controlId="exampleForm.ControlSelectSize">
                  <Form.Label><b>Size</b></Form.Label>
                  <Form.Control name="size" as="select" onChange={this.handleSelectVariableChange} value={this.state.sizeVariable}>
                    <option key="independence" value="independence">Independence</option>
                    <option key="hard_work" value="hard_work">Hard work</option>
                    <option key="saving_money" value="saving_money">Thrift saving money and things</option>
                    <option key="unselfishness" value="unselfishness">Unselfishness</option>
                    <option key="imagination" value="imagination">Imagination</option>
                    <option key="tolerance_and_respect" value="tolerance_and_respect">Tolerance and respect for other people</option>
                    <option key="determination" value="determination">Determination, perseverance</option>
                    <option key="obedience" value="obedience">Obedience</option>
                  </Form.Control>
                </Form.Group>
                <div className="h-spacing"></div>
                <div className="circle color gradient-color"><i class="fal fa-palette"></i></div>
                <div className="h-spacing-small"></div>
                <Form.Group className="no-margin" controlId="exampleForm.ControlSelectColor">
                  <Form.Label><b>Fill</b></Form.Label>
                  <Form.Control name="color" as="select" onChange={this.handleSelectVariableChange} value={this.state.colorVariable}>
                    <option key="independence" value="independence">Independence</option>
                    <option key="hard_work" value="hard_work">Hard work</option>
                    <option key="saving_money" value="saving_money">Thrift saving money and things</option>
                    <option key="unselfishness" value="unselfishness">Unselfishness</option>
                    <option key="imagination" value="imagination">Imagination</option>
                    <option key="tolerance_and_respect" value="tolerance_and_respect">Tolerance and respect for other people</option>
                    <option key="determination" value="determination">Determination, perseverance</option>
                    <option key="obedience" value="obedience">Obedience</option>
                  </Form.Control>
                </Form.Group>
              </div>
            </Col>
            <Col md="auto">
              <div className="color-scale gradient-color">
                <a onClick={() => this.handleFilterCountries(0)} href="#" className={this.state.showSetsLow ? 'filter-button active' : 'filter-button'}><i className={this.state.showSetsLow ? 'fas fa-check' : 'fas fa-times'}></i> Low</a>
                <a onClick={() => this.handleFilterCountries(1)} href="#" className={this.state.showSetsMedium ? 'filter-button active' : 'filter-button'}><i className={this.state.showSetsMedium ? 'fas fa-check' : 'fas fa-times'}></i> Medium</a>
                <a onClick={() => this.handleFilterCountries(2)} href="#" className={this.state.showSetsHigh ? 'filter-button active' : 'filter-button'}><i className={this.state.showSetsHigh ? 'fas fa-check' : 'fas fa-times'}></i> High</a>
              </div>
            </Col>
          </Row>
        </Container>
        <Spacer />
      </div>
    )
  }
}

export default Map