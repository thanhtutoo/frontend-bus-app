import { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "./Partials/Header.jsx";
import Sidebar from "./Partials/Sidebar.jsx";

import AppUtil from "../../AppUtil.jsx";
import { List, Avatar } from "antd";
import ApiUtil from "../../api/ApiUtil";
import { withRouter } from "react-router-dom";
class Profile extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      data: [],
      loading: false,
      bus_stop_id: 0,
    };
  }

  handleFormError() {
    AppUtil.toast("Form error!", "error");
  }
  componentDidMount() {
    this.setState({
      loading: true,
    });

    ApiUtil.call("bus-stops")
      .then((result) => {
        if (result.data) {
          let data_info = result.data.data.results;
      
          data_info.forEach((element, index) => {
            // let km = element.substring(0,3);
            // console.log(element)
            data_info[index]["km"] = element.distance.toFixed(2);
          });
          this.setState({
            loading: false,
            data: data_info,
          });
        } else {
          throw result.errorMessage;
        }
      })
      .catch((error) => {
        console.log("error +");
        console.log(error);
        this.props.history.push(
          "/sign-in"
        );
      });
  }

  render() {
    return (
      <>
        <Helmet>
          <title>Bus Service App</title>
        </Helmet>

        <Header breadcrumb={"Bus Stops Near By"} />

        <div className="grid grid-cols-4 gap-0">
          <Sidebar active="profile" />
          <div className="col-span-3 bg-gray-100 p-10">
            <h2 className="font-2 text-4xl">Bus Stops Near By</h2>
            <div className="mt-10 rounded-md bg-white p-10 w-3/5 shadow">
              {this.state.loading ? (
                "Loading..."
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={this.state.data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://icon-library.com/images/google-maps-bus-icon/google-maps-bus-icon-20.jpg" />
                        }
                        title={
                          <Link
                            onClick={() => {
                              // this.props.history.push('/bus-arrival-info', {prop1: "someData"});
                              // this.props.history.push("/bus-arrival-info", { state: 'sample data'});
                              this.props.history.push(
                                "/bus-arrival-info/" + item.bus_stop_id
                              );
                            }}
                            className="text-black"
                          >
                            {item.bus_stop_name}
                          </Link>
                        }
                        description={`${item.km} km`}
                      />
                    </List.Item>
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Profile);
