import React, { Component } from "react";

class CustomCheckbox extends Component {

  constructor(props){
    super(props);

    let label = props.label ? props.label : "";
    let name = props.name ? props.name : "";
    let value = props.value ? props.value : "";
    let checked = props.checked ? props.checked : false;

    this.state = {
      label: label,
      name: name,
      value: value,
      checked: checked
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState({
        checked: nextProps.checked ? nextProps.checked : false
      });
    }
  }

  render () {
    return (
      <label className="custom-checkbox mb-3">
        <span className="checkbox-input">
          <input type="checkbox" name={this.state.name} value={this.state.value} onChange={this.props.onChange} checked={this.state.checked} />
          <span className="checkbox-control">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path fill="none" stroke="currentColor" strokeWidth="3" d="M1.73 12.91l6.37 6.37L22.79 4.59" />
            </svg>
          </span>
        </span>
        <span className="radio-label">{this.state.label}</span>
      </label>
    );
  }

}

export default CustomCheckbox;
