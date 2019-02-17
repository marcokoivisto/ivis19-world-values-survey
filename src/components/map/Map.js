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
import { dimensionNames } from '../../data/wvs_data_strings.js';
import { from2010to2014, from2005to2009, from1999to2004, from1995to1998, from1990to1994 } from '../../data/wvs_data_sets.js';
import './Map.css';

const wrapperStyles = {
  width: '100%',
  height: '100vh',
}

const popScale = scaleLinear()
  .domain([0, 100000000, 1400000000])
  .range(["#CFD8DC", "#607D8B", "#37474F"])

const independenceScale = scaleLinear()
  .domain([0, 3665])
  .range([1, 25])

class Map extends Component {
  constructor() {
    super()
    this.state = {
      center: [0, 20],
      zoom: 1,
      countries: from2010to2014,
    }
  }
  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100)
  }
  render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{ scale: 205 }}
          width={980}
          height={551}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
        <ZoomableGroup center={this.state.center} disablePanning>
          <Geographies geography="/static/world-50m-with-population.json">
            {(geographies, projection) =>
              geographies.map((geography, i) =>
                geography.id !== "ATA" && (
                  <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    style={{
                      default: {
                        fill: popScale(geography.properties.pop_est),
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
            {
              this.state.countries.map((country, i) => (
                <Marker key={i} marker={country}>
                  <circle
                    cx={0}
                    cy={0}
                    r={independenceScale(country.independence)}
                    data-tip={"<p class='tool-tip'>" + country.name + "</p> <b>" + dimensionNames.independence + ":</b> " + country.independence + " <br /> <b>" + dimensionNames.hard_work + ":</b> " + country.hard_work + " <br /> <b>" + dimensionNames.saving_money + ":</b> " + country.saving_money + " <br /> <b>" + dimensionNames.unselfishness + ":</b> " + country.unselfishness + " <br /> <b>" + dimensionNames.imagination + ":</b> " + country.imagination + " <br /> <b>" + dimensionNames.tolerance_and_respect + ":</b> " + country.tolerance_and_respect + " <br /> <b>" + dimensionNames.determination + ":</b> " + country.determination + " <br /> <b>" + dimensionNames.obedience + ":</b> " + country.obedience + " <br />"}
                    fill="rgba(255,87,34,1)"
                    stroke="#607D8B"
                    strokeWidth="2"
                  />
                </Marker>
              ))
            }
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
        <ReactTooltip html={true} />
    </div>
    )
  }
}

export default Map