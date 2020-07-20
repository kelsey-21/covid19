import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import CovidData from '../../../helpers/data/CovidData';

am4core.useTheme(am4themes_animated);

class Map extends React.Component {
  state = {
    mapdata: [],
  }

  componentDidMount() {
    let map = am4core.create("chartdiv", am4maps.MapChart);

    this.GetMapData();

    map.geodata = am4geodata_usaLow;
    map.projection = new am4maps.projections.AlbersUsa();

    let polygonSeries = new am4maps.MapPolygonSeries();
    polygonSeries.useGeodata = true;
    map.series.push(polygonSeries);

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#74B266");

    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

    // const stateData = this.state.data;
    // if (stateData !== null )
    // {
    //   polygonSeries.data = stateData;
    //   polygonTemplate.tooltipText = "{name}: {value}";
    // }

    map.current = map;

    return () => {
      map.dispose();
    };
  }

  // componentDidUpdate(prevState) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.state.mapdata !== prevState.mapdata) {
  //     this.polygonSeries.data = this.state.mapData;
  //     this.polygonTemplate.tooltipText = "{name}: {value}";
  //   }
  // }

  GetMapData = () => {
    CovidData.getMapData()
      .then(mapdata => {
        console.log(mapdata);
        if (mapdata !== undefined) {
          this.setState({ mapdata: mapdata });
        }
      });
  };

  render() {
    return(
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    )
  }
}

export default Map;