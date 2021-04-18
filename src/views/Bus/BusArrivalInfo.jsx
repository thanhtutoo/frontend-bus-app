import { Component } from "react";
import { Helmet } from "react-helmet";

import Header from "./Partials/Header.jsx";
import Sidebar from "./Partials/Sidebar.jsx";
import AppUtil from "../../AppUtil.jsx";
import { List, Avatar } from "antd";
import ApiUtil from "../../api/ApiUtil";
import { Link } from "react-router-dom";
import moment from "moment";
class BusArrivalInfo extends Component {
  constructor(props) {
    super(props);
    console.log("this.props");
    console.log(this.props);

    this.state = {
      data: [],
      loading: false,
      bus_stop_name: "",
      bus_stop_id: this.props.match.params.id || 0,
    };
  }
  componentDidMount() {
  
    ApiUtil.call("bus-stops/" + this.state.bus_stop_id).then((result) => {
     
      let data_info = result.data.data.results;
      data_info.forEach((element, index) => {
        let arrival_timing = moment
          .unix(element.arrival_timing)
          .format("h:mm:ss");
        let arrival_next_ten_min = moment
          .unix(element.arrival_timing + 600)
          .format("h:mm:ss");
        data_info[index]["arrival_time_in_min"] =
          arrival_timing + "-" + arrival_next_ten_min;
      });
      this.setState({
        loading: false,
        data: data_info,
        bus_stop_name: data_info.length > 0 ? data_info[0].bus_stop.bus_stop_name: ""
      });
    });
  }
  handleFormError() {
    AppUtil.toast("Form error!", "error");
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Bus Service</title>
        </Helmet>

        <Header breadcrumb={"My Profile"} />

        <div className="grid grid-cols-4 gap-0">
          <Sidebar active="profile" />
          <div className="col-span-3 bg-gray-100 p-10">
            <h2 className="font-2 text-4xl">At {this.state.bus_stop_name}</h2>
            <div className="mt-10 rounded-md bg-white p-10 w-3/5 shadow">
              <List
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png" />
                      }
                      title={
                        <Link to="#" className="text-black">
                          Bus No: {item.bus_id}
                        </Link>
                      }
                      description={`${item.arrival_time_in_min} (10 min)`}
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BusArrivalInfo;
