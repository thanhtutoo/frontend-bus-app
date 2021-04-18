import { Component } from "react";
import AppUtil from "../../../AppUtil.jsx";
import moment from "moment";

class Header extends Component {
  constructor(props) {
    super(props);
    let user = AppUtil.getUser();

    this.state = {
      user: user
    }
  }

  render () {
    return (
      <div className="bg-black w-full px-5 py-4">
        <div className="container mx-auto">
          <p className="float-left text-sm text-gray-400">{this.props.breadcrumb}</p>
          <div className="clear-both"></div>
        </div>
      </div>
    );
  }
}

export default Header;