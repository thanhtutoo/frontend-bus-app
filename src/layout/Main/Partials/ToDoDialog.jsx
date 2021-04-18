import { Component } from "react";

import CustomDialog from "../../../components/Dialog/CustomDialog.jsx";
import attachmentIcon from "../../../assets/img/attachment.png";

class ToDoDialog extends Component {

  constructor(props){
    super(props);

    let open = ((props.open === true || props.open === false) ? props.open : false);

    this.state = {
      open: open
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

  onClose() {
    this.setState({
      open: false
    });
  }

  renderFooter() {
    return (
      <button className="px-8 py-2 bg-pink text-center rounded-lg text-white hover:bg-pink-200 transition-all uppercase font-bold text-sm">
        Save
      </button>
    );
  }

  render() {
    return (
      <CustomDialog 
        open={this.state.open}
        renderFooter={this.renderFooter()} 
        title="To-do"
      >
        <div className="grid grid-rows-4 gap-4">
          <div>
            <span className="font-bold inline-block w-2/12 align-top">Add To</span>
            <button className="text-center hover:font-bold border border-solid border-gray-100 px-8 py-3 rounded-md text-gray-400 hover:shadow-md hover:text-black hover:border-black transition-all mr-5">Must-Dos</button>
            <button className="text-center hover:font-bold border border-solid border-gray-100 px-8 py-3 rounded-md text-gray-400 hover:shadow-md hover:text-black hover:border-black transition-all mr-5">Before the Move</button>
            <button className="text-center hover:font-bold border border-solid border-gray-100 px-8 py-3 rounded-md text-gray-400 hover:shadow-md hover:text-black hover:border-black transition-all mr-5">The Other Side</button>
          </div>

          <div>
            <span className="font-bold inline-block w-2/12 align-top">Priority</span>
            <select className="border border-gray-200 rounded-md px-8 py-3 bg-white w-2/5">
              <option>Normal</option>
            </select>
          </div>

          <div>
            <span className="font-bold inline-block w-2/12 align-top">Due Date</span>
            <input className="border border-gray-200 rounded-md px-8 py-3 bg-white w-2/5" type="text" />
          </div>

          <div className="mt-5 mb-5">
            <hr className="border-black" />
          </div>

          <div>
            <span className="font-bold inline-block w-2/12 align-top">About</span>
            <div className="w-10/12 inline-block">
              <label className="text-xs block mb-1">Name this to-do</label>
              <input className="border border-gray-200 rounded-md px-8 py-3 bg-white w-full" type="text" />

              <div className="mb-5"></div>

              <label className="text-xs block mb-1">Describe what needs to be done</label>
              <textarea className="border border-gray-200 rounded-md px-8 py-3 bg-white w-full" rows="5"></textarea>

              <div className="mb-2"></div>

              <a href="/" className="dotted-underline text-black uppercase text-xs font-bold">
                <img src={attachmentIcon} alt="" className="mr-2 inline-block" /> Upload Document(s)
              </a>
            </div>
          </div>
        </div>
      </CustomDialog>
    );
  }

}

export default ToDoDialog;
