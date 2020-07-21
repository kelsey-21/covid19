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
    polygonTemplate.fill = am4core.color("#AFAFAF");

    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#4A4A4A");

    this.polygonSeries = polygonSeries;
    this.polygonTemplate = polygonTemplate;
    this.map = map;
    this.hs = hs;

    return () => {
      map.dispose();
    };
  }

  componentDidUpdate(prevState) {
    // // Typical usage (don't forget to compare props):
    if (this.state.mapdata !== prevState.mapdata) {
      this.polygonSeries.data = this.state.mapdata;
      this.polygonTemplate.tooltipText = "[bold]{name}[/]: Cases are [underline]{value.status}[/] at a rate of {value.percentChange}%";

      this.polygonTemplate.propertyFields.fill = "fill";

      // const { mapdata } = this.state;
      // mapdata.forEach(mapd => {
      //   if (mapd.values.status === 'greatly increasing')
      //   {
      //     this.hs.properties.fill = am4core.color("#7F1802");
      //     debugger;
      //     // mapdata.values.fill = am4core.color("#7F1802");
      //   } else if (mapd.values.status === 'increasing')
      //   {
      //     this.hs.properties.fill = am4core.color("#D82904");
      //     // mapdata.values.fill = am4core.color("#D82904");
      //   } else if (mapd.values.status === 'flat')
      //   {
      //     this.hs.properties.fill = am4core.color("#D9DB22");
      //     // mapdata.values.fill = am4core.color("#D9DB22");
      //   } else if (mapd.values.status === 'decreasing')
      //   {
      //     this.hs.properties.fill = am4core.color("#009315");
      //     // mapdata.values.fill = am4core.color("#009315");
      //   }
    }
  }

  GetMapData = () => {
    CovidData.getMapData()
      .then(mapdata => {
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