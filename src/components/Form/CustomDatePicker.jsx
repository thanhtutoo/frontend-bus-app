import React, { Component } from "react";
import { Form } from "antd";
import { DatePicker } from 'antd';

class CustomDatePicker extends Component {
  
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
    

    componentWillReceiveProps(nextProps) {
		
    }

	render() {
		return <>
        <Form.Item
            label={this.state.label}
            labelCol={{ span: 24 }}
            name={this.state.name}
            rules={this.state.rules}
        >
            <DatePicker 
                onChange={(date, dateString) => {
                    if(this.props.onChange){
                        this.props.onChange(date, dateString);
                    }
                }} 
            />
        </Form.Item> 
		</>;
	}
}

export default CustomDatePicker;
