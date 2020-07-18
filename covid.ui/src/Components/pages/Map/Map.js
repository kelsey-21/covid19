import React from 'react';
//import {ReactComponent as USAmap} from '../../../helpers/usaHigh.svg';
import MapSVG from './MapSVG';
import CovidData from '../../../helpers/data/CovidData';

import './Map.scss';

class Map extends React.Component {

  render() {
    return (
      <div className="Map">
        <h2>Covid Data and Policy Tracking</h2>
        <MapSVG />
      </div>
    );
  }
}

export default Map;
