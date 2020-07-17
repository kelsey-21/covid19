import React from 'react';
import USAMap from "react-usa-map";

import CovidData from '../../../helpers/data/CovidData';
import LocationData from '../../../helpers/data/LocationsData';

class Map extends React.Component {
  state = {
    showHover: false,
    locations: [{
      locationCode: '',
      locStatus: '',
      percentage: '',
    }],
  }

  mapHandler = (e) => {
    var stateCode = e.target.dataset.name;
    CovidData.getStatusByState(stateCode)
      .then(status => {
        this.setState({ status: status.locStatus, percentage: status.percentage });
      })
  };

  onMouseEnter = (e) => {
    this.setState({ showHover: true });
    var stateCode = e.target.dataset.name;
    CovidData.getStatusByState(stateCode)
      .then(status => {
        this.setState({ status: status.locStatus, percentage: status.percentage });
      })
  }

  componentDidMount() {
    this.setUpMap()
  }

  setUpMap = () => {
    LocationData.getListOfLocations()
      .then(list => {
        list.forEach(code => CovidData.getStatusByState(code)
          .then(location => {
            this.setState({ locationCode: location, locStatus: location.status, percentage: location.percentage });
          }))
      })
  }

  onMouseLeave = (e) => {
    this.setState({ showHover: false })
  }

  statesCustomConfig = () => {

  }

  render() {
    return (
      <div className="Map">
        <h2>Covid Data and Policy Tracking</h2>
        <USAMap onClick={this.mapHandler} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} customize={this.statesCustomConfig()} />
      </div>
    );
  }
}

export default Map;
