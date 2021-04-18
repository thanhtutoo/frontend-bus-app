import { Component } from "react";

class CustomDialog extends Component {

  constructor(props){
    super(props);

    let open = ((props.open === true || props.open === false) ? props.open : false);

    this.state = {
      open: open
    }
  }

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  } 

  onKeyPressed(e) {
    if (e.keyCode === 27) {
      this.handleClose();
    }
  }

  handleClose = () => {
    this.setState({
      open: false
    });

    if(this.props.onClose){
      this.props.onClose();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      let open = ((nextProps.open === true || nextProps.open === false) ? nextProps.open : false);
      this.setState({
        open: open
      });
    }
  }

  render() {
    return (
      <div className={(this.state.open === true ? "" : "opacity-0 pointer-events-none ") + "modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50"}>
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div className="modal-container bg-white mx-auto rounded-md shadow-lg z-50 overflow-y-auto w-3/5">
          <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50" onClick={this.handleClose}>
            <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
            <span className="text-sm">(Esc)</span>
          </div>

          <div className="modal-content">
            <div className="py-5 text-left px-7">
              <div className="flex justify-between items-center pb-5">
                <p className="text-4xl font-2">{this.props.title}</p>
                <div className="modal-close cursor-pointer z-50" onClick={this.handleClose}>
                  <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                  </svg>
                </div>
              </div>
              {this.props.children}
            </div>

            <div className="flex justify-end bg-gray-100 px-10 py-5">
              {this.props.renderFooter}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default CustomDialog;
