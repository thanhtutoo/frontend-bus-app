import React, { Component } from "react";
import { Button } from "antd";

class CustomButton extends Component {

  constructor(props){
    super(props);

    let type = props.type ? props.type : "primary";
    let htmlType = props.htmlType ? props.htmlType : "button";
    let className = props.className ? props.className : "";
    let disabled = ((props.disabled === true || props.disabled === false) ? props.disabled : false);
    let loading = ((props.loading === true || props.loading === false) ? props.loading : false);

    this.state = {
      className: className,
      type: type,
      htmlType: htmlType,
      disabled: disabled,
      loading: loading,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.className !== this.state.className) {
      this.setState({
        className: nextProps.className
      });
    }
    if (nextProps.disabled !== this.state.disabled) {
      this.setState({
        disabled: nextProps.disabled
      });
    }
    if (nextProps.loading !== this.state.loading) {
      this.setState({
        loading: nextProps.loading
      });
    }
  }

  render () {
    return (
      <>
        <Button
          type={this.state.type}
          htmlType={this.state.htmlType}
          disabled={(this.state.loading || this.state.disabled)}
          loading={this.state.loading}
          className={"text-center font-bold uppercase px-7 py-4 rounded-3xl " + this.state.className}
          onClick={(e) => {
            if(this.props.onClick){
              this.props.onClick(e);
            }
          }}
        >
          {this.props.children}
        </Button>
      </>
    );
  }

}

export default CustomButton;
