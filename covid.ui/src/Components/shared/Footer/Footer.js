import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin  } from '@fortawesome/free-brands-svg-icons';

class Footer extends React.Component {
  render() {
    return (
      <div className="Footer">
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
        <div className="footer-bottom d-flex justify-content-between">
          <div className="footer-terms">
            <p>Copyright © 2020 | Terms of Use | Privacy Policy</p>
          </div>
          <div className="social-icon">
            <a href="https://www.linkedin.com/in/kelseycreel"><FontAwesomeIcon icon={faLinkedin} color="#ede7d9" /></a>
            <a href="https://github.com/kelseycreel"><FontAwesomeIcon icon={faGithub} color="#ede7d9"/></a>
            <a href="https://kelseycreel.com"><FontAwesomeIcon icon={faGlobe} color="#ede7d9"/></a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;