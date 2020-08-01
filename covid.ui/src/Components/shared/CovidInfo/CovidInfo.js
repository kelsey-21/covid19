import React from 'react';

class CovidInfo extends React.Component {
  render() {
    return (
      <div className="covid-information">
          <div id="Key" className="d-flex justify-content-around">
            <div className="crimson key-box">
              <h6>Increasing Spread</h6>
            </div>
            <div className="orange key-box">
              <h6>Trending Poorly</h6>
            </div>
            <div className="goldenrod key-box">
              <h6>Caution Warranted</h6>
            </div>
            <div className="forest key-box">
              <h6>Trending Better</h6>
            </div>
          </div>
          <div id="Sources">
            <h4>Data and Sources</h4>
              <h6>14 Day Trend of COVID+</h6>
              <p>Using the last 14 days of COVID positive cases, this data is updated daily and comes from the COVID Tracking Project.</p>
              <ul>
                <li><span className="text-crimson">Dark red</span>: If cases are increasing (&gt;25% change) during the 14 day period</li>
                <li><span className="text-orange">Orange</span>: If cases are increasing (between 5% - 25% change) during the 14 day period</li>
                <li><span className="text-goldenrod">Yellow</span>: If cases are flat (less than 5% change) during the 14 day period</li>
                <li><span className="text-forest">Green</span>: If cases are decreasing (more than -5% change) during the 14 day period</li>
              </ul>
              <p>The data for this site comes from <a href="https://covidtracking.com/">COVIDTracking.com</a>, and <a href="https://github.com/COVID19StatePolicy/SocialDistancing">covid19statepolicy.org</a> (pulled on 7/20).</p>
          </div>
      </div>
    )
  }
}

export default CovidInfo;