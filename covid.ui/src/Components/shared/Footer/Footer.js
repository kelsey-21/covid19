import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin  } from '@fortawesome/free-brands-svg-icons';

class Footer extends React.Component {
  render() {
    return (
      <div className="Footer">
        <div className="covid-information">

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