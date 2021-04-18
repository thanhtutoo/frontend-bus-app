import { Component } from "react";
import { Link } from "react-router-dom";

import footerImage from "../assets/img/common-moving-timeline.svg";
import logoWhite from "../assets/img/logo-white.png";

class Footer extends Component {

  render() {
    return (
      <div>
        {this.props.image !== "false" ? 
          <img src={footerImage} className="object-fill block mx-auto" alt="" /> : ""
        }
        <footer className="w-full p-8">
          <div className="container mx-auto">
            <div className="space-x-4">
              <div className="inline-block mr-3">
                Powered By Than Htut
              </div>

              <div className="inline-block mr-3">
                <Link to="/terms" rel="noreferrer">Terms & Condition</Link>
              </div>

              <div className="inline-block mr-3">
                <Link to="/privacy-policy" rel="noreferrer">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

}

export default Footer;
