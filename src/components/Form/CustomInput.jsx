import React, { Component } from "react";
import { Form, Input } from "antd";

class CustomInput extends Component {

  constructor(props){
    super(props);

    this.refInput = React.createRef();

    let label = props.label ? props.label : "";
    let name = props.name ? props.name : "";
    let value = props.value ? props.value : "";
    let type = props.type ? props.type : "text";
    let placeholder = props.placeholder ? props.placeholder : "";
    let className = props.className ? props.className : "";
    let rows = props.rows ? props.rows : 1;
    let rowsMax = props.rowsMax ? props.rowsMax : null;
    let disabled = (this.props.disabled === "true");
    let readOnly = (this.props.readOnly === "true");
    let required = (this.props.required === "true");
    let rules = props.rules ? props.rules : [{ required: required, message: "Please input this field." }];

    this.state = {
      label: label,
      className: className,

      name: name,
      value: value,
      placeholder: placeholder,
      type: type,

      disabled: disabled,
      readOnly: readOnly,
      required: required,

      rows: rows,
      rowsMax: rowsMax,
      rules: rules
    }
  }

  focus = () => {
    this.refInput.current.focus();
  };

  resize = (event) => {
    event.target.scrollTop = event.target.scrollHeight;
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.label !== this.state.label) {
      this.setState({
        label: nextProps.label ? nextProps.label : ""
      });
    }
    if (nextProps.name !== this.state.name) {
      this.setState({
        name: nextProps.name ? nextProps.name : ""
      });
    } 
    if (nextProps.type !== this.state.type) {
      this.setState({
        type: nextProps.type ? nextProps.type : ""
      });
    }
    if (nextProps.placeholder !== this.state.placeholder) {
      this.setState({
        placeholder: nextProps.placeholder ? nextProps.placeholder : ""
      });
    }    
    if (nextProps.className !== this.state.className) {
      this.setState({
        className: nextProps.className ? nextProps.className : ""
      });
    } 
    if (nextProps.rowsMax !== this.state.rowsMax) {
      this.setState({
        rowsMax: nextProps.rowsMax ? nextProps.rowsMax : ""
      });
    }
    if (nextProps.disabled !== this.state.disabled) {
      this.setState({
        disabled: nextProps.disabled ? nextProps.disabled : ""
      });
    }
    if (nextProps.readOnly !== this.state.readOnly) {
      this.setState({
        readOnly: nextProps.readOnly ? nextProps.readOnly : ""
      });
    }
    if (nextProps.required !== this.state.required) {
      this.setState({
        required: nextProps.required ? nextProps.required : ""
      });
    }
  }
  render () {    
    return (
      <Form.Item
        label={this.state.label}
        labelCol={{ span: 24 }}
        name={this.state.name}
        rules={this.state.rules}
        >
        <Input
          type={this.state.type}
          disabled={this.state.disabled}
          readOnly={this.state.readOnly}
          placeholder={this.state.placeholder}
          ref={this.refInput}
          className={"w-full px-3 py-4 placeholder-gray-300 border border-gray-300 rounded " + this.state.className}
          onClick={(e) => {
            e.stopPropagation();
            if (this.props.onClick) {
              this.props.onClick(e);
            }
          }}
          onChange={(event) => {
            this.resize(event);
            this.setState({
              value: event.target.value
            });
            if (this.props.onChange) {
              this.props.onChange(event);
            }
          }}
          onBlur={() => {
            if (this.props.onBlur) {
              this.props.onBlur();
            }
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (this.props.onPressEnter) {
                this.props.onPressEnter(event);
              }
            }
          }}
        />
      </Form.Item>
    );
  }

}

export default CustomInput;
